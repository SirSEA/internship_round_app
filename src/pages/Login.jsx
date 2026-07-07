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
    <div className="lc-page-auth">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-0 no-underline">
            <span className="lc-logo-round">ROUND</span>
          </Link>
          <p className="text-gray-500">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="lc-card-auth">
          <div className="mb-5">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                className="lc-input-auth"
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
                autoComplete="current-password"
                className="lc-input-auth"
                required
              />
          </div>
          <div className="text-right mb-6">
            <Link to="/forgot-password" className="lc-link-auth text-sm">
              Forgot password?
            </Link>
          </div>
          {error && <p className="lc-error-msg">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="lc-btn-auth"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="lc-link-auth">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
