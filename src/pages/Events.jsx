import { useState, useEffect } from "react";
import { events as mockEvents } from "../data/mock";
import { getEvents, createEvent } from "../services/api";
import Pagination from "../components/Pagination";

const EVENTS_PER_PAGE = 6;
const CATEGORIES = ["All", "Festival", "Workshop", "Meeting", "Fundraiser", "Community Service", "Social"];

const categoryColors = {
  Festival: "bg-purple-100 text-purple-700",
  Workshop: "bg-blue-100 text-blue-700",
  Meeting: "bg-amber-100 text-amber-700",
  Fundraiser: "bg-red-100 text-red-700",
  "Community Service": "bg-green-100 text-green-700",
  Social: "bg-pink-100 text-pink-700",
};

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [rsvpd, setRsvpd] = useState(new Set());
  const [saved, setSaved] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [shareId, setShareId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((data) => setAllEvents(Array.isArray(data) ? data : []))
      .catch(() => setAllEvents(mockEvents))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? allEvents : allEvents.filter((e) => e.category === filter);
  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  const toggleRsvp = (id) => {
    setRsvpd((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  const toggleSave = (id) => {
    setSaved((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  if (loading) {
    return (
      <div className="lc-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="lc-spinner" />
          <p className="lc-text-body">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lc-dashboard">
      <div className="lc-page-inner">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="lc-heading-page">Event Center</h1>
            <p className="lc-text-muted">Discover, RSVP, and create community events.</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="lc-btn-brand px-5 py-2.5">
            Create Event
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => { setFilter(cat); setPage(1); }}
              className={`lc-tab-base ${filter === cat ? "lc-tab-active" : "lc-tab-inactive"}`}>{cat}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map((e) => (
            <div key={e.id} className="lc-card-cream">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-green-100 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-green-800">{e.date.split(" ")[0]}</span>
                  <span className="text-xl font-bold text-green-800">{e.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-green-900">{e.title}</h3>
                  <p className="lc-text-subtle mt-0.5">{e.location} · {e.time}</p>
                  <p className="lc-text-muted text-sm mt-1 line-clamp-2">{e.description}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[e.category] || "bg-green-100 text-green-700"}`}>{e.category}</span>
                    <span className="lc-text-subtle">{e.attendees} attending</span>
                    <span className="lc-text-subtle">{e.community}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cream-100">
                    <button onClick={() => toggleRsvp(e.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        rsvpd.has(e.id) ? "bg-green-100 text-green-700" : "bg-green-800 text-cream-50 hover:bg-green-700"
                      }`}>
                      {rsvpd.has(e.id) ? "✓ RSVP'd" : "RSVP"}
                    </button>
                    <button onClick={() => toggleSave(e.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        saved.has(e.id) ? "bg-amber-100 text-amber-700" : "lc-btn-outline-sm"
                      }`}>
                      {saved.has(e.id) ? "★ Saved" : "Save"}
                    </button>
                    <button onClick={() => setShareId(shareId === e.id ? null : e.id)}
                      className="lc-btn-outline-sm">
                      Share
                    </button>
                    <button className="lc-btn-outline-sm">
                      + Calendar
                    </button>
                  </div>
                  {shareId === e.id && (
                    <div className="mt-2 px-3 py-2 bg-green-50 rounded-lg text-xs text-green-700">
                      Share link: <code className="bg-white px-2 py-0.5 rounded">{window.location.origin}/dashboard/events/{e.id}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function CreateEventModal({ onClose }) {
  const [form, setForm] = useState({ title: "", description: "", category: "Meeting", date: "", time: "", venue: "" });
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  const handlePublish = async () => {
    if (!form.title || !form.date || !form.time) return;
    setPublishing(true);
    setError("");
    try {
      await createEvent({
        title: form.title,
        description: form.description,
        category: form.category,
        date: form.date,
        time: form.time,
        location: form.venue,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create event.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="lc-modal-overlay" onClick={onClose}>
      <div className="lc-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="lc-heading-section mb-4">Create Event</h3>
        {error && <div className="mb-4 px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm">{error}</div>}
        <div className="space-y-4">
          <input type="text" placeholder="Event title" value={form.title} onChange={handleChange("title")}
            className="lc-input-modal" />
          <textarea placeholder="Description" value={form.description} onChange={handleChange("description")} rows={3}
            className="lc-textarea-modal" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.category} onChange={handleChange("category")}
              className="lc-input-modal">
              {CATEGORIES.filter((c) => c !== "All").map((c) => (<option key={c}>{c}</option>))}
            </select>
            <input type="text" placeholder="Venue" value={form.venue} onChange={handleChange("venue")}
              className="lc-input-modal" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="lc-label text-xs">Date</label>
              <input type="date" value={form.date} onChange={handleChange("date")}
                className="lc-input-modal" />
            </div>
            <div>
              <label className="lc-label text-xs">Time</label>
              <input type="time" value={form.time} onChange={handleChange("time")}
                className="lc-input-modal" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose}
              className="flex-1 lc-btn-cancel">Cancel</button>
            <button onClick={handlePublish} disabled={!form.title || !form.date || !form.time || publishing}
              className="flex-1 lc-btn-brand">
              {publishing ? "Publishing..." : "Publish Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
