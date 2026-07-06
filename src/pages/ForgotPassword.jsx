import { Link } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      const code = err?.code || "";
      if (code.includes("auth/user-not-found")) {
        setError("No account found with this email address.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Invalid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
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
          <p className="text-gray-500 mt-1">Enter your email to receive a reset link</p>
        </div>

        {sent ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-brand mb-2">Check your email</h2>
            <p className="text-gray-500 text-sm mb-6">
              We sent a password reset link to <strong className="text-brand">{email}</strong>
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-brand text-white py-3 rounded-lg font-bold text-[14px] text-center hover:opacity-90 transition-opacity no-underline"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
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
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center text-sm mt-4">
              <Link to="/login" className="text-brand font-semibold no-underline hover:underline">
                Back to Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
