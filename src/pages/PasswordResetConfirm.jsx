import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { confirmPasswordReset } from "../services/api";

export default function PasswordResetConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, message } = location.state || {};

  const [step, setStep] = useState("code");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleCodeSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    setStep("password");
    setError("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset(email, code.join(""), password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!email) return null;

  if (success) {
    return (
      <div className="lc-page-auth">
        <div className="w-full max-w-md">
          <div className="lc-card-auth text-center">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-brand mb-2">Password reset successful</h2>
            <p className="text-gray-500 text-sm mb-6">Your password has been updated. You can now sign in with your new password.</p>
            <Link
              to="/login"
              className="lc-btn-auth no-underline inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lc-page-auth">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 no-underline">
            <span className="lc-logo-round">ROUND</span>
          </Link>

          {step === "code" && (
            <>
              <h1 className="text-2xl font-bold text-brand">Enter reset code</h1>
              {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
              <p className="text-gray-500 mt-1">
                A 6-digit code was sent to <strong className="text-brand">{email}</strong>
              </p>
            </>
          )}
          {step === "password" && (
            <>
              <h1 className="text-2xl font-bold text-brand">Create new password</h1>
              <p className="text-gray-500 mt-1">Enter your new password below</p>
            </>
          )}
        </div>

        {step === "code" && (
          <div className="lc-card-auth">
            <div className="flex justify-center gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-11 h-12 text-center text-lg font-bold text-brand border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              ))}
            </div>
            {error && <p className="lc-error-msg">{error}</p>}
            <button
              onClick={handleCodeSubmit}
              disabled={code.join("").length !== 6}
              className="lc-btn-auth"
            >
              Confirm Code
            </button>
            <p className="text-center text-sm mt-4">
              <Link to="/forgot-password" className="lc-link-auth">Request new code</Link>
            </p>
          </div>
        )}

        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="lc-card-auth">
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className="lc-input-auth"
                minLength={6}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
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
          </form>
        )}
      </div>
    </div>
  );
}
