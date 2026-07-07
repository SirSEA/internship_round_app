import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateMe, requestPasswordReset, confirmPasswordReset } from "../services/api";

const TABS = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "privacy", label: "Privacy", icon: "🛡️" },
  { id: "password", label: "Password", icon: "🔑" },
  { id: "delete", label: "Delete Account", icon: "⚠️" },
  { id: "theme", label: "Theme", icon: "🎨" },
  { id: "language", label: "Language", icon: "🌐" },
];

export default function Settings() {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="lc-dashboard">
      <div className="lc-dashboard-inner">
        <div className="mb-6">
          <h1 className="lc-heading-page">Settings</h1>
          <p className="lc-text-muted text-sm">Manage your account, profile, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "lc-sidebar-tab-active"
                      : "lc-sidebar-tab-inactive"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 min-w-0">
            {activeTab === "profile" && <ProfileTab key={profile?.id || "no-profile"} profile={profile} user={user} refreshProfile={refreshProfile} />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "privacy" && <PrivacyTab />}
            {activeTab === "password" && <PasswordTab key={user?.uid || "no-user"} user={user} />}
            {activeTab === "delete" && <DeleteAccountTab />}
            {activeTab === "theme" && <ThemeTab />}
            {activeTab === "language" && <LanguageTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ profile, user, refreshProfile }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
    family_name: profile?.family_name || "",
    house: profile?.house || "",
    village: profile?.village || "",
    clan: profile?.clan || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await updateMe(form);
      await refreshProfile();
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Profile</h2>
      <p className="lc-text-body mb-6">Update your personal information and community background.</p>

      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="lc-label">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className="lc-input-settings"
            />
          </div>
          <div>
            <label className="lc-label">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="lc-input-settings text-green-500 bg-cream-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="lc-label">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={handleChange("phone")}
              className="lc-input-settings"
            />
          </div>
          <div>
            <label className="lc-label">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={handleChange("location")}
              placeholder="City, Country"
              className="lc-input-settings"
            />
          </div>
        </div>

        <div>
          <label className="lc-label">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={handleChange("bio")}
            className="lc-input-settings resize-none"
          />
        </div>

        <div className="border-t border-cream-200 pt-5">
          <h3 className="text-sm font-bold text-green-900 mb-3">Community Background</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="lc-label">Family Name</label>
              <input
                type="text"
                value={form.family_name}
                onChange={handleChange("family_name")}
                className="lc-input-settings"
              />
            </div>
            <div>
              <label className="lc-label">House</label>
              <input
                type="text"
                value={form.house}
                onChange={handleChange("house")}
                className="lc-input-settings"
              />
            </div>
            <div>
              <label className="lc-label">Village</label>
              <input
                type="text"
                value={form.village}
                onChange={handleChange("village")}
                className="lc-input-settings"
              />
            </div>
            <div>
              <label className="lc-label">Clan</label>
              <input
                type="text"
                value={form.clan}
                onChange={handleChange("clan")}
                className="lc-input-settings"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="lc-btn-brand"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Security</h2>
      <p className="lc-text-body mb-6">Manage your account security settings.</p>
      <div className="space-y-4">
        <div className="lc-setting-row">
          <div>
            <p className="text-sm font-medium text-green-900">Two-Factor Authentication</p>
            <p className="lc-text-subtle">Add an extra layer of security to your account.</p>
          </div>
          <label className="lc-toggle">
            <input type="checkbox" />
            <div className="lc-toggle-track" />
            <div className="lc-toggle-thumb" />
          </label>
        </div>
        <div className="lc-setting-row">
          <div>
            <p className="text-sm font-medium text-green-900">Login Alerts</p>
            <p className="lc-text-subtle">Get notified of new sign-ins to your account.</p>
          </div>
          <label className="lc-toggle">
            <input type="checkbox" defaultChecked />
            <div className="lc-toggle-track" />
            <div className="lc-toggle-thumb" />
          </label>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const toggles = [
    { label: "Community Updates", desc: "New posts, events, and announcements from your communities" },
    { label: "Connection Requests", desc: "When someone sends you a connection request" },
    { label: "Messages", desc: "Direct messages from other members" },
    { label: "Payment Reminders", desc: "Dues, levies, and contribution deadlines" },
    { label: "Event Reminders", desc: "Upcoming events you've RSVP'd to" },
  ];
  const [enabled, setEnabled] = useState(new Set(toggles.map((_, i) => i)));

  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Notifications</h2>
      <p className="lc-text-body mb-6">Choose what notifications you receive.</p>
      <div className="space-y-3">
        {toggles.map((t, i) => (
          <div key={i} className="lc-setting-row">
            <div>
              <p className="text-sm font-medium text-green-900">{t.label}</p>
              <p className="lc-text-subtle">{t.desc}</p>
            </div>
            <label className="lc-toggle">
              <input
                type="checkbox"
                checked={enabled.has(i)}
                onChange={() => {
                  const next = new Set(enabled);
                  if (next.has(i)) next.delete(i); else next.add(i);
                  setEnabled(next);
                }}
              />
              <div className="lc-toggle-track" />
              <div className="lc-toggle-thumb" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyTab() {
  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Privacy</h2>
      <p className="lc-text-body mb-6">Control who can see your information.</p>
      <div className="space-y-4">
        {[
          { label: "Profile Visibility", desc: "Make your profile visible to everyone" },
          { label: "Show Email", desc: "Display your email on your profile" },
          { label: "Show Location", desc: "Display your location on your profile" },
          { label: "Activity Status", desc: "Show when you're active" },
        ].map((item, i) => (
          <div key={i} className="lc-setting-row">
            <div>
              <p className="text-sm font-medium text-green-900">{item.label}</p>
              <p className="lc-text-subtle">{item.desc}</p>
            </div>
            <label className="lc-toggle">
              <input type="checkbox" defaultChecked={i !== 2} />
              <div className="lc-toggle-track" />
              <div className="lc-toggle-thumb" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PasswordTab({ user }) {
  const [step, setStep] = useState("request");
  const [email, setEmail] = useState(user?.email || "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }
    setSubmitting(true);
    try {
      await requestPasswordReset(email);
      setMessage({ type: "success", text: "A verification code has been sent to your email." });
      setStep("confirm");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to send reset code." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset(email, code, newPassword);
      setMessage({ type: "success", text: "Password updated successfully." });
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
      setStep("request");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update password." });
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "confirm") {
    return (
      <div className="lc-card-white">
        <h2 className="lc-heading-section mb-1">Confirm Reset</h2>
        <p className="lc-text-body mb-6">Enter the code sent to <strong>{email}</strong> and set your new password.</p>

        {message.text && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.text}</div>
        )}

        <form onSubmit={handleConfirmReset} className="space-y-4 max-w-md">
          <div>
            <label className="lc-label">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code from email"
              required
              className="lc-input-settings"
            />
          </div>
          <div>
            <label className="lc-label">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              minLength={6}
              required
              className="lc-input-settings"
            />
          </div>
          <div>
            <label className="lc-label">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              minLength={6}
              required
              className="lc-input-settings"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 lc-btn-brand"
            >
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("request"); setMessage({ type: "", text: "" }); }}
              className="lc-btn-cancel flex-1"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Password</h2>
      <p className="lc-text-body mb-6">Change your account password. A verification code will be sent to your email.</p>

      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.text}</div>
      )}

      <form onSubmit={handleRequestCode} className="space-y-4 max-w-md">
        <div>
          <label className="lc-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="lc-input-settings"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="lc-btn-brand"
        >
          {submitting ? "Sending..." : "Send Verification Code"}
        </button>
      </form>
    </div>
  );
}

function DeleteAccountTab() {
  const [confirm, setConfirm] = useState("");

  return (
    <div className="bg-white rounded-xl border border-red-200 p-6">
      <h2 className="lc-heading-section text-red-800 mb-1">Delete Account</h2>
      <p className="text-sm text-red-600 mb-6">Permanently delete your account and all associated data. This action cannot be undone.</p>

      <div className="bg-red-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-red-800 font-medium mb-2">⚠️ What happens when you delete your account:</p>
        <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
          <li>Your profile and personal information will be permanently removed</li>
          <li>You will lose access to all communities you belong to</li>
          <li>Your connections will be removed</li>
          <li>All contributions and financial records will be deleted</li>
        </ul>
      </div>

      <div className="max-w-md">
        <label className="block text-sm font-medium text-red-800 mb-1">Type "DELETE" to confirm</label>
        <input
          type="text"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder='Type "DELETE"'
          className="w-full px-4 py-2.5 rounded-lg border border-red-300 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
        />
        <button
          disabled={confirm !== "DELETE"}
          className="mt-3 px-6 py-2.5 bg-red-700 text-cream-50 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}

function ThemeTab() {
  const themes = [
    { id: "light", label: "Light", icon: "☀️", desc: "Clean and bright interface" },
    { id: "dark", label: "Dark", icon: "🌙", desc: "Easy on the eyes at night" },
    { id: "system", label: "System", icon: "💻", desc: "Follow your device settings" },
  ];
  const [selected, setSelected] = useState("light");

  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Theme</h2>
      <p className="lc-text-body mb-6">Choose your preferred appearance.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selected === t.id
                ? "border-green-700 bg-green-50"
                : "border-cream-200 bg-white hover:border-green-300"
            }`}
          >
            <span className="text-2xl block mb-2">{t.icon}</span>
            <p className="text-sm font-medium text-green-900">{t.label}</p>
            <p className="text-xs text-green-500 mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageTab() {
  const languages = [
    { code: "en", label: "English", native: "English" },
    { code: "ha", label: "Hausa", native: "Hausa" },
    { code: "yo", label: "Yoruba", native: "Yoruba" },
    { code: "ig", label: "Igbo", native: "Igbo" },
    { code: "pcm", label: "Nigerian Pidgin", native: "Pidgin" },
    { code: "fr", label: "French", native: "Français" },
  ];
  const [selected, setSelected] = useState("en");

  return (
    <div className="lc-card-white">
      <h2 className="lc-heading-section mb-1">Language</h2>
      <p className="lc-text-body mb-6">Select your preferred language.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelected(lang.code)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              selected === lang.code
                ? "border-green-700 bg-green-50"
                : "border-cream-200 bg-white hover:border-green-300"
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === lang.code ? "border-green-700" : "border-cream-300"
            }`}>
              {selected === lang.code && <div className="w-2.5 h-2.5 rounded-full bg-green-700" />}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-green-900">{lang.label}</p>
              <p className="text-xs text-green-500">{lang.native}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
