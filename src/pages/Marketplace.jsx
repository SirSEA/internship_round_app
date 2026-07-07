import { useState } from "react";
import { marketplaceItems } from "../data/mock";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 8;

const categories = ["All", "Food", "Services", "Real Estate", "Fashion", "Automotive"];

export default function Marketplace() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = marketplaceItems.filter((item) => {
    const matchCategory = filter === "All" || item.category === filter;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.seller.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Commerce Directory</h1>
            <p className="text-green-700/70">Buy, sell, and trade within your trusted community network.</p>
          </div>
          <button className="px-5 py-2.5 bg-green-800 text-cream-50 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer">List Item</button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full sm:flex-1 sm:min-w-[160px] px-4 py-2.5 rounded-lg border border-cream-200 bg-[#F3F4F6] text-green-900 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
          />
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filter === cat
                    ? "bg-green-800 text-cream-50"
                    : "bg-white text-green-700 border border-cream-200 hover:border-green-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-cream-200 overflow-hidden hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-5xl">
                {item.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-green-900 text-sm">{item.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <span>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mb-1">{item.seller} · {item.category}</p>
                <p className="text-sm text-green-500 mb-2">{item.location}</p>
                <p className="text-lg font-bold text-green-800">{item.price}</p>
                <button className="mt-2 w-full py-2 border border-green-800 text-green-800 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors cursor-pointer">Contact Seller</button>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
