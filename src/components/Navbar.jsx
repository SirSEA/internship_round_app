import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Get Started" },
];

export default function Navbar() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <nav className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cream-50" />
            </div>
            <span className="text-xl font-bold text-green-800">LifeCircle</span>
          </Link>
          <div className="flex items-center gap-4 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.to === "/register"
                    ? "bg-green-800 text-cream-50 px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    : "text-green-900 hover:text-green-700 font-medium transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
