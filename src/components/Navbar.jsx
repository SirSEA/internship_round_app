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
          <Link to="/" className="lc-logo" onClick={() => setMobileOpen(false)}>
            <div className="lc-logo-icon">
              <div className="lc-logo-dot" />
            </div>
            <span className="lc-logo-text">LifeCircle</span>
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
            <Link to="/login" className="lc-nav-link" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className="lc-nav-cta" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
