import { Link, useLocation } from "react-router-dom";
import { user, communities } from "../data/mock";

const sidebarLinks = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "My Communities", path: "/dashboard/communities", icon: "👥" },
  { label: "LifeCircle Map", path: "/dashboard/map", icon: "🗺️" },
  { label: "Event Center", path: "/dashboard/events", icon: "📅" },
  { label: "Savings & Funds", path: "/dashboard/funds", icon: "💰" },
  { label: "Commerce", path: "/dashboard/marketplace", icon: "🏪" },
  { label: "Investments", path: "/dashboard/investments", icon: "📈" },
];

export default function DashboardSidebar({ open, onClose }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard/communities") {
      return location.pathname === "/dashboard/communities" || location.pathname.startsWith("/dashboard/community/");
    }
    return location.pathname === path;
  };

  const myCommunities = communities.filter((c) => [1, 2, 3, 5, 7, 8, 11].includes(c.id));

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="lc-sidebar-header">
        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-cream-50" />
          </div>
          <span className="text-lg font-bold text-green-800">LifeCircle</span>
        </Link>
      </div>

      <div className="p-4 border-b border-cream-200">
        <div className="lc-sidebar-user">
          <div className="lc-sidebar-avatar">{user.avatar}</div>
          <div>
            <p className="lc-sidebar-user-name">{user.name}</p>
            <p className="lc-sidebar-user-email">{user.location}</p>
          </div>
        </div>
      </div>

      <nav className="lc-sidebar-nav">
        {sidebarLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={
                "lc-sidebar-link" +
                (active ? " lc-sidebar-link-active" : "")
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}

        <div className="pt-3 mt-3 border-t border-cream-200">
          <p className="lc-sidebar-section">Quick Links</p>
          <Link
            to="/dashboard/communities?tab=family"
            onClick={onClose}
            className="lc-sidebar-link"
          >
            <span>👨‍👩‍👧‍👦</span>
            Family Branches
          </Link>
          <Link
            to="/dashboard/communities?tab=clan"
            onClick={onClose}
            className="lc-sidebar-link"
          >
            <span>🔗</span>
            Clan Connections
          </Link>
          <Link
            to="/dashboard/communities?tab=village"
            onClick={onClose}
            className="lc-sidebar-link"
          >
            <span>🌍</span>
            Village Links
          </Link>
          <Link
            to="/dashboard/communities?tab=lineage"
            onClick={onClose}
            className="lc-sidebar-link"
          >
            <span>📜</span>
            Lineage Records
          </Link>
          <Link
            to="/dashboard/communities?tab=people"
            onClick={onClose}
            className="lc-sidebar-link"
          >
            <span>👤</span>
            Discover People
          </Link>
        </div>

        <div className="pt-3 mt-3 border-t border-cream-200">
          <p className="lc-sidebar-section">My Communities</p>
          {myCommunities.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              to={`/dashboard/community/${c.id}`}
              onClick={onClose}
              className="lc-sidebar-link"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
              <span className="truncate">{c.name}</span>
            </Link>
          ))}
          <Link
            to="/dashboard/communities"
            onClick={onClose}
            className="block px-3 py-1.5 text-xs text-green-500 hover:text-green-700 mt-1 font-medium"
          >
            View all &rarr;
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-cream-200">
        <div className="flex flex-wrap gap-1.5">
          {myCommunities.slice(0, 6).map((c) => (
            <span key={c.id} className={`w-2 h-2 rounded-full ${c.color}`} title={c.name} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="lc-sidebar hidden lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="lc-sidebar-overlay" onClick={onClose} />
          <aside className="lc-sidebar lc-sidebar-open bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-end p-3 border-b border-cream-200 lg:hidden">
              <button
                onClick={onClose}
                className="lc-dash-menu-btn"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </aside>
        </div>
      )}
    </>
  );
}
