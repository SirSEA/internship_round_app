import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardSummary, getDashboardActivity, getPaymentReminders, getMyCommunities, getDashboardLifeCircleMap, getCommunities } from "../services/api";
import Pagination from "../components/Pagination";

const quickActions = [
  { label: "Browse Communities", icon: "👥", to: "/dashboard/communities" },
  { label: "Start Savings", icon: "💰", to: "/dashboard/funds" },
  { label: "Explore Events", icon: "📅", to: "/dashboard/events" },
  { label: "View Investments", icon: "📈", to: "/dashboard/investments" },
];

const activityActionLabels = {
  community_created: "created",
  community_joined: "joined",
  community_join_requested: "requested to join",
};

const circleConfig = {
  School: { label: "Schools & Education", icon: "🎓" },
  Church: { label: "Spiritual", icon: "⛪" },
  Mosque: { label: "Spiritual", icon: "🕌" },
  Village: { label: "Village & Town", icon: "🌍" },
  Neighborhood: { label: "Neighborhood", icon: "🏘️" },
  Family: { label: "Family & Lineage", icon: "👨‍👩‍👧‍👦" },
  Professional: { label: "Professional", icon: "💼" },
  "Social Club": { label: "Social Clubs", icon: "🎉" },
};

function getCircleKey(type) {
  return circleConfig[type]?.label || "Other";
}

function getCircleIcon(type) {
  return circleConfig[type]?.icon || "📌";
}

export default function Dashboard() {
  const { profile } = useAuth();
  const [feedsPage, setFeedsPage] = useState(1);
  const [communitiesPage, setCommunitiesPage] = useState(1);
  const FEEDS_PER_PAGE = 4;
  const COMMUNITIES_PER_PAGE = 6;

  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [myCommunities, setMyCommunities] = useState([]);
  const [lifeCircles, setLifeCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = profile?.name;

  useEffect(() => {
    Promise.all([
      getDashboardSummary().catch(() => null),
      getDashboardActivity().catch(() => []),
      getPaymentReminders().catch(() => []),
      getMyCommunities().then((d) => (d?.communities ? d.communities : [])).catch(() => []),
    ]).then(([s, a, r, mc]) => {
      setSummary(s);
      setActivity(Array.isArray(a) ? a : []);
      setReminders(Array.isArray(r) ? r : []);
      setMyCommunities(Array.isArray(mc) ? mc : []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getDashboardLifeCircleMap()
      .then((d) => {
        if (d?.nodes?.length) {
          const groups = {};
          d.nodes.forEach((n) => {
            const key = getCircleKey(n.type);
            if (!groups[key]) groups[key] = { label: key, icon: getCircleIcon(n.type), communities: [] };
            groups[key].communities.push(n);
          });
          setLifeCircles(Object.values(groups));
        }
      })
      .catch(() => {});
  }, []);

  const stats = summary?.stats ? [
    { label: "Connections", value: summary.stats.connections ?? 0, icon: "🤝" },
    { label: "Communities", value: summary.stats.communities ?? 0, icon: "👥" },
    { label: "Events", value: summary.stats.events ?? 0, icon: "📅" },
    { label: "Contributions", value: summary.stats.contributions ?? 0, icon: "💰" },
  ] : [];

  const displayFeeds = activity;
  const displayCommunities = myCommunities;

  const paginatedFeeds = displayFeeds.slice((feedsPage - 1) * FEEDS_PER_PAGE, feedsPage * FEEDS_PER_PAGE);
  const paginatedCommunities = displayCommunities.slice((communitiesPage - 1) * COMMUNITIES_PER_PAGE, communitiesPage * COMMUNITIES_PER_PAGE);

  const savings = summary?.savings || {};
  const defaultLifeCircles = lifeCircles.length > 0 ? lifeCircles : [];

  if (loading) {
    return (
      <div className="lc-dashboard flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-green-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lc-dashboard">
      <div className="lc-dashboard-inner">
        <div className="lc-page-header mb-8">
          <h1 className="text-brand">Welcome back{userName ? `, ${userName.split(" ")[0]}` : ""}</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening in your communities today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="lc-stat-card">
              <span className="lc-stat-icon">{s.icon}</span>
              <p className="lc-stat-value">{s.value}</p>
              <p className="lc-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="lc-card">
              <h2 className="font-bold text-brand mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((a) => (
                  <Link key={a.label} to={a.to} className="lc-quick-action">
                    <span className="lc-quick-action-icon">{a.icon}</span>
                    <span className="lc-quick-action-label">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {reminders.length > 0 && (
              <div className="lc-card">
                <h2 className="font-bold text-brand mb-4">Payment Reminders</h2>
                <div className="space-y-3">
                  {reminders.map((r, i) => (
                    <div key={i} className="lc-reminder-card">
                      <div>
                        <p className="lc-reminder-title">{r.label || "Payment Reminder"}</p>
                        <p className="lc-reminder-meta">{r.community || ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-brand">Upcoming Events</h2>
                <Link to="/dashboard/events" className="lc-section-link">View all</Link>
              </div>
              <div className="text-center py-8 text-gray-400">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm">No upcoming events</p>
              </div>
            </div>

            <div className="lc-card">
              <h2 className="font-bold text-brand mb-4">Community Activity</h2>
              {paginatedFeeds.length > 0 ? (
                <div className="space-y-4">
                  {paginatedFeeds.map((f, i) => (
                    <div key={f.id || i} className="lc-activity-item">
                      <div className="lc-activity-avatar">
                        {f.user?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="lc-activity-text">
                          <span className="lc-activity-user">{f.user || "Someone"}</span>{" "}
                          {activityActionLabels[f.type] || f.type || "did something"}{" "}
                          {f.community && <span className="lc-activity-community">{f.community}</span>}
                        </p>
                        <span className="lc-activity-time">{f.time || ""}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-3xl mb-2">💬</p>
                  <p className="text-sm">No activities yet</p>
                </div>
              )}
              <Pagination page={feedsPage} totalPages={Math.ceil(displayFeeds.length / FEEDS_PER_PAGE)} onPageChange={setFeedsPage} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="lc-card-gradient">
              <h3 className="font-bold text-white mb-3">Your Savings Summary</h3>
              <p className="lc-savings-amount">{(savings.totalSaved || 0) > 0 ? `${(savings.totalSaved / 1000).toFixed(1)}K` : "—"}</p>
              <div className="space-y-2">
                <div className="lc-savings-row">
                  <span className="text-white/60">Daily</span>
                  <span className="font-semibold text-white">{(savings.dailyBalance || 0 / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="text-white/60">Monthly</span>
                  <span className="font-semibold text-white">{(savings.monthlyBalance || 0 / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="text-white/60">Rotational</span>
                  <span className="font-semibold text-white">{(savings.rotationalBalance || 0 / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="text-white/60">Goal Based</span>
                  <span className="font-semibold text-white">{(savings.goalBalance || 0 / 1000).toFixed(1)}K</span>
                </div>
              </div>
              <Link to="/dashboard/funds" className="lc-savings-link">
                Manage Savings &rarr;
              </Link>
            </div>

            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-brand">Your LifeCircle</h2>
                <Link to="/dashboard/map" className="lc-section-link">View map</Link>
              </div>
              {defaultLifeCircles.length > 0 ? (
                <div className="space-y-3">
                  {defaultLifeCircles.map((item) => (
                    <Link
                      key={item.label}
                      to="/dashboard/map"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium text-brand">{item.label}</span>
                      </div>
                      <span className="lc-badge lc-badge-sm">{item.communities.length}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-3xl mb-2">🗺️</p>
                  <p className="text-sm">No circles yet</p>
                </div>
              )}
            </div>

            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-brand">My Communities</h2>
                <Link to="/dashboard/communities" className="lc-section-link">Manage</Link>
              </div>
              {paginatedCommunities.length > 0 ? (
                <div className="space-y-3">
                  {paginatedCommunities.map((c) => (
                    <Link
                      key={c.id}
                      to={`/dashboard/community/${c.id}`}
                      className="lc-community-item"
                    >
                      <div className="lc-community-avatar bg-brand">
                        {c.name?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="lc-community-name">{c.name}</p>
                        <div className="lc-community-meta">
                          <span>{c.type}</span>
                          <span>&middot;</span>
                          <span>{c.members_count || 0} members</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-3xl mb-2">👥</p>
                  <p className="text-sm">No communities yet</p>
                </div>
              )}
              <Pagination page={communitiesPage} totalPages={Math.ceil(displayCommunities.length / COMMUNITIES_PER_PAGE)} onPageChange={setCommunitiesPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
