import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCommunities, getMyCommunitiesList, joinCommunity, createCommunity } from "../services/api";
import { getPeople, getPeopleRecommendations, sendConnectionRequest } from "../services/api";
import { enrichedCommunities as mockEnriched, user as mockUser, familyBranches, clans, villages, lineageRecords, allPeople, peopleRecommendations, categoryIcons } from "../data/mock";
import Pagination from "../components/Pagination";

const DISCOVER_TABS = [
  { id: "all", label: "All", icon: "📋" },
  { id: "School", label: "School", icon: "🏫" },
  { id: "Village", label: "Village", icon: "🌍" },
  { id: "Mosque", label: "Mosque", icon: "🕌" },
  { id: "Church", label: "Church", icon: "⛪" },
  { id: "Neighborhood", label: "Neighborhood", icon: "🏘️" },
];

const SIDEBAR_TABS = [
  { id: "discover", label: "Discover", icon: "🔍" },
  { id: "my-communities", label: "My Communities", icon: "👥" },
  { id: "family", label: "Family Branches", icon: "👨‍👩‍👧‍👦" },
  { id: "clan", label: "Clan Connections", icon: "🔗" },
  { id: "village", label: "Village Links", icon: "🌍" },
  { id: "lineage", label: "Lineage Records", icon: "📜" },
  { id: "people", label: "Discover People", icon: "👤" },
];

function getInitials(name) {
  return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
}

export default function Communities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [discoverCategory, setDiscoverCategory] = useState("all");
  const [allCommunities, setAllCommunities] = useState([]);
  const [myCommunities, setMyCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && SIDEBAR_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCommunities().catch(() => []),
      getMyCommunitiesList().catch(() => []),
    ]).then(([all, my]) => {
      setAllCommunities(Array.isArray(all) ? all : []);
      setMyCommunities(Array.isArray(my) ? my : []);
    }).finally(() => setLoading(false));
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams(tabId !== "discover" ? { tab: tabId } : {});
  };

  const searchFilter = (items, fields) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) =>
      fields.some((f) => {
        const val = typeof f === "function" ? f(item) : item[f];
        return val && String(val).toLowerCase().includes(q);
      })
    );
  };

  const categoryFiltered = discoverCategory === "all"
    ? allCommunities
    : allCommunities.filter((c) => c.type === discoverCategory);

  const searchAndCategoryFiltered = useMemo(
    () => searchFilter(categoryFiltered, ["name", "type", "description"]),
    [searchQuery, discoverCategory, allCommunities]
  );

  if (loading) {
    return (
      <div className="flex-1 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-green-600">Loading communities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">
              {activeTab === "discover" ? "Discover Communities" : 
               activeTab === "my-communities" ? "My Communities" :
               activeTab === "people" ? "Discover People" :
               SIDEBAR_TABS.find(t => t.id === activeTab)?.label || "Communities"}
            </h1>
            <p className="text-green-700/70 text-sm">
              {activeTab === "discover" ? "Find and join communities that matter to you." :
               activeTab === "my-communities" ? "Communities you belong to." :
               activeTab === "people" ? "Find and connect with people." :
               "Explore and connect."}
            </p>
          </div>
          {activeTab !== "people" && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-lg bg-green-800 text-cream-50 text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1.5"
            >
              + Create Community
            </button>
          )}
        </div>

        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder={
                activeTab === "people"
                  ? "Search people by name, family, clan, village..."
                  : "Search school, church, mosque, village, association..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-[#F3F4F6] text-sm text-green-800 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {SIDEBAR_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-green-800 text-cream-50"
                  : "bg-white text-green-700 border border-cream-200 hover:border-green-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "discover" && (
          <DiscoverTab
            communities={allCommunities}
            searchAndCategoryFiltered={searchAndCategoryFiltered}
            discoverCategory={discoverCategory}
            setDiscoverCategory={setDiscoverCategory}
            searchQuery={searchQuery}
            myCommunities={myCommunities}
          />
        )}
        {activeTab === "my-communities" && <MyCommunitiesTab communities={myCommunities} />}
        {activeTab === "family" && <FamilyTab searchQuery={searchQuery} />}
        {activeTab === "clan" && <ClanTab searchQuery={searchQuery} />}
        {activeTab === "village" && <VillageTab searchQuery={searchQuery} />}
        {activeTab === "lineage" && <LineageTab searchQuery={searchQuery} />}
        {activeTab === "people" && <PeopleTab searchQuery={searchQuery} />}
      </div>

      {showConnectModal && (
        <ConnectModal person={showConnectModal} onClose={() => setShowConnectModal(null)} />
      )}
      {showCreateModal && (
        <CreateCommunityModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            getCommunities().then(setAllCommunities).catch(() => {});
            getMyCommunitiesList().then(setMyCommunities).catch(() => {});
          }}
        />
      )}
    </div>
  );
}

function CommunityCard({ community: c }) {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setJoining(true);
    setError("");
    try {
      await joinCommunity(c.id);
      setJoined(true);
    } catch (err) {
      setError(err.message || "Failed to join.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <Link
      to={`/dashboard/community/${c.id}`}
      className="bg-white rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden group block"
    >
      <div className="h-20 bg-gradient-to-r from-green-800 to-green-600 relative">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-3 left-4">
          <span className="text-cream-50 font-bold text-lg drop-shadow-sm">{c.name}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{c.type}</span>
          <span className="text-xs text-green-500">{c.member_count || 0} members</span>
        </div>
        <p className="text-sm text-green-700/70 mb-3 line-clamp-2">{c.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-500">Owner: {c.owner_name || "Unknown"}</span>
          <div className="flex-1" />
          {joined ? (
            <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium">✓ Joined</span>
          ) : (
            <button
              onClick={handleJoin}
              disabled={joining}
              className="px-3 py-1 rounded-lg bg-green-800 text-cream-50 text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {joining ? "Joining..." : "Join"}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    </Link>
  );
}

function DiscoverTab({ communities, searchAndCategoryFiltered, discoverCategory, setDiscoverCategory, myCommunities }) {
  const [page, setPage] = useState(1);
  const COMM_PER_PAGE = 6;

  const paginated = searchAndCategoryFiltered.slice((page - 1) * COMM_PER_PAGE, page * COMM_PER_PAGE);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {DISCOVER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setDiscoverCategory(tab.id); setPage(1); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                discoverCategory === tab.id
                  ? "bg-green-800 text-cream-50"
                  : "bg-white text-green-700 border border-cream-200 hover:border-green-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {discoverCategory !== "all" && (
        <p className="text-sm text-green-500">
          Showing {searchAndCategoryFiltered.length} {discoverCategory} communit{searchAndCategoryFiltered.length === 1 ? "y" : "ies"}
        </p>
      )}

      {communities.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">🏘️</span>
          <p className="text-green-600 font-medium">No communities yet.</p>
          <p className="text-sm text-green-500 mt-1">Be the first to create a community!</p>
        </div>
      )}

      {communities.length > 0 && searchAndCategoryFiltered.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-green-600 font-medium">No communities found matching your search.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((c) => (
          <CommunityCard key={c.id} community={c} />
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(searchAndCategoryFiltered.length / COMM_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function MyCommunitiesTab({ communities }) {
  const [page, setPage] = useState(1);
  const COMM_PER_PAGE = 6;
  const paginated = communities.slice((page - 1) * COMM_PER_PAGE, page * COMM_PER_PAGE);

  if (communities.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl block mb-4">👥</span>
        <h2 className="text-xl font-bold text-green-900 mb-2">No communities yet</h2>
        <p className="text-green-600 mb-6">Join a community to get started or create your own.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard/communities" className="px-6 py-2.5 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Browse Communities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((c) => (
          <Link
            key={c.id}
            to={`/dashboard/community/${c.id}`}
            className="bg-white rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="h-16 bg-gradient-to-r from-green-800 to-green-600 flex items-center px-4">
              <span className="text-cream-50 font-bold">{c.name}</span>
            </div>
            <div className="p-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{c.type}</span>
              <p className="text-xs text-green-500 mt-2">{c.member_count || 0} members</p>
              <p className="text-sm text-green-700/70 mt-1 line-clamp-2">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(communities.length / COMM_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function FamilyTab({ searchQuery }) {
  const [page, setPage] = useState(1);
  const BRANCHES_PER_PAGE = 4;
  const searchFilter = (items, fields) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => fields.some((f) => String(item[f]).toLowerCase().includes(q)));
  };
  const filtered = searchFilter(familyBranches, ["name", "surname", "house", "village", "clan"]);
  const paginated = filtered.slice((page - 1) * BRANCHES_PER_PAGE, page * BRANCHES_PER_PAGE);

  return (
    <div className="space-y-6">
      <p className="text-sm text-green-700/70">Explore family branches, houses, and extended relatives.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {paginated.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-amber-300 hover:shadow-lg transition-all">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <div className="flex-1">
                <h3 className="font-bold text-green-900">{b.name}</h3>
                <p className="text-xs text-green-500 mt-0.5">{b.surname} · {b.house} House · {b.village}</p>
                <p className="text-sm text-green-700/70 mt-2">{b.description}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-green-600">
                  <span>{b.members} members</span>
                  <span>Elders: {b.elders.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(filtered.length / BRANCHES_PER_PAGE)} onPageChange={setPage} />
    </div>
  );
}

function ClanTab({ searchQuery }) {
  const filtered = !searchQuery.trim() ? clans : clans.filter((c) =>
    ["name", "description"].some((f) => c[f].toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="space-y-6">
      <p className="text-sm text-green-700/70">Discover clan networks, totems, and extended lineage connections.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((cl) => (
          <div key={cl.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-indigo-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold text-green-900 text-lg">{cl.name}</h3>
            </div>
            <p className="text-sm text-green-700/70 mb-3">{cl.description}</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">Totem: {cl.totem}</span>
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">~{cl.population.toLocaleString()} population</span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-green-500 mb-1">Associated Villages</p>
              <div className="flex flex-wrap gap-1.5">
                {cl.villages.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs">{v}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VillageTab({ searchQuery }) {
  const filtered = !searchQuery.trim() ? villages : villages.filter((v) =>
    ["name", "state"].some((f) => v[f].toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="space-y-6">
      <p className="text-sm text-green-700/70">Connect with your village/town associations and discover neighbours.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((v) => (
          <div key={v.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-teal-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏘️</span>
              <div>
                <h3 className="font-bold text-green-900 text-lg">{v.name}</h3>
                <p className="text-xs text-green-500">{v.state}, {v.country}</p>
              </div>
            </div>
            <p className="text-sm text-green-700/70 mb-3">{v.description}</p>
            {v.clans.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-500 mb-1">Clans in this village</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.clans.map((cl, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-xs font-medium">{cl} Clan</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineageTab({ searchQuery }) {
  const filtered = !searchQuery.trim() ? lineageRecords : lineageRecords.filter((l) =>
    ["familyName", "house", "village"].some((f) => l[f].toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="space-y-6">
      <p className="text-sm text-green-700/70">Search family lineage, ancestry records, and historical documents.</p>
      {filtered.map((l) => (
        <div key={l.id} className="bg-white rounded-xl border border-cream-200 p-6 hover:border-green-300 hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📜</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-green-900 text-lg">{l.familyName} Lineage</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">{l.generation}th Generation</span>
              </div>
              <p className="text-xs text-green-500 mt-0.5">{l.house} · {l.village} · {l.clan} Clan</p>
              <p className="text-sm text-green-700 mt-2">Origin: <span className="font-medium">{l.origin}</span></p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-green-600 mb-1">Patriarch</p>
                  <p className="text-sm font-semibold text-green-900">{l.patriarch}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-green-600 mb-1">Matriarch</p>
                  <p className="text-sm font-semibold text-green-900">{l.matriarch}</p>
                </div>
              </div>
              {l.notableAncestors.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-green-600 mb-2">🪶 Notable Ancestors</p>
                  {l.notableAncestors.map((a, i) => (
                    <p key={i} className="text-sm text-green-700 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{a}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PeopleTab({ searchQuery }) {
  const [people, setPeople] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [page, setPage] = useState(1);
  const PEOPLE_PER_PAGE = 8;

  useEffect(() => {
    getPeople(searchQuery).then(setPeople).catch(() => setPeople([]));
    if (!searchQuery) {
      getPeopleRecommendations().then(setSuggested).catch(() => setSuggested([]));
    }
  }, [searchQuery]);

  const notConnected = people.filter((p) => !p.isConnected);
  const connected = people.filter((p) => p.isConnected);

  return (
    <div className="space-y-6">
      <p className="text-sm text-green-700/70">Search for people by name, family name, clan, village, or house.</p>
      {suggested.length > 0 && (
        <section>
          <h3 className="text-md font-bold text-green-900 mb-3">Suggested Connections</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggested.slice(0, 6).map((rec) => (
              <PersonCard key={rec.personId} person={rec.person} reason={rec.reason} />
            ))}
          </div>
        </section>
      )}
      {notConnected.length > 0 && (
        <section>
          <h3 className="text-md font-bold text-green-900 mb-3">{searchQuery ? "Search Results" : "People You Can Connect With"}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notConnected.slice(0, PEOPLE_PER_PAGE).map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        </section>
      )}
      {connected.length > 0 && (
        <section>
          <h3 className="text-md font-bold text-green-900 mb-3">Your Connections</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connected.slice(0, PEOPLE_PER_PAGE).map((p) => (
              <PersonCard key={p.id} person={p} isConnected />
            ))}
          </div>
        </section>
      )}
      {people.length === 0 && (
        <p className="text-green-600 text-center py-12">No people found.</p>
      )}
    </div>
  );
}

function PersonCard({ person, reason, isConnected }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleConnect = async () => {
    setSending(true);
    try {
      await sendConnectionRequest({ receiver_id: person.id });
      setSent(true);
    } catch (err) {
      alert(err.message || "Failed to send request.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-cream-200 p-4 hover:border-green-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-cream-50 font-semibold text-sm ${isConnected ? "bg-green-600" : "bg-green-800"}`}>
          {person.avatar || getInitials(person.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-green-900 text-sm truncate">{person.name}</p>
          {person.location && <p className="text-xs text-green-500 truncate">{person.location}</p>}
        </div>
      </div>
      {reason && (
        <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800">💡 {reason}</p>
        </div>
      )}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1" />
        {isConnected ? (
          <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium">✓ Connected</span>
        ) : sent ? (
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium">Request Sent</span>
        ) : (
          <button
            onClick={handleConnect}
            disabled={sending}
            className="px-3 py-1.5 rounded-lg bg-green-800 text-cream-50 text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {sending ? "..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
}

function ConnectModal({ person, onClose }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      await sendConnectionRequest({ receiver_id: person.id, message });
      setSent(true);
    } catch (err) {
      alert(err.message || "Failed to send.");
    } finally {
      setSending(false);
    }
  };

  if (!person) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-cream-50 font-semibold text-sm">
                {person.avatar || getInitials(person.name)}
              </div>
              <div>
                <p className="font-semibold text-green-900">Connect with {person.name}</p>
                {person.location && <p className="text-xs text-green-600">{person.location}</p>}
              </div>
            </div>
            <textarea
              className="w-full border border-cream-200 rounded-lg p-3 text-sm text-green-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              rows={3}
              placeholder={`Hi ${person.name?.split(" ")[0]}, I'd love to connect!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-cream-200 text-green-700 text-sm font-medium hover:bg-cream-50 transition-colors">Cancel</button>
              <button onClick={handleSend} disabled={sending} className="flex-1 py-2.5 rounded-lg bg-green-800 text-cream-50 text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50">
                {sending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-semibold text-green-900 mb-1">Connection Request Sent!</p>
            <button onClick={onClose} className="mt-4 w-full py-2.5 rounded-lg bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateCommunityModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Neighborhood");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [colorKey, setColorKey] = useState("green");
  const [bannerKey, setBannerKey] = useState("green-gradient");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    setError("");
    try {
      await createCommunity({ name, type, description, location, visibility, color_key: colorKey, banner_key: bannerKey });
      onCreated();
    } catch (err) {
      setError(err.message || "Failed to create community.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-green-900 mb-4">Create a New Community</h3>
        {error && <div className="mb-4 px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">{error}</div>}
        <div className="space-y-4">
          <input type="text" placeholder="Community name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
            <option>School</option><option>Church</option><option>Mosque</option><option>Village</option>
            <option>Neighborhood</option><option>Family</option><option>Professional</option><option>Social Club</option>
          </select>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] resize-none" rows={3} />
          <input type="text" placeholder="Location (e.g. Lagos, Nigeria)" value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
          <div className="grid grid-cols-2 gap-3">
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <select value={colorKey} onChange={(e) => setColorKey(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cream-200 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="amber">Amber</option>
              <option value="red">Red</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-cream-200 text-green-700 text-sm font-medium hover:bg-cream-50 transition-colors">Cancel</button>
            <button onClick={handleCreate} disabled={!name.trim() || creating}
              className="flex-1 py-2.5 rounded-lg bg-green-800 text-cream-50 text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50">
              {creating ? "Creating..." : "Create Community"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
