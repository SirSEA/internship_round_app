import { useState, useEffect } from "react";
import { marketplaceItems as mockItems } from "../data/mock";
import { getMarketplaceItems } from "../services/api";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 8;

const categories = ["All", "Food", "Services", "Real Estate", "Fashion", "Automotive"];

export default function Marketplace() {
  const [allItems, setAllItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarketplaceItems()
      .then((data) => setAllItems(Array.isArray(data) ? data : []))
      .catch(() => setAllItems(mockItems))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allItems.filter((item) => {
    const matchCategory = filter === "All" || item.category === filter;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.seller.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="lc-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="lc-spinner" />
          <p className="lc-text-body">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lc-dashboard">
      <div className="lc-page-inner">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="lc-heading-page">Commerce Directory</h1>
            <p className="lc-text-muted">Buy, sell, and trade within your trusted community network.</p>
          </div>
          <button className="lc-btn-brand px-5 py-2.5">List Item</button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full sm:flex-1 sm:min-w-[160px] lc-input-settings bg-[#F3F4F6]"
          />
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setPage(1); }}
                className={`lc-tab-base ${filter === cat ? "lc-tab-active" : "lc-tab-inactive"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.map((item) => (
            <div key={item.id} className="lc-card-border hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
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
                <p className="lc-text-subtle mb-1">{item.seller} · {item.category}</p>
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
