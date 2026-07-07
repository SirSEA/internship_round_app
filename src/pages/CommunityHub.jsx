import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getCommunityDetail, getCommunityMembers } from "../services/api";
import Pagination from "../components/Pagination";

const MEMBERS_PER_PAGE = 8;

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

const bannerGradients = {
  green: "from-green-800 to-green-600",
  blue: "from-blue-800 to-blue-600",
  purple: "from-purple-800 to-purple-600",
  amber: "from-amber-700 to-amber-500",
  red: "from-red-800 to-red-600",
};

export default function CommunityHub() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const [community, setCommunity] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getCommunityDetail(id).catch(() => null),
      getCommunityMembers(id).catch(() => []),
    ]).then(([comm, mems]) => {
      if (!comm) {
        setError("Community not found.");
      } else {
        setCommunity(comm);
        setMembers(Array.isArray(mems) ? mems : []);
      }
    }).finally(() => setLoading(false));
  }, [id]);

  const setTab = (tab) => setSearchParams({ tab });

  if (loading) {
    return (
      <div className="lc-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="lc-spinner" />
          <p className="lc-text-body">Loading community...</p>
        </div>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="lc-dashboard flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-4">🔍</span>
          <h2 className="text-xl font-bold text-green-900">{error || "Community not found"}</h2>
          <Link to="/dashboard/communities" className="lc-link-auth underline mt-2 inline-block">Back to communities</Link>
        </div>
      </div>
    );
  }

  const banner = bannerGradients[community.color_key] || "from-green-800 to-green-600";

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className={`h-36 bg-gradient-to-r ${banner} relative`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="text-3xl">{categoryIcons[community.type] || "👥"}</span>
            <div>
              <h1 className="text-2xl font-bold text-cream-50 drop-shadow-sm">{community.name}</h1>
              <p className="text-cream-200 text-sm">{community.type} · {community.member_count || 0} members</p>
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
          {activeTab === "members" && <MembersTab members={members} />}
          {activeTab === "forum" && <ComingSoon title="Discussion Forum" />}
          {activeTab === "announcements" && <ComingSoon title="Announcements" />}
          {activeTab === "gallery" && <ComingSoon title="Community Gallery" />}
          {activeTab === "events" && <ComingSoon title="Upcoming Events" />}
          {activeTab === "contributions" && <ComingSoon title="Contributions" />}
          {activeTab === "commerce" && <ComingSoon title="Commerce Directory" />}
          {activeTab === "savings" && <ComingSoon title="Savings Plans" />}
          {activeTab === "investments" && <ComingSoon title="Investment Pools" />}
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="text-center py-16">
      <span className="text-5xl block mb-4">🚧</span>
      <h2 className="text-xl font-bold text-green-900 mb-2">{title}</h2>
      <p className="text-green-600">Coming soon. This feature is being built.</p>
    </div>
  );
}

function ProfileTab({ community }) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white p-6 rounded-xl border border-cream-200">
        <h2 className="text-lg font-bold text-green-900 mb-2">About</h2>
        <p className="text-green-700/80">{community.description || "No description provided."}</p>
        {community.location && (
          <p className="text-sm text-green-600 mt-3">📍 {community.location}</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-xl border border-cream-200">
        <h2 className="text-lg font-bold text-green-900 mb-2">Details</h2>
        <div className="space-y-2 text-sm text-green-700/80">
          <p>Type: <span className="font-medium text-green-800">{community.type}</span></p>
          <p>Owner: <span className="font-medium text-green-800">{community.owner_name || "—"}</span></p>
          <p>Members: <span className="font-medium text-green-800">{community.member_count || 0}</span></p>
          <p>Visibility: <span className="font-medium text-green-800">{community.visibility || (community.is_visible ? "public" : "private")}</span></p>
          {community.created_at && (
            <p>Created: <span className="font-medium text-green-800">{new Date(community.created_at).toLocaleDateString()}</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

function MembersTab({ members }) {
  const [page, setPage] = useState(1);
  const paginated = members.slice((page - 1) * MEMBERS_PER_PAGE, page * MEMBERS_PER_PAGE);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-green-900">Member Directory ({members.length})</h2>
      </div>
      {members.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">👥</span>
          <p className="text-green-600">No members yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
          <div className="divide-y divide-cream-100">
            {paginated.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-4 hover:bg-cream-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-cream-50 font-semibold text-sm">
                  {m.user_name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900 text-sm">{m.user_name || "Unknown"}</p>
                  <p className="text-xs text-green-600">{m.role} · Joined {m.joined_at ? new Date(m.joined_at).toLocaleDateString() : "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Pagination page={page} totalPages={Math.ceil(members.length / MEMBERS_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}


