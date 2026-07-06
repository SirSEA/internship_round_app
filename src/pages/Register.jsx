import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateMe } from "../services/api";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.email, form.password);
      try { await updateMe({ name: form.name }); } catch {}
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
          {/* <h1 className="text-2xl font-bold text-brand">Create your account</h1> */}
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200">
          <div className="mb-5">
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-brand placeholder:text-center placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-base md:text-sm"
              required
            />
          </div>
          <div className="mb-5">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-brand placeholder:text-center placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-base md:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-brand placeholder:text-center placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-base md:text-sm"
              minLength={6}
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand text-white py-3 rounded-lg font-bold text-[14px] text-center hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating Account..." : "Sign up"}
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-brand font-semibold no-underline hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
