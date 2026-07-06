import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-0 no-underline">
            <span className="text-[32px] font-bold text-brand tracking-[0.02em] uppercase">ROUND</span>
          </Link>
          <p className="text-gray-500">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200">
          <div className="mb-5">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-brand placeholder:text-center placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-base md:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-brand placeholder:text-center placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-base md:text-sm"
              required
            />
          </div>
          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-brand text-sm font-semibold no-underline hover:underline">
              Forgot password?
            </Link>
          </div>
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand text-white py-3 rounded-lg font-bold text-[14px] text-center hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand font-semibold no-underline hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
