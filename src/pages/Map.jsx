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
      <div className="flex-1 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-green-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">LifeCircle Map</h1>
          <p className="text-green-700/70">Every community that shapes your life, mapped in one place.</p>
        </div>

        {circleList.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🗺️</span>
            <h2 className="text-xl font-bold text-green-900 mb-2">No communities yet</h2>
            <p className="text-green-600">Join or create communities to see them here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {circleList.map((circle) => (
              <div key={circle.label} className="bg-white p-5 rounded-xl border border-cream-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{circle.icon}</span>
                  <div>
                    <h2 className="font-bold text-green-900">{circle.label}</h2>
                    <p className="text-xs text-green-500">{circle.communities.length} communit{circle.communities.length === 1 ? "y" : "ies"}</p>
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
