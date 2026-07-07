import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { requestPasswordReset } from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await requestPasswordReset(email);
      navigate("/reset-password", { state: { email, message: res.detail } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lc-page-auth">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 no-underline">
            <span className="lc-logo-round">ROUND</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand">Forgot password</h1>
          <p className="text-gray-500 mt-1">Enter your email to receive a reset code</p>
        </div>

        <form onSubmit={handleSubmit} className="lc-card-auth">
          <div className="mb-6">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="lc-input-auth"
              required
            />
          </div>
          {error && <p className="lc-error-msg">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="lc-btn-auth"
          >
            {submitting ? "Sending..." : "Send Reset Code"}
          </button>
          <p className="text-center text-sm mt-4">
            <Link to="/login" className="lc-link-auth">Back to Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
