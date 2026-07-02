import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="lc-footer">
      <div className="lc-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="lc-footer-brand">
              <div className="lc-footer-logo">
                <div className="lc-footer-logo-dot" />
              </div>
              <span className="lc-footer-logo-text">LifeCircle</span>
            </div>
            <p className="lc-footer-desc">
              Building community relationships and economic networks. Helping people
              reconnect, collaborate, support one another, and create economic opportunity.
            </p>
          </div>
          <div>
            <h4 className="lc-footer-heading">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="lc-footer-link">Home</Link>
              <Link to="/login" className="lc-footer-link">Login</Link>
              <Link to="/register" className="lc-footer-link">Register</Link>
            </div>
          </div>
          <div>
            <h4 className="lc-footer-heading">Community</h4>
            <div className="flex flex-col gap-2 text-cream-300">
              <span className="lc-footer-link">About</span>
              <span className="lc-footer-link">Blog</span>
              <span className="lc-footer-link">Support</span>
            </div>
          </div>
        </div>
        <div className="lc-footer-divider">
          &copy; {new Date().getFullYear()} LifeCircle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
