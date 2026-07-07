import { useState, useEffect } from "react";
import { getDashboardSummary, getInvestmentPools } from "../services/api";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

const defaultInvestments = {
  totalInvested: 0,
  totalReturns: 0,
  activeInvestments: 0,
};

const mockPools = [
  { id: 1, name: "Community Farm Project", type: "Agriculture", totalPool: 500000, membersInvested: 12, expectedReturn: "15%", duration: "12 months", status: "active", community: "St. Mary's Church", communityId: 1 },
  { id: 2, name: "Real Estate Trust", type: "Real Estate", totalPool: 2000000, membersInvested: 25, expectedReturn: "20%", duration: "24 months", status: "active", community: "Al-Noor Mosque", communityId: 2 },
  { id: 3, name: "Tech Startup Fund", type: "Venture", totalPool: 1500000, membersInvested: 18, expectedReturn: "25%", duration: "18 months", status: "open", community: "Tech Founders Guild", communityId: 6 },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  open: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function Investments() {
  const [stats, setStats] = useState(defaultInvestments);
  const [pools, setPools] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDashboardSummary().catch(() => null),
      getInvestmentPools().catch(() => mockPools),
    ]).then(([data, poolData]) => {
      if (data) {
        setStats({
          totalInvested: data.savings?.totalSaved || 0,
          totalReturns: 0,
          activeInvestments: data.communities || 0,
        });
      }
      setPools(Array.isArray(poolData) ? poolData : []);
    }).finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(pools.length / ITEMS_PER_PAGE);
  const paginated = pools.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="lc-dashboard">
      <div className="lc-page-inner">
        <div className="mb-8">
          <h1 className="lc-heading-page">Investment Dashboard</h1>
          <p className="lc-text-muted">Pool resources and grow wealth together with your community.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="lc-card-cream">
            <span className="text-2xl block mb-1">💰</span>
            <p className="text-2xl font-bold text-green-900">{loading ? "..." : `₦${(stats.totalInvested / 1000000).toFixed(1)}M`}</p>
            <p className="lc-text-body">Total Invested</p>
          </div>
          <div className="lc-card-cream">
            <span className="text-2xl block mb-1">📈</span>
            <p className="text-2xl font-bold text-green-900">{loading ? "..." : `₦${(stats.totalReturns / 1000).toFixed(1)}K`}</p>
            <p className="lc-text-body">Total Returns</p>
          </div>
          <div className="lc-card-cream">
            <span className="text-2xl block mb-1">📊</span>
            <p className="text-2xl font-bold text-green-900">{loading ? "..." : stats.activeInvestments}</p>
            <p className="lc-text-body">Active Investments</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="lc-heading-section">Available Investment Pools</h2>
          <span className="lc-text-subtle">{pools.length} pools</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map((inv) => (
            <div key={inv.communityId + "-" + inv.id} className="lc-card-cream cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-green-900">{inv.name}</h3>
                  <p className="lc-text-subtle">{inv.community} · {inv.type}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[inv.status]}`}>{inv.status}</span>
              </div>
              <p className="text-2xl font-bold text-green-800 mb-2">₦{(inv.totalPool / 1000000).toFixed(1)}M</p>
              <div className="space-y-1 text-sm text-green-600 mb-3">
                <div className="flex justify-between">
                  <span>Members invested</span>
                  <span className="font-medium text-green-800">{inv.membersInvested}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected return</span>
                  <span className="font-medium text-green-800">{inv.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-green-800">{inv.duration}</span>
                </div>
              </div>
              {inv.status === "open" && (
                <button className="w-full lc-btn-brand">Invest Now</button>
              )}
              {inv.status === "active" && (
                <button className="w-full py-2.5 border border-green-800 text-green-800 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors cursor-pointer">View Details</button>
              )}
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
