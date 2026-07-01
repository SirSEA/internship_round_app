import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  enrichedCommunities,
  user,
  familyBranches,
  clans,
  villages,
  lineageRecords,
  allPeople,
  peopleRecommendations,
  categoryIcons,
} from "../data/mock";
import Pagination from "../components/Pagination";

const tabs = [
  { id: "all", label: "All", icon: "📋" },
  { id: "my-communities", label: "My Communities", icon: "👥" },
  { id: "family", label: "Family Branches", icon: "👨‍👩‍👧‍👦" },
  { id: "clan", label: "Clan Connections", icon: "🔗" },
  { id: "village", label: "Village Links", icon: "🌍" },
  { id: "lineage", label: "Lineage Records", icon: "📜" },
  { id: "people", label: "Discover People", icon: "👤" },
];

const myCommunityIds = [1, 2, 3, 5, 7, 8, 11];
const myFamilySurname = user.familyName;
const myVillage = user.village;
const myClan = user.clan;

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export default function Communities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ tab: tabId });
    }
  };
  const [showConnectModal, setShowConnectModal] = useState(null);
  const [allCommunitiesPage, setAllCommunitiesPage] = useState(1);
  const [myCommunitiesPage, setMyCommunitiesPage] = useState(1);
  const [peopleNotConnectedPage, setPeopleNotConnectedPage] = useState(1);
  const [peopleConnectedPage, setPeopleConnectedPage] = useState(1);
  const [branchesPage, setBranchesPage] = useState(1);
  const [lineagePage, setLineagePage] = useState(1);
  const COMM_PER_PAGE = 6;
  const PEOPLE_PER_PAGE = 8;
  const BRANCHES_PER_PAGE = 4;

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

  const myCommunities = enrichedCommunities.filter((c) =>
    myCommunityIds.includes(c.id)
  );

  const filteredCommunities = useMemo(
    () => searchFilter(enrichedCommunities, ["name", "type", "description"]),
    [searchQuery]
  );

  const filteredBranches = useMemo(
    () => searchFilter(familyBranches, ["name", "surname", "house", "village", "clan"]),
    [searchQuery]
  );

  const filteredClans = useMemo(
    () => searchFilter(clans, ["name", "villages", "description"]),
    [searchQuery]
  );

  const filteredVillages = useMemo(
    () => searchFilter(villages, ["name", "state", "clans"]),
    [searchQuery]
  );

  const filteredLineage = useMemo(
    () => searchFilter(lineageRecords, ["familyName", "house", "village", "clan", "patriarch", "matriarch"]),
    [searchQuery]
  );

  const filteredPeople = useMemo(
    () => searchFilter(allPeople, ["name", "familyName", "clan", "village", "house", "relation"]),
    [searchQuery]
  );

  const suggestedPeople = peopleRecommendations
    .map((r) => ({ ...r, person: allPeople.find((p) => p.personId === r.personId) }))
    .filter((r) => r.person && !r.person.isConnected);

  const relatedPeople = allPeople.filter(
    (p) =>
      p.id !== user.id &&
      (p.familyName === myFamilySurname ||
        p.clan === myClan ||
        p.village === myVillage) &&
      !p.isConnected
  );

  function ConnectModal({ person, onClose }) {
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    if (!person) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-cream-50 font-semibold text-sm">
                  {person.avatar}
                </div>
                <div>
                  <p className="font-semibold text-green-900">Connect with {person.name}</p>
                  <p className="text-xs text-green-600">{person.relation}</p>
                </div>
              </div>
              <p className="text-sm text-green-700 mb-2">Add a personal note (optional):</p>
              <textarea
                className="w-full border border-cream-200 rounded-lg p-3 text-sm text-green-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={3}
                placeholder={`Hi ${person.name.split(" ")[0]}, I'd love to connect on LifeCircle!`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-green-500 mt-2">
                {person.mutualConnections > 0
                  ? `${person.mutualConnections} mutual connection${person.mutualConnections > 1 ? "s" : ""}`
                  : "No mutual connections yet"}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-cream-200 text-green-700 text-sm font-medium hover:bg-cream-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSent(true)}
                  className="flex-1 py-2.5 rounded-lg bg-green-700 text-cream-50 text-sm font-medium hover:bg-green-800 transition-colors"
                >
                  Send Connect Request
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-green-900 mb-1">Connection Request Sent!</p>
              <p className="text-sm text-green-600">Your request to connect with {person.name} has been sent.</p>
              <button
                onClick={onClose}
                className="mt-4 w-full py-2.5 rounded-lg bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderTabBar() {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-green-700 text-cream-50"
                : "bg-white text-green-700 border border-cream-200 hover:border-green-300"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  function renderAllTab() {
    return (
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-green-900">My Communities</h2>
            <button
              onClick={() => handleTabChange("my-communities")}
              className="text-sm text-green-600 hover:text-green-800"
            >
              View all →
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {myCommunities.map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        </section>

        {suggestedPeople.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-green-900 mb-4">People You May Know</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedPeople.slice(0, 6).map((rec) => (
                <PersonCard
                  key={rec.personId}
                  person={rec.person}
                  reason={rec.reason}
                  onConnect={() => setShowConnectModal(rec.person)}
                />
              ))}
            </div>
          </section>
        )}

        {relatedPeople.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-green-900 mb-4">
              Discover Connections — Same {relatedPeople.some((p) => p.familyName === myFamilySurname) ? "Family Name" : relatedPeople.some((p) => p.village === myVillage) ? "Village" : "Clan"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPeople.slice(0, 6).map((p) => (
                <PersonCard
                  key={p.id}
                  person={p}
                  reason={
                    p.familyName === myFamilySurname
                      ? `Same family name — ${p.familyName}`
                      : p.village === myVillage
                        ? `Same village — ${p.village}`
                        : `Same clan — ${p.clan}`
                  }
                  onConnect={() => setShowConnectModal(p)}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-green-900">All Communities</h2>
            <span className="text-sm text-green-500">{filteredCommunities.length} total</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCommunities.slice((allCommunitiesPage - 1) * COMM_PER_PAGE, allCommunitiesPage * COMM_PER_PAGE).map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
          <Pagination page={allCommunitiesPage} totalPages={Math.ceil(filteredCommunities.length / COMM_PER_PAGE)} onPageChange={setAllCommunitiesPage} />
        </section>
      </div>
    );
  }

  function renderMyCommunitiesTab() {
    const paginated = myCommunities.slice((myCommunitiesPage - 1) * COMM_PER_PAGE, myCommunitiesPage * COMM_PER_PAGE);
    return (
      <div>
        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map((c) => (
            <CommunityCard key={c.id} community={c} />
          ))}
        </div>
        {myCommunities.length === 0 && (
          <p className="text-green-600 text-center py-12">No communities found.</p>
        )}
        <Pagination page={myCommunitiesPage} totalPages={Math.ceil(myCommunities.length / COMM_PER_PAGE)} onPageChange={setMyCommunitiesPage} />
      </div>
    );
  }

  function renderFamilyTab() {
    const branches = searchQuery.trim() ? filteredBranches : familyBranches;
    const paginatedBranches = branches.slice((branchesPage - 1) * BRANCHES_PER_PAGE, branchesPage * BRANCHES_PER_PAGE);
    const lineageData = searchQuery.trim() ? filteredLineage : lineageRecords;
    const paginatedLineage = lineageData.slice((lineagePage - 1) * BRANCHES_PER_PAGE, lineagePage * BRANCHES_PER_PAGE);
    return (
      <div className="space-y-6">
        <p className="text-sm text-green-700/70">Explore family branches, houses, and extended relatives.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {paginatedBranches.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-amber-300 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900">{b.name}</h3>
                  <p className="text-xs text-green-500 mt-0.5">
                    {b.surname} · {b.house} House · {b.village}
                  </p>
                  <p className="text-sm text-green-700/70 mt-2">{b.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-green-600">
                    <span>{b.members} members</span>
                    <span>Elders: {b.elders.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={branchesPage} totalPages={Math.ceil(branches.length / BRANCHES_PER_PAGE)} onPageChange={setBranchesPage} />

        <section>
          <h3 className="text-md font-bold text-green-900 mb-3">Lineage Records</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {paginatedLineage.map((l) => (
              <div key={l.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-amber-300 hover:shadow-lg transition-all">
                <h4 className="font-bold text-green-900">{l.familyName} · {l.house}</h4>
                <p className="text-xs text-green-500">{l.village}, {l.clan} Clan · {l.generation}th Generation</p>
                <div className="mt-3 space-y-1 text-sm text-green-700">
                  <p>Patriarch: <span className="font-medium">{l.patriarch}</span></p>
                  <p>Matriarch: <span className="font-medium">{l.matriarch}</span></p>
                  <p>Origin: {l.origin}</p>
                </div>
                {l.notableAncestors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-amber-700 mb-1">Notable Ancestors</p>
                    <ul className="list-disc list-inside text-xs text-green-600 space-y-0.5">
                      {l.notableAncestors.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {l.branches.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {l.branches.map((br, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                        {br}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination page={lineagePage} totalPages={Math.ceil(lineageData.length / BRANCHES_PER_PAGE)} onPageChange={setLineagePage} />
        </section>
      </div>
    );
  }

  function renderClanTab() {
    const clanData = searchQuery.trim() ? filteredClans : clans;
    return (
      <div className="space-y-6">
        <p className="text-sm text-green-700/70">Discover clan networks, totems, and extended lineage connections.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {clanData.map((cl) => (
            <div key={cl.id} className="bg-white rounded-xl border border-cream-200 p-5 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-bold text-green-900 text-lg">{cl.name}</h3>
              </div>
              <p className="text-sm text-green-700/70 mb-3">{cl.description}</p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  Totem: {cl.totem}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  ~{cl.population.toLocaleString()} population
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-green-500 mb-1">Associated Villages</p>
                <div className="flex flex-wrap gap-1.5">
                  {cl.villages.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderVillageTab() {
    const villageData = searchQuery.trim() ? filteredVillages : villages;
    return (
      <div className="space-y-6">
        <p className="text-sm text-green-700/70">Connect with your village/town associations and discover neighbours.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {villageData.map((v) => (
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
                      <span key={i} className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-xs font-medium">
                        {cl} Clan
                      </span>
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

  function renderLineageTab() {
    const lineageData = searchQuery.trim() ? filteredLineage : lineageRecords;
    return (
      <div className="space-y-6">
        <p className="text-sm text-green-700/70">Search family lineage, ancestry records, and historical documents.</p>
        {lineageData.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-cream-200 p-6 hover:border-green-300 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📜</span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-green-900 text-lg">{l.familyName} Lineage</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                    {l.generation}th Generation
                  </span>
                </div>
                <p className="text-xs text-green-500 mt-0.5">
                  {l.house} · {l.village} · {l.clan} Clan
                </p>
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

                <div className="mt-4">
                  <p className="text-xs font-medium text-green-600 mb-2">🪶 Notable Ancestors</p>
                  <div className="space-y-1">
                    {l.notableAncestors.map((a, i) => (
                      <p key={i} className="text-sm text-green-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {a}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium text-green-600 mb-2">📋 Historical Records</p>
                  <div className="flex flex-wrap gap-2">
                    {l.records.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs border border-amber-200">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/dashboard/community/${enrichedCommunities.find((c) => c.name.toLowerCase().includes(l.familyName.toLowerCase()))?.id || 5}`}
                  className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-green-700 text-cream-50 text-sm font-medium hover:bg-green-800 transition-colors"
                >
                  View Community ↗
                </Link>
              </div>
            </div>
          </div>
        ))}
        {lineageData.length === 0 && (
          <p className="text-green-600 text-center py-12">No lineage records found.</p>
        )}
      </div>
    );
  }

  function renderPeopleTab() {
    const people = searchQuery.trim() ? filteredPeople : allPeople.filter((p) => p.id !== user.id);
    const connected = people.filter((p) => p.isConnected);
    const notConnected = people.filter((p) => !p.isConnected && p.id !== user.id);

    return (
      <div className="space-y-6">
        <p className="text-sm text-green-700/70">Search for people by name, family name, clan, village, or house.</p>

        {suggestedPeople.length > 0 && !searchQuery.trim() && (
          <section>
            <h3 className="text-md font-bold text-green-900 mb-3">Suggested Connections</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedPeople.map((rec) => (
                <PersonCard
                  key={rec.personId}
                  person={rec.person}
                  reason={rec.reason}
                  onConnect={() => setShowConnectModal(rec.person)}
                />
              ))}
            </div>
          </section>
        )}

        {notConnected.length > 0 && (
          <section>
            <h3 className="text-md font-bold text-green-900 mb-3">
              {searchQuery.trim() ? "Search Results" : "People You Can Connect With"}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notConnected.slice((peopleNotConnectedPage - 1) * PEOPLE_PER_PAGE, peopleNotConnectedPage * PEOPLE_PER_PAGE).map((p) => (
                <PersonCard
                  key={p.id}
                  person={p}
                  reason={
                    p.familyName === myFamilySurname
                      ? `Same family name`
                      : p.clan === myClan
                        ? `Same clan`
                        : p.village === myVillage
                          ? `Same village`
                          : null
                  }
                  onConnect={() => setShowConnectModal(p)}
                />
              ))}
            </div>
            <Pagination page={peopleNotConnectedPage} totalPages={Math.ceil(notConnected.length / PEOPLE_PER_PAGE)} onPageChange={setPeopleNotConnectedPage} />
          </section>
        )}

        {connected.length > 0 && (
          <section>
            <h3 className="text-md font-bold text-green-900 mb-3">Your Connections</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connected.slice((peopleConnectedPage - 1) * PEOPLE_PER_PAGE, peopleConnectedPage * PEOPLE_PER_PAGE).map((p) => (
                <PersonCard key={p.id} person={p} isConnected />
              ))}
            </div>
            <Pagination page={peopleConnectedPage} totalPages={Math.ceil(connected.length / PEOPLE_PER_PAGE)} onPageChange={setPeopleConnectedPage} />
          </section>
        )}

        {people.length === 0 && (
          <p className="text-green-600 text-center py-12">No people found matching your search.</p>
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return renderAllTab();
      case "my-communities":
        return renderMyCommunitiesTab();
      case "family":
        return renderFamilyTab();
      case "clan":
        return renderClanTab();
      case "village":
        return renderVillageTab();
      case "lineage":
        return renderLineageTab();
      case "people":
        return renderPeopleTab();
      default:
        return renderAllTab();
    }
  };

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-900">My Communities</h1>
          <p className="text-green-700/70 text-sm">
            Manage communities, discover family & clan connections, and find people you may know.
          </p>
        </div>

        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search communities, family names, clans, villages, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-white text-sm text-green-800 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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

        <div className="mb-6">{renderTabBar()}</div>

        {renderContent()}
      </div>

      {showConnectModal && (
        <ConnectModal
          person={showConnectModal}
          onClose={() => setShowConnectModal(null)}
        />
      )}
    </div>
  );
}

function CommunityCard({ community: c }) {
  return (
    <Link
      to={`/dashboard/community/${c.id}`}
      className="bg-white rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className={`h-24 bg-gradient-to-r ${c.banner} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="text-2xl">{categoryIcons[c.type] || "👥"}</span>
          <span className="text-cream-50 font-bold text-lg drop-shadow-sm">{c.name}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-green-700/70 mb-3 line-clamp-2">{c.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600">{c.type}</span>
          <div className="flex items-center gap-3">
            <span className="text-green-700 font-medium">{c.members} members</span>
            <span className="text-green-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PersonCard({ person, reason, onConnect, isConnected }) {
  return (
    <div className="bg-white rounded-xl border border-cream-200 p-4 hover:border-green-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-cream-50 font-semibold text-sm ${
          isConnected ? "bg-green-600" : "bg-green-700"
        }`}>
          {person.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-green-900 text-sm truncate">{person.name}</p>
          <p className="text-xs text-green-500 truncate">{person.location}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          {person.familyName && (
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-medium">
              {person.familyName}
            </span>
          )}
        </div>
      </div>
      {reason && (
        <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800">
            💡 {reason}
          </p>
        </div>
      )}
      <div className="flex items-center gap-2 mt-3">
        {person.mutualConnections > 0 && (
          <span className="text-xs text-green-500">
            {person.mutualConnections} mutual
          </span>
        )}
        <div className="flex-1" />
        {!isConnected && onConnect && (
          <button
            onClick={onConnect}
            className="px-3 py-1.5 rounded-lg bg-green-700 text-cream-50 text-xs font-medium hover:bg-green-800 transition-colors"
          >
            Connect
          </button>
        )}
        {isConnected && (
          <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
            ✓ Connected
          </span>
        )}
      </div>
    </div>
  );
}
