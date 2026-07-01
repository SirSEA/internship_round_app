import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cream-50" />
            </div>
            <span className="text-xl font-bold text-green-800">LifeCircle</span>
          </Link>
          <h1 className="text-2xl font-bold text-green-900">Welcome back</h1>
          <p className="text-green-700/70 mt-1">Sign in to your LifeCircle</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-cream-200 shadow-sm">
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-green-900 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-cream-200 bg-cream-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-green-900 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-cream-200 bg-cream-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-cream-50 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-green-700/70 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-green-500 mt-6">
          Demo: click Sign In to access the dashboard
        </p>
      </div>
    </div>
  );
}
