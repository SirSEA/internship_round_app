import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities } from "../services/api";

const circleConfig = {
  School: { label: "Schools & Education", icon: "🎓" },
  Church: { label: "Spiritual", icon: "⛪" },
  Mosque: { label: "Spiritual", icon: "🕌" },
  Village: { label: "Village & Town", icon: "🌍" },
  Neighborhood: { label: "Neighborhood", icon: "🏘️" },
  Family: { label: "Family & Lineage", icon: "👨‍👩‍👧‍👦" },
  Professional: { label: "Professional", icon: "💼" },
  "Social Club": { label: "Social Clubs", icon: "🎉" },
};

const colorForType = {
  School: "bg-blue-600",
  Church: "bg-purple-600",
  Mosque: "bg-emerald-600",
  Village: "bg-teal-600",
  Neighborhood: "bg-amber-600",
  Family: "bg-green-700",
  Professional: "bg-indigo-600",
  "Social Club": "bg-pink-600",
};

function getInitials(name) {
  return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
}

export default function Map() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunities()
      .then((data) => setCommunities(Array.isArray(data) ? data : []))
      .catch(() => setCommunities([]))
      .finally(() => setLoading(false));
  }, []);

  const circles = {};
  communities.forEach((c) => {
    const cfg = circleConfig[c.type] || { label: "Other", icon: "📌" };
    const key = cfg.label;
    if (!circles[key]) circles[key] = { ...cfg, communities: [] };
    circles[key].communities.push(c);
  });
  const circleList = Object.entries(circles).map(([, v]) => v);

  if (loading) {
    return (
      <div className="lc-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="lc-spinner" />
          <p className="lc-text-body">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lc-dashboard">
      <div className="lc-page-inner">
        <div className="mb-8">
          <h1 className="lc-heading-page">LifeCircle Map</h1>
          <p className="lc-text-muted">Every community that shapes your life, mapped in one place.</p>
        </div>

        {circleList.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🗺️</span>
            <h2 className="text-xl font-bold text-green-900 mb-2">No communities yet</h2>
            <p className="lc-text-body">Join or create communities to see them here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {circleList.map((circle) => (
              <div key={circle.label} className="lc-card-cream">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{circle.icon}</span>
                  <div>
                    <h2 className="font-bold text-green-900">{circle.label}</h2>
                    <p className="lc-text-subtle">{circle.communities.length} communit{circle.communities.length === 1 ? "y" : "ies"}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {circle.communities.map((c) => (
                    <Link
                      key={c.id}
                      to={`/dashboard/community/${c.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-cream-50 hover:bg-green-50/50 transition-colors border border-cream-100"
                    >
                      <div className={`w-10 h-10 rounded-lg ${colorForType[c.type] || "bg-green-600"} flex items-center justify-center text-cream-50 font-bold text-sm`}>
                        {getInitials(c.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-900">{c.name}</p>
                        <p className="text-xs text-green-600">{c.member_count || 0} members</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
