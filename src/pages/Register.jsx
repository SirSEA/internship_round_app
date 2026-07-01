import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
          <h1 className="text-2xl font-bold text-green-900">Create your LifeCircle</h1>
          <p className="text-green-700/70 mt-1">Start mapping your community network</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-cream-200 shadow-sm">
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-green-900 mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg border border-cream-200 bg-cream-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-green-900 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password (min. 8 characters)"
              className="w-full px-4 py-3 rounded-lg border border-cream-200 bg-cream-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-cream-50 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
          >
            Create Account
          </button>
          <p className="text-center text-sm text-green-700/70 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-green-500 mt-6">
          Demo: click Create Account to access the dashboard
        </p>
      </div>
    </div>
  );
}
