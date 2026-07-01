import { useState } from "react";
import { allSavingsPlans, user } from "../data/mock";
import Pagination from "../components/Pagination";

const PLANS_PER_PAGE = 6;
const TABLE_ROWS_PER_PAGE = 8;

const typeLabels = { daily: "Daily", monthly: "Monthly", rotational: "Rotational", goal: "Goal-Based" };
const typeColors = {
  daily: "bg-blue-100 text-blue-700",
  monthly: "bg-green-100 text-green-700",
  rotational: "bg-purple-100 text-purple-700",
  goal: "bg-amber-100 text-amber-700",
};
const typeIcons = { daily: "📅", monthly: "📆", rotational: "🔄", goal: "🎯" };

const filters = ["All", "Daily", "Monthly", "Rotational", "Goal-Based"];

export default function Funds() {
  const [filter, setFilter] = useState("All");
  const [planPage, setPlanPage] = useState(1);
  const [tablePage, setTablePage] = useState(1);

  const filtered = filter === "All" ? allSavingsPlans : allSavingsPlans.filter((sp) => sp.type === filter.toLowerCase().replace("-", ""));
  const totalPlanPages = Math.ceil(filtered.length / PLANS_PER_PAGE);
  const paginatedPlans = filtered.slice((planPage - 1) * PLANS_PER_PAGE, planPage * PLANS_PER_PAGE);

  const allRounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const totalTablePages = Math.ceil(allRounds.length / TABLE_ROWS_PER_PAGE);
  const paginatedRounds = allRounds.slice((tablePage - 1) * TABLE_ROWS_PER_PAGE, tablePage * TABLE_ROWS_PER_PAGE);

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">Savings & Funds</h1>
          <p className="text-green-700/70">Manage your savings, contributions, and community funds.</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-cream-200">
            <span className="text-xl block mb-1">{typeIcons.daily}</span>
            <p className="text-lg font-bold text-green-900">₦{(user.savings.dailyBalance / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">Daily Savings</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-cream-200">
            <span className="text-xl block mb-1">{typeIcons.monthly}</span>
            <p className="text-lg font-bold text-green-900">₦{(user.savings.monthlyBalance / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">Monthly Savings</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-cream-200">
            <span className="text-xl block mb-1">{typeIcons.rotational}</span>
            <p className="text-lg font-bold text-green-900">₦{(user.savings.rotationalBalance / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">Rotational Savings</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-cream-200">
            <span className="text-xl block mb-1">{typeIcons.goal}</span>
            <p className="text-lg font-bold text-green-900">₦{(user.savings.goalBalance / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">Goal-Based Savings</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPlanPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filter === f
                  ? "bg-green-800 text-cream-50"
                  : "bg-white text-green-700 border border-cream-200 hover:border-green-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {paginatedPlans.map((sp) => (
            <div key={sp.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{typeIcons[sp.type]}</span>
                  <div>
                    <h3 className="font-semibold text-green-900">{sp.name}</h3>
                    <p className="text-xs text-green-500">{sp.community}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[sp.type]}`}>{typeLabels[sp.type]}</span>
              </div>

              <p className="text-2xl font-bold text-green-800 mb-1">
                ₦{(sp.balance / 1000).toFixed(1)}K
                <span className="text-sm font-normal text-green-500"> / ₦{(sp.goal / 1000).toFixed(0)}K</span>
              </p>

              <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${Math.min(100, (sp.balance / sp.goal) * 100)}%` }} />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-green-600 mb-3">
                <span>Rate: {sp.rate}</span>
                <span>Members: {sp.members}</span>
                <span>Next due: {sp.nextDue}</span>
                <span>Contributed: {sp.contributed}x</span>
                {sp.currentTurn && <span>Current turn: {sp.currentTurn}</span>}
                {sp.nextTurn && <span>Next turn: {sp.nextTurn}</span>}
                {sp.targetDate && <span>Target: {sp.targetDate}</span>}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-800 text-cream-50 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">Contribute</button>
                <button className="px-4 py-2 border border-cream-200 text-green-700 rounded-lg text-sm font-medium hover:bg-cream-50 transition-colors cursor-pointer">Details</button>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={planPage} totalPages={totalPlanPages} onPageChange={setPlanPage} />

        {/* Rotational Contribution Details */}
        {allSavingsPlans.filter((sp) => sp.type === "rotational").length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-green-900 mb-4">Rotational Contribution Schedule</h2>
            <div className="bg-white rounded-xl border border-cream-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream-50">
                  <tr>
                    <th className="text-left p-3 text-green-700 font-medium">Round</th>
                    <th className="text-left p-3 text-green-700 font-medium">Member</th>
                    <th className="text-left p-3 text-green-700 font-medium">Amount</th>
                    <th className="text-left p-3 text-green-700 font-medium">Status</th>
                    <th className="text-left p-3 text-green-700 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {paginatedRounds.map((round) => {
                    const names = ["Chioma Eze", "Emeka Nwosu", "Adebayo Johnson", "Funke Adeleke", "Tunde Bakare", "Ngozi Okonkwo", "Kelechi Okafor", "Zainab Abdullah", "Chidi Obi", "Yetunde Alabi", "Musa Danjuma", "Amina Suleiman"];
                    const isCurrent = round === 3;
                    const isPast = round < 3;
                    return (
                      <tr key={round} className={`${isCurrent ? "bg-green-50" : ""} hover:bg-cream-50 transition-colors`}>
                        <td className="p-3 text-green-900 font-medium">Round {round}</td>
                        <td className="p-3 text-green-800">{names[round - 1]}</td>
                        <td className="p-3 text-green-800">₦10,000</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            isPast ? "bg-green-100 text-green-700" : isCurrent ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                          }`}>
                            {isPast ? "Paid" : isCurrent ? "Current" : "Pending"}
                          </span>
                        </td>
                        <td className="p-3 text-green-600">{isPast ? "2026-06-15" : isCurrent ? "2026-06-30" : `2026-${String(7 + round - 3).padStart(2, "0")}-15`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={tablePage} totalPages={totalTablePages} onPageChange={setTablePage} />
          </div>
        )}
      </div>
    </div>
  );
}
