import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "communities", label: "Communities" },
  { id: "features", label: "Features" },
  { id: "map", label: "Map" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isLanding = location.pathname === "/";

  if (isDashboard) return null;

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isLanding) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + sectionId);
    }
  };

  return (
    <nav className="lc-nav">
      <div className="lc-nav-inner">
        <div className="lc-nav-content">
          <Link to="/" className="no-underline" onClick={() => setMobileOpen(false)}>
            <span className="text-[32px] font-bold text-brand tracking-[0.02em] uppercase">ROUND</span>
          </Link>

          <button
            className="lc-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className={"lc-nav-links" + (mobileOpen ? " lc-mobile-open" : "")}>
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={"#" + link.id}
                className="lc-nav-link"
                onClick={(e) => handleSectionClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" className="text-brand font-semibold no-underline hover:underline mr-6" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className="bg-brand text-white no-underline font-bold text-[14px] px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
