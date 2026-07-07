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
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 no-underline">
            <span className="text-[32px] font-bold text-brand tracking-[0.02em] uppercase">ROUND</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand">Forgot password</h1>
          <p className="text-gray-500 mt-1">Enter your email to receive a reset code</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200">
          <div className="mb-6">
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
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand text-white py-3 rounded-lg font-bold text-[14px] text-center hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Reset Code"}
          </button>
          <p className="text-center text-sm mt-4">
            <Link to="/login" className="text-brand font-semibold no-underline hover:underline">
              Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
