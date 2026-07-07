import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyCommunitiesList } from "../services/api";

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const sidebarLinks = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "My Communities", path: "/dashboard/communities", icon: "👥" },
  { label: "LifeCircle Map", path: "/dashboard/map", icon: "🗺️" },
  { label: "Event Center", path: "/dashboard/events", icon: "📅" },
  { label: "Savings & Funds", path: "/dashboard/funds", icon: "💰" },
  { label: "Commerce", path: "/dashboard/marketplace", icon: "🏪" },
  { label: "Investments", path: "/dashboard/investments", icon: "📈" },
];

const bottomLinks = [
  { label: "Settings", path: "/dashboard/settings", icon: "⚙️" },
];

export default function DashboardSidebar({ open, onClose }) {
  const { logout, user, profile } = useAuth();
  const location = useLocation();
  const [myCommunities, setMyCommunities] = useState([]);
  const [loadingComms, setLoadingComms] = useState(true);

  useEffect(() => {
    getMyCommunitiesList()
      .then((data) => {
        if (Array.isArray(data)) setMyCommunities(data);
        else if (data?.communities) setMyCommunities(data.communities);
      })
      .catch(() => {})
      .finally(() => setLoadingComms(false));
  }, []);

  const displayName = profile?.name || user?.displayName || user?.email || "User";
  const displayInitials = profile?.avatar || getInitials(displayName);
  const displayLocation = profile?.location || "";

  const isActive = (path) => {
    if (path === "/dashboard/communities") {
      return location.pathname === "/dashboard/communities" || location.pathname.startsWith("/dashboard/community/");
    }
    return location.pathname === path;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="lc-sidebar-header">
        <Link to="/dashboard" onClick={onClose} className="no-underline">
          <span className="text-xl font-bold text-brand tracking-[0.02em] uppercase">ROUND</span>
        </Link>
      </div>

      <div className="p-4 border-b border-cream-200">
        <div className="lc-sidebar-user">
          <div className="lc-sidebar-avatar">{displayInitials}</div>
          <div>
            <p className="lc-sidebar-user-name">{displayName}</p>
            {displayLocation && <p className="lc-sidebar-user-email">{displayLocation}</p>}
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
          {myCommunities.length > 0 ? (
            <>
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
            </>
          ) : (
            <Link
              to="/dashboard/communities"
              onClick={onClose}
              className="lc-sidebar-link"
            >
              <span>👤</span>
              Discover People
            </Link>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-cream-200">
          <p className="lc-sidebar-section">My Communities</p>
          {loadingComms ? (
            <p className="text-xs text-green-400 px-3 py-2">Loading...</p>
          ) : myCommunities.length > 0 ? (
            myCommunities.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                to={`/dashboard/community/${c.id}`}
                onClick={onClose}
                className="lc-sidebar-link"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                <span className="truncate">{c.name}</span>
              </Link>
            ))
          ) : (
            <div className="px-3 py-2 space-y-2">
              <p className="text-xs text-green-500">You haven't joined any communities yet.</p>
              <Link
                to="/dashboard/communities"
                onClick={onClose}
                className="block text-xs text-green-700 font-medium hover:text-green-900"
              >
                Browse communities →
              </Link>
              <Link
                to="/dashboard/communities"
                onClick={() => { onClose(); }}
                className="block text-xs text-green-600 font-medium hover:text-green-800"
              >
                + Create a community
              </Link>
            </div>
          )}
          {myCommunities.length > 5 && (
            <Link
              to="/dashboard/communities"
              onClick={onClose}
              className="block px-3 py-1.5 text-xs text-green-500 hover:text-green-700 mt-1 font-medium"
            >
              View all &rarr;
            </Link>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-cream-200 space-y-3">
        {bottomLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                active ? "bg-green-100 text-green-800" : "text-green-700 hover:bg-green-50"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
        {myCommunities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {myCommunities.slice(0, 6).map((c) => (
              <span key={c.id} className="w-2 h-2 rounded-full bg-green-600" title={c.name} />
            ))}
          </div>
        )}
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
