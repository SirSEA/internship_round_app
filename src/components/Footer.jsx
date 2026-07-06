import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="lc-footer">
      <div className="lc-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-3">
              <span className="text-[32px] font-bold text-white tracking-[0.02em] uppercase">ROUND</span>
            </div>
            <p className="lc-footer-desc">
              Building community relationships and economic networks. Helping people
              reconnect, collaborate, support one another, and create economic opportunity.
            </p>
          </div>
          <div>
            <h4 className="lc-footer-heading">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-white no-underline hover:underline">Home</Link>
              <Link to="/login" className="text-white no-underline hover:underline">Login</Link>
              <Link to="/register" className="text-white no-underline hover:underline">Register</Link>
              <Link to="/forgot-password" className="text-white no-underline hover:underline">Forgot Password</Link>
            </div>
          </div>
          <div>
            <h4 className="lc-footer-heading">Community</h4>
            <div className="flex flex-col gap-2">
              <span className="text-white/60">About</span>
              <span className="text-white/60">Blog</span>
              <span className="text-white/60">Support</span>
            </div>
          </div>
        </div>
        <div className="lc-footer-divider">
          &copy; {new Date().getFullYear()} ROUND. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
