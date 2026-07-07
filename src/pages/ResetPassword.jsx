import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const oobCode = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oobCode) {
      setError("Invalid or expired reset link.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setDone(true);
    } catch (err) {
      const code = err?.code || "";
      if (code.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters.");
      } else if (code.includes("auth/expired-action-code")) {
        setError("This reset link has expired. Please request a new one.");
      } else if (code.includes("auth/invalid-action-code")) {
        setError("Invalid reset link. Please request a new one.");
      } else {
        setError("Something went wrong. Please try again.");
      }
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
          <h1 className="text-2xl font-bold text-brand">Reset password</h1>
          <p className="text-gray-500 mt-1">Enter your new password</p>
        </div>

        {done ? (
          <div className="lc-card-auth text-center">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-brand mb-2">Password reset successful</h2>
            <p className="text-gray-500 text-sm mb-6">Your password has been updated.</p>
            <Link
              to="/login"
              className="lc-btn-auth no-underline inline-block"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lc-card-auth">
            <div className="mb-6">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
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
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
            <p className="text-center text-sm mt-4">
              <Link to="/login" className="lc-link-auth">Back to Sign In</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
