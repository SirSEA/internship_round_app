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
      try { await updateMe({ name: form.name }); } catch { /* silent */ }
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lc-page-auth">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-0 no-underline">
            <span className="lc-logo-round">ROUND</span>
          </Link>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="lc-card-auth">
          <div className="mb-5">
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="lc-input-auth"
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
              className="lc-input-auth"
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
              className="lc-input-auth"
              minLength={6}
              required
            />
          </div>
          {error && <p className="lc-error-msg">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="lc-btn-auth"
          >
            {submitting ? "Creating Account..." : "Sign up"}
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="lc-link-auth">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
