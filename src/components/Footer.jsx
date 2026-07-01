import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-green-900 text-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-800" />
              </div>
              <span className="text-xl font-bold text-cream-50">LifeCircle</span>
            </div>
            <p className="text-cream-300 max-w-md">
              Building community relationships and economic networks. Helping people
              reconnect, collaborate, support one another, and create economic opportunity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-cream-50 mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-cream-300 hover:text-cream-50 transition-colors">Home</Link>
              <Link to="/login" className="text-cream-300 hover:text-cream-50 transition-colors">Login</Link>
              <Link to="/register" className="text-cream-300 hover:text-cream-50 transition-colors">Register</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-cream-50 mb-3">Community</h4>
            <div className="flex flex-col gap-2 text-cream-300">
              <span>About</span>
              <span>Blog</span>
              <span>Support</span>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-cream-400 text-sm">
          &copy; {new Date().getFullYear()} LifeCircle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
