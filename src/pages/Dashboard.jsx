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
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="text-green-700/70">Here's what's happening in your communities today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 transition-all">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <p className="text-2xl font-bold text-green-900">{s.value}</p>
              <p className="text-sm text-green-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <h2 className="font-bold text-green-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((a) => (
                  <Link
                    key={a.label}
                    to={a.to}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-cream-50 border border-cream-200 hover:border-green-300 hover:bg-green-50/50 transition-all cursor-pointer"
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-xs font-medium text-green-800">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Payment Reminders */}
            {pendingReminders.length > 0 && (
              <div className="bg-white p-5 rounded-xl border border-cream-200">
                <h2 className="font-bold text-green-900 mb-4">⏰ Payment Reminders</h2>
                <div className="space-y-3">
                  {pendingReminders.map((r, i) => (
                    <Link
                      key={i}
                      to={`/dashboard/community/${r.communityId}?tab=contributions`}
                      className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100/50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-green-900">{r.label}</p>
                        <p className="text-xs text-green-600">{r.community} · {r.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-800">₦{(r.goal - r.balance).toLocaleString()} remaining</p>
                        <span className="text-xs text-amber-600 font-medium">Contribute now →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">Upcoming Events</h2>
                <Link to="/dashboard/events" className="text-sm text-green-700 font-medium hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {paginatedEvents.map((e) => (
                  <div key={e.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-cream-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-800 leading-tight">
                        {e.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-bold text-green-800 leading-tight">
                        {e.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-green-900 text-sm">{e.title}</h3>
                      <p className="text-xs text-green-600">{e.location}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-green-500">
                        <span>{e.time}</span>
                        <span>{e.attendees} attending</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700">{e.community}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination page={eventsPage} totalPages={Math.ceil(events.length / EVENTS_PER_PAGE)} onPageChange={setEventsPage} />
            </div>

            {/* Activity Feed */}
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <h2 className="font-bold text-green-900 mb-4">Community Activity</h2>
              <div className="space-y-4">
                {paginatedFeeds.map((f) => (
                  <div key={f.id} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-cream-50 font-semibold text-xs flex-shrink-0">
                      {f.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-green-900">
                        <span className="font-semibold">{f.user}</span> {f.action}{" "}
                        {f.community && <span className="font-medium text-green-700">{f.community}</span>}
                      </p>
                      <span className="text-xs text-green-500">{f.time}</span>
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
            <div className="bg-gradient-to-br from-green-800 to-green-900 p-5 rounded-xl text-cream-50">
              <h3 className="font-bold mb-3">Your Savings Summary</h3>
              <p className="text-3xl font-bold mb-3">₦{(user.savings.totalSaved / 1000).toFixed(1)}K</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream-300">Daily</span>
                  <span className="font-semibold">₦{(user.savings.dailyBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-300">Monthly</span>
                  <span className="font-semibold">₦{(user.savings.monthlyBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-300">Rotational</span>
                  <span className="font-semibold">₦{(user.savings.rotationalBalance / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-300">Goal-Based</span>
                  <span className="font-semibold">₦{(user.savings.goalBalance / 1000).toFixed(1)}K</span>
                </div>
              </div>
              <Link to="/dashboard/funds" className="mt-3 block w-full text-center py-2 bg-cream-50/10 rounded-lg text-sm font-medium hover:bg-cream-50/20 transition-colors">
                Manage Savings →
              </Link>
            </div>

            {/* LifeCircle Map */}
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">Your LifeCircle</h2>
                <Link to="/dashboard/map" className="text-sm text-green-700 font-medium hover:underline">View map</Link>
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
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {item.communities.length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* My Communities */}
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-green-900">My Communities</h2>
                <Link to="/dashboard/communities" className="text-sm text-green-700 font-medium hover:underline">Manage</Link>
              </div>
              <div className="space-y-3">
                {paginatedCommunities.map((c) => (
                  <Link
                    key={c.id}
                    to={`/dashboard/community/${c.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-cream-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center text-cream-50 font-bold text-sm`}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-green-900 truncate">{c.name}</p>
                      <div className="flex items-center gap-2 text-xs text-green-600">
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
            <div className="bg-white p-5 rounded-xl border border-cream-200">
              <h2 className="font-bold text-green-900 mb-3">📊 Transparency Dashboard</h2>
              <div className="space-y-3 text-sm">
                {allFunds.slice(0, 4).map((f, i) => {
                  const pct = Math.min(100, (f.balance / f.goal) * 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-green-600 mb-1">
                        <span className="truncate">{f.label} ({f.community})</span>
                        <span>{Math.round(pct)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-cream-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/dashboard/communities" className="mt-3 text-xs text-green-700 font-medium hover:underline block">
                View full reports →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
