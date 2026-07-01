import { useState } from "react";
import { events as allEvents } from "../data/mock";
import Pagination from "../components/Pagination";

const EVENTS_PER_PAGE = 6;

const categoryColors = {
  Festival: "bg-purple-100 text-purple-700",
  Workshop: "bg-blue-100 text-blue-700",
  Meeting: "bg-amber-100 text-amber-700",
  Fundraiser: "bg-red-100 text-red-700",
  "Community Service": "bg-green-100 text-green-700",
  Social: "bg-pink-100 text-pink-700",
};

const categories = ["All", "Festival", "Workshop", "Meeting", "Fundraiser", "Community Service", "Social"];

export default function Events() {
  const [filter, setFilter] = useState("All");
  const [rsvpd, setRsvpd] = useState(new Set());
  const [page, setPage] = useState(1);

  const filtered = filter === "All" ? allEvents : allEvents.filter((e) => e.category === filter);
  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  const toggleRsvp = (id) => {
    setRsvpd((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Event Center</h1>
            <p className="text-green-700/70">Discover and RSVP to community events.</p>
          </div>
          <button className="px-5 py-2.5 bg-green-800 text-cream-50 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer">Create Event</button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map((e) => (
            <div key={e.id} className="bg-white p-5 rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-green-100 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-green-800">{e.date.split(" ")[0]}</span>
                  <span className="text-xl font-bold text-green-800">{e.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-green-900">{e.title}</h3>
                  <p className="text-xs text-green-600 mt-0.5">{e.location} · {e.time}</p>
                  <p className="text-sm text-green-700/70 mt-1 line-clamp-2">{e.description}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[e.category] || "bg-green-100 text-green-700"}`}>{e.category}</span>
                    <span className="text-xs text-green-500">{e.attendees} attending</span>
                    <span className="text-xs text-green-500">{e.community}</span>
                    <span className="text-xs text-green-400">by {e.organizer}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRsvp(e.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer self-center ${
                    rsvpd.has(e.id)
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-green-800 text-cream-50 hover:bg-green-700"
                  }`}
                >
                  {rsvpd.has(e.id) ? "RSVP'd ✓" : "RSVP"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
