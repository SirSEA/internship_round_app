import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { enrichedCommunities } from "../data/mock";
import Pagination from "../components/Pagination";

const MEMBERS_PER_PAGE = 8;
const GALLERY_PER_PAGE = 6;
const COMMERCE_PER_PAGE = 6;

const tabs = [
  { id: "profile", label: "Profile", icon: "📋" },
  { id: "members", label: "Members", icon: "👥" },
  { id: "forum", label: "Forum", icon: "💬" },
  { id: "announcements", label: "Announcements", icon: "📢" },
  { id: "gallery", label: "Gallery", icon: "🖼️" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "contributions", label: "Contributions", icon: "💰" },
  { id: "commerce", label: "Commerce", icon: "🏪" },
  { id: "savings", label: "Savings", icon: "🏦" },
  { id: "investments", label: "Investments", icon: "📈" },
];

const categoryIcons = {
  Church: "⛪", Mosque: "🕌", Neighborhood: "🏘️", School: "🎓", Family: "👨‍👩‍👧‍👦", Professional: "💼",
};

export default function CommunityHub() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const community = enrichedCommunities.find((c) => c.id === Number(id));

  if (!community) {
    return (
      <div className="flex-1 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-4">🔍</span>
          <h2 className="text-xl font-bold text-green-900">Community not found</h2>
          <Link to="/dashboard/communities" className="text-green-700 underline mt-2 inline-block">Back to communities</Link>
        </div>
      </div>
    );
  }

  const setTab = (tab) => setSearchParams({ tab });

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className={`h-36 bg-gradient-to-r ${community.banner} relative`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="text-3xl">{categoryIcons[community.type] || "👥"}</span>
            <div>
              <h1 className="text-2xl font-bold text-cream-50 drop-shadow-sm">{community.name}</h1>
              <p className="text-cream-200 text-sm">{community.type} · {community.members} members</p>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-40 bg-white border-b border-cream-200 overflow-x-auto">
          <div className="flex px-4 gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === t.id
                    ? "border-green-700 text-green-800"
                    : "border-transparent text-green-600 hover:text-green-800 hover:border-green-300"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "profile" && <ProfileTab community={community} />}
          {activeTab === "members" && <MembersTab community={community} />}
          {activeTab === "forum" && <ForumTab community={community} />}
          {activeTab === "announcements" && <AnnouncementsTab community={community} />}
          {activeTab === "gallery" && <GalleryTab community={community} />}
          {activeTab === "events" && <EventsTab community={community} />}
          {activeTab === "contributions" && <ContributionsTab community={community} />}
          {activeTab === "commerce" && <CommerceTab community={community} />}
          {activeTab === "savings" && <SavingsTab community={community} />}
          {activeTab === "investments" && <InvestmentsTab community={community} />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ community }) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white p-6 rounded-xl border border-cream-200">
        <h2 className="text-lg font-bold text-green-900 mb-2">About</h2>
        <p className="text-green-700/80">{community.description}</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-cream-200">
        <h2 className="text-lg font-bold text-green-900 mb-4">Leadership</h2>
        <div className="space-y-3">
          {community.officers.map((o) => (
            <div key={o.role} className="flex items-center gap-3 p-3 rounded-lg bg-cream-50">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-cream-50 font-semibold text-sm">
                {o.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-green-900 text-sm">{o.name}</p>
                <p className="text-xs text-green-600">{o.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-cream-200">
        <h2 className="text-lg font-bold text-green-900 mb-4">Fund Accounts</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {community.fundAccounts.map((f) => (
            <div key={f.id} className="p-3 rounded-lg bg-cream-50 border border-cream-100">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-green-900">{f.label}</span>
                <span className="text-xs text-green-500">{f.dueDate}</span>
              </div>
              <p className="text-lg font-bold text-green-800">₦{(f.balance / 1000).toFixed(1)}K</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-green-600 mb-1">
                  <span>{Math.round((f.balance / f.goal) * 100)}% of goal</span>
                  <span>{f.contributors} contributors</span>
                </div>
                <div className="w-full h-1.5 bg-green-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${Math.min(100, (f.balance / f.goal) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersTab({ community }) {
  const [page, setPage] = useState(1);
  const paginated = community.members.slice((page - 1) * MEMBERS_PER_PAGE, page * MEMBERS_PER_PAGE);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-green-900">Member Directory ({community.members.length})</h2>
        <input
          placeholder="Search members..."
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-cream-200 bg-white text-sm text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
        <div className="divide-y divide-cream-100">
          {paginated.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-4 hover:bg-cream-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-cream-50 font-semibold text-sm">
                {m.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-green-900 text-sm">{m.name}</p>
                <p className="text-xs text-green-600">{m.role} · Joined {m.joinDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-800">₦{Number(m.contributions).toLocaleString()}</p>
                <p className="text-xs text-green-500">contributions</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination page={page} totalPages={Math.ceil(community.members.length / MEMBERS_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function ForumTab({ community }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Discussion Forum</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">New Post</button>
      </div>
      <div className="space-y-3">
        {community.forumPosts.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-green-900">{p.title}</h3>
              <span className="text-xs text-green-500">{p.lastActive}</span>
            </div>
            <p className="text-sm text-green-700/70 mb-3 line-clamp-2">{p.content}</p>
            <div className="flex items-center gap-3 text-xs text-green-600">
              <span>By {p.author}</span>
              <span>·</span>
              <span>{p.replies} replies</span>
              <span>·</span>
              <span>{p.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsTab({ community }) {
  const priorityColors = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-green-100 text-green-700" };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Announcements</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">New Announcement</button>
      </div>
      <div className="space-y-4">
        {community.announcements.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-xl border border-cream-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-green-900">{a.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[a.priority]}`}>{a.priority}</span>
            </div>
            <p className="text-sm text-green-700/70 mb-3">{a.content}</p>
            <div className="flex items-center gap-3 text-xs text-green-500">
              <span>By {a.author}</span>
              <span>·</span>
              <span>{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryTab({ community }) {
  const [page, setPage] = useState(1);
  const paginated = community.gallery.slice((page - 1) * GALLERY_PER_PAGE, page * GALLERY_PER_PAGE);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Community Gallery</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Upload Photo</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-cream-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer">
            <div className="h-48 bg-green-100 overflow-hidden">
              <img src={g.url} alt={g.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-green-900 truncate">{g.caption}</p>
              <div className="flex items-center gap-2 text-xs text-green-500 mt-1">
                <span>{g.uploadedBy}</span>
                <span>·</span>
                <span>{g.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(community.gallery.length / GALLERY_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function EventsTab({ community }) {
  const categoryColors = {
    Festival: "bg-purple-100 text-purple-700",
    Workshop: "bg-blue-100 text-blue-700",
    Meeting: "bg-amber-100 text-amber-700",
    Fundraiser: "bg-red-100 text-red-700",
    "Community Service": "bg-green-100 text-green-700",
    Social: "bg-pink-100 text-pink-700",
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Upcoming Events</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Create Event</button>
      </div>
      <div className="space-y-3">
        {community.events.map((e) => (
          <div key={e.id} className="bg-white p-4 rounded-xl border border-cream-200 hover:border-green-300 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-green-100 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-800">{e.date.split(" ")[0]}</span>
                <span className="text-lg font-bold text-green-800">{e.date.split(" ")[1].replace(",", "")}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">{e.title}</h3>
                <p className="text-xs text-green-600 mt-0.5">{e.location} · {e.time}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[e.category] || "bg-green-100 text-green-700"}`}>{e.category}</span>
                  <span className="text-xs text-green-500">{e.attendees} attending</span>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-green-800 text-cream-50 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors cursor-pointer self-center">RSVP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContributionsTab({ community }) {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-cream-200">
          <span className="text-2xl block mb-1">📊</span>
          <p className="text-2xl font-bold text-green-900">₦{(community.fundAccounts.reduce((s, f) => s + f.balance, 0) / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-green-600">Total Contributions</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-cream-200">
          <span className="text-2xl block mb-1">👥</span>
          <p className="text-2xl font-bold text-green-900">{community.members.length}</p>
          <p className="text-sm text-green-600">Active Contributors</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-cream-200">
          <span className="text-2xl block mb-1">🎯</span>
          <p className="text-2xl font-bold text-green-900">{community.fundAccounts.length}</p>
          <p className="text-sm text-green-600">Fund Accounts</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-cream-200">
        <div className="p-4 border-b border-cream-100">
          <h2 className="font-bold text-green-900">Transaction History</h2>
        </div>
        <div className="divide-y divide-cream-100">
          {community.transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-cream-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${t.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {t.type === "credit" ? "↑" : "↓"}
                </span>
                <div>
                  <p className="text-sm font-medium text-green-900">{t.description}</p>
                  <p className="text-xs text-green-500">{t.date} · by {t.by}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}>
                  {t.type === "credit" ? "+" : "-"}₦{t.amount.toLocaleString()}
                </p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${t.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommerceTab({ community }) {
  const [page, setPage] = useState(1);
  const paginated = community.commerce.slice((page - 1) * COMMERCE_PER_PAGE, page * COMMERCE_PER_PAGE);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Commerce Directory</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">List Your Business</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((b) => (
          <div key={b.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-green-900">{b.name}</h3>
              <div className="flex items-center gap-1 text-xs text-amber-600">
                <span>★</span>
                <span>{b.rating}</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mb-1">{b.category} · by {b.owner}</p>
            <p className="text-sm text-green-700/70 mb-3">{b.description}</p>
            <a href={`tel:${b.phone}`} className="text-xs text-green-700 font-medium hover:underline">{b.phone}</a>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(community.commerce.length / COMMERCE_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function SavingsTab({ community }) {
  const typeLabels = { daily: "Daily", monthly: "Monthly", rotational: "Rotational", goal: "Goal-Based" };
  const typeColors = { daily: "bg-blue-100 text-blue-700", monthly: "bg-green-100 text-green-700", rotational: "bg-purple-100 text-purple-700", goal: "bg-amber-100 text-amber-700" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-green-900">Savings Plans</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Create Savings Plan</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {community.savingsPlans.map((sp) => (
          <div key={sp.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-green-900">{sp.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[sp.type]}`}>{typeLabels[sp.type]}</span>
            </div>
            <p className="text-2xl font-bold text-green-800 mb-2">₦{(sp.balance / 1000).toFixed(1)}K <span className="text-sm font-normal text-green-500">/ ₦{(sp.goal / 1000).toFixed(0)}K</span></p>
            <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${Math.min(100, (sp.balance / sp.goal) * 100)}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
              <span>Rate: {sp.rate}</span>
              <span>{sp.members} members</span>
              {sp.currentTurn && <span>Current: {sp.currentTurn}</span>}
              {sp.nextTurn && <span>Next: {sp.nextTurn}</span>}
              {sp.targetDate && <span>Target: {sp.targetDate}</span>}
              <span>Next due: {sp.nextDue}</span>
            </div>
            <button className="mt-3 w-full py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Contribute Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestmentsTab({ community }) {
  const statusColors = { active: "bg-green-100 text-green-700", open: "bg-blue-100 text-blue-700", closed: "bg-gray-100 text-gray-600" };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-900">Investment Pools</h2>
        <button className="px-4 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Start Investment</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {community.investmentPools.map((inv) => (
          <div key={inv.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-green-900">{inv.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[inv.status]}`}>{inv.status}</span>
            </div>
            <p className="text-xs text-green-600 mb-1">{inv.type}</p>
            <p className="text-2xl font-bold text-green-800 mb-2">₦{(inv.totalPool / 1000000).toFixed(1)}M</p>
            <div className="space-y-1 text-xs text-green-600">
              <p>{inv.membersInvested} members invested</p>
              <p>Expected return: {inv.expectedReturn}</p>
              <p>Duration: {inv.duration}</p>
            </div>
            {inv.status === "open" && (
              <button className="mt-3 w-full py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Invest Now</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
