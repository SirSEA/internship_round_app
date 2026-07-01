import { Link } from "react-router-dom";
import { lifeCircleMap, enrichedCommunities } from "../data/mock";

export default function Map() {
  const allCommunities = enrichedCommunities.flatMap((c) => c);

  return (
    <div className="flex-1 bg-cream-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-900">LifeCircle Map</h1>
          <p className="text-green-700/70">Every community that shapes your life, mapped in one place.</p>
        </div>

        <div className="space-y-6">
          {lifeCircleMap.map((circle) => (
            <div key={circle.label} className="bg-white p-5 rounded-xl border border-cream-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{circle.icon}</span>
                <div>
                  <h2 className="font-bold text-green-900">{circle.label}</h2>
                  <p className="text-xs text-green-500">{circle.communities.length} communities</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {circle.communities.map((name) => {
                  const community = allCommunities.find((c) => c.name === name || name.includes(c.name));
                  return (
                    <Link
                      key={name}
                      to={community ? `/dashboard/community/${community.id}` : "#"}
                      className="flex items-center gap-3 p-3 rounded-lg bg-cream-50 hover:bg-green-50/50 transition-colors border border-cream-100"
                    >
                      <div className={`w-10 h-10 rounded-lg ${community?.color || "bg-green-600"} flex items-center justify-center text-cream-50 font-bold text-sm`}>
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-900">{name}</p>
                        <p className="text-xs text-green-600">{community?.members || "?"} members</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
