import { useState } from "react";
import { user, enrichedCommunities } from "../data/mock";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export default function Investments() {
  const [page, setPage] = useState(1);
  const allInvestments = enrichedCommunities.flatMap((c) =>
    c.investmentPools.map((inv) => ({ ...inv, community: c.name, communityId: c.id }))
  );

  const totalPages = Math.ceil(allInvestments.length / ITEMS_PER_PAGE);
  const paginated = allInvestments.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const statusColors = {
    active: "bg-green-100 text-green-700",
    open: "bg-blue-100 text-blue-700",
    closed: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">Investment Dashboard</h1>
          <p className="text-green-700/70">Pool resources and grow wealth together with your community.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-cream-200">
            <span className="text-2xl block mb-1">💰</span>
            <p className="text-2xl font-bold text-green-900">₦{(user.investments.totalInvested / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-green-600">Total Invested</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-cream-200">
            <span className="text-2xl block mb-1">📈</span>
            <p className="text-2xl font-bold text-green-900">₦{(user.investments.totalReturns / 1000).toFixed(1)}K</p>
            <p className="text-sm text-green-600">Total Returns</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-cream-200">
            <span className="text-2xl block mb-1">📊</span>
            <p className="text-2xl font-bold text-green-900">{user.investments.activeInvestments}</p>
            <p className="text-sm text-green-600">Active Investments</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-green-900">Available Investment Pools</h2>
          <span className="text-sm text-green-500">{allInvestments.length} pools</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map((inv) => (
            <div key={inv.communityId + "-" + inv.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-green-900">{inv.name}</h3>
                  <p className="text-xs text-green-500">{inv.community} · {inv.type}</p>
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
                <button className="w-full py-2.5 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Invest Now</button>
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
