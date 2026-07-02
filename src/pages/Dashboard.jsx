import { useState } from "react";
import { Link } from "react-router-dom";
import { user, communities, events, feeds, lifeCircleMap, enrichedCommunities } from "../data/mock";
import Pagination from "../components/Pagination";

const statCards = [
  { label: "Connections", value: user.stats.connections, icon: "🤝" },
  { label: "Communities", value: user.stats.communities, icon: "👥" },
  { label: "Events", value: user.stats.events, icon: "📅" },
  { label: "Contributions", value: user.stats.contributions, icon: "💰" },
];

const quickActions = [
  { label: "Browse Communities", icon: "👥", to: "/dashboard/communities" },
  { label: "Start Savings", icon: "💰", to: "/dashboard/funds" },
  { label: "Explore Events", icon: "📅", to: "/dashboard/events" },
  { label: "View Investments", icon: "📈", to: "/dashboard/investments" },
];

export default function Dashboard() {
  const [feedsPage, setFeedsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [communitiesPage, setCommunitiesPage] = useState(1);
  const FEEDS_PER_PAGE = 4;
  const EVENTS_PER_PAGE = 4;
  const COMMUNITIES_PER_PAGE = 6;

  const allFunds = enrichedCommunities.flatMap((c) =>
    c.fundAccounts.map((f) => ({ ...f, community: c.name, communityId: c.id }))
  );
  const pendingReminders = enrichedCommunities.flatMap((c) =>
    c.fundAccounts.filter((f) => {
      const pct = (f.balance / f.goal) * 100;
      return pct > 0 && pct < 100;
    }).slice(0, 1).map((f) => ({ ...f, community: c.name, communityId: c.id }))
  ).slice(0, 4);

  const paginatedFeeds = feeds.slice((feedsPage - 1) * FEEDS_PER_PAGE, feedsPage * FEEDS_PER_PAGE);
  const paginatedEvents = events.slice((eventsPage - 1) * EVENTS_PER_PAGE, eventsPage * EVENTS_PER_PAGE);
  const paginatedCommunities = communities.slice((communitiesPage - 1) * COMMUNITIES_PER_PAGE, communitiesPage * COMMUNITIES_PER_PAGE);

  return (
    <div className="lc-dashboard">
      <div className="lc-dashboard-inner">
        {/* Header */}
        <div className="lc-page-header mb-8">
          <h1>Welcome back, {user.name.split(" ")[0]}</h1>
          <p>Here&apos;s what&apos;s happening in your communities today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="lc-stat-card">
              <span className="lc-stat-icon">{s.icon}</span>
              <p className="lc-stat-value">{s.value}</p>
              <p className="lc-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="lc-card">
              <h2 className="font-bold text-green-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((a) => (
                  <Link key={a.label} to={a.to} className="lc-quick-action">
                    <span className="lc-quick-action-icon">{a.icon}</span>
                    <span className="lc-quick-action-label">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Payment Reminders */}
            {pendingReminders.length > 0 && (
              <div className="lc-card">
                <h2 className="font-bold text-green-900 mb-4">⏰ Payment Reminders</h2>
                <div className="space-y-3">
                  {pendingReminders.map((r, i) => (
                    <Link
                      key={i}
                      to={`/dashboard/community/${r.communityId}?tab=contributions`}
                      className="lc-reminder-card"
                    >
                      <div>
                        <p className="lc-reminder-title">{r.label}</p>
                        <p className="lc-reminder-meta">{r.community} &middot; {r.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="lc-reminder-amount">₦{(r.goal - r.balance).toLocaleString()} remaining</p>
                        <span className="lc-reminder-action">Contribute now &rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">Upcoming Events</h2>
                <Link to="/dashboard/events" className="lc-section-link">View all</Link>
              </div>
              <div className="space-y-3">
                {paginatedEvents.map((e) => (
                  <div key={e.id} className="lc-event-card">
                    <div className="lc-event-date">
                      <span className="lc-event-day">{e.date.split(" ")[0]}</span>
                      <span className="lc-event-month">{e.date.split(" ")[1].replace(",", "")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="lc-event-title">{e.title}</h3>
                      <p className="lc-event-location">{e.location}</p>
                      <div className="lc-event-meta">
                        <span>{e.time}</span>
                        <span>{e.attendees} attending</span>
                        <span className="lc-event-badge">{e.community}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination page={eventsPage} totalPages={Math.ceil(events.length / EVENTS_PER_PAGE)} onPageChange={setEventsPage} />
            </div>

            {/* Activity Feed */}
            <div className="lc-card">
              <h2 className="font-bold text-green-900 mb-4">Community Activity</h2>
              <div className="space-y-4">
                {paginatedFeeds.map((f) => (
                  <div key={f.id} className="lc-activity-item">
                    <div className="lc-activity-avatar">
                      {f.avatar}
                    </div>
                    <div>
                      <p className="lc-activity-text">
                        <span className="lc-activity-user">{f.user}</span> {f.action}{" "}
                        {f.community && <span className="lc-activity-community">{f.community}</span>}
                      </p>
                      <span className="lc-activity-time">{f.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination page={feedsPage} totalPages={Math.ceil(feeds.length / FEEDS_PER_PAGE)} onPageChange={setFeedsPage} />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Personal Savings Summary */}
            <div className="lc-card-gradient">
              <h3 className="font-bold mb-3">Your Savings Summary</h3>
              <p className="lc-savings-amount">₦{(user.savings.totalSaved / 1000).toFixed(1)}K</p>
              <div className="space-y-2">
                <div className="lc-savings-row">
                  <span className="lc-savings-label">Daily</span>
                  <span className="lc-savings-value">₦{(user.savings.dailyBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="lc-savings-label">Monthly</span>
                  <span className="lc-savings-value">₦{(user.savings.monthlyBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="lc-savings-label">Rotational</span>
                  <span className="lc-savings-value">₦{(user.savings.rotationalBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="lc-savings-row">
                  <span className="lc-savings-label">Goal-Based</span>
                  <span className="lc-savings-value">₦{(user.savings.goalBalance / 1000).toFixed(1)}K</span>
                </div>
              </div>
              <Link to="/dashboard/funds" className="lc-savings-link">
                Manage Savings &rarr;
              </Link>
            </div>

            {/* LifeCircle Map */}
            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">Your LifeCircle</h2>
                <Link to="/dashboard/map" className="lc-section-link">View map</Link>
              </div>
              <div className="space-y-3">
                {lifeCircleMap.map((item) => (
                  <Link
                    key={item.label}
                    to="/dashboard/map"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-cream-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-green-900">{item.label}</span>
                    </div>
                    <span className="lc-badge lc-badge-sm">{item.communities.length}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* My Communities */}
            <div className="lc-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">My Communities</h2>
                <Link to="/dashboard/communities" className="lc-section-link">Manage</Link>
              </div>
              <div className="space-y-3">
                {paginatedCommunities.map((c) => (
                  <Link
                    key={c.id}
                    to={`/dashboard/community/${c.id}`}
                    className="lc-community-item"
                  >
                    <div className={`lc-community-avatar ${c.color}`}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="lc-community-name">{c.name}</p>
                      <div className="lc-community-meta">
                        <span>{c.type}</span>
                        <span>&middot;</span>
                        <span>{c.members} members</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination page={communitiesPage} totalPages={Math.ceil(communities.length / COMMUNITIES_PER_PAGE)} onPageChange={setCommunitiesPage} />
            </div>

            {/* Transparency Dashboard */}
            <div className="lc-card">
              <h2 className="font-bold text-green-900 mb-3">📊 Transparency Dashboard</h2>
              <div className="space-y-3 text-sm">
                {allFunds.slice(0, 4).map((f, i) => {
                  const pct = Math.min(100, (f.balance / f.goal) * 100);
                  return (
                    <div key={i} className="lc-progress">
                      <div className="lc-progress-header">
                        <span className="lc-progress-label">{f.label} ({f.community})</span>
                        <span>{Math.round(pct)}%</span>
                      </div>
                      <div className="lc-progress-track">
                        <div className="lc-progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/dashboard/communities" className="mt-3 lc-section-link block">
                View full reports &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
