const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

let csrfToken = null;

const FALLBACK_ENABLED = true;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("firebase_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (csrfToken) {
    headers["X-CSRFToken"] = csrfToken;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export function loginWithFirebase(idToken) {
  return request("/api/v1/auth/session/", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  });
}

export function getMe() {
  return request("/api/v1/auth/me/");
}

export function updateMe(payload) {
  return request("/api/v1/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function logoutSession() {
  const result = await request("/api/v1/auth/session/", { method: "DELETE" });
  csrfToken = null;
  return result;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export function getDashboardSummary() {
  return request("/dashboard/summary/");
}

export function getDashboardActivity() {
  return request("/dashboard/activity/");
}

export function getPaymentReminders() {
  return request("/dashboard/payment-reminders/");
}

export function getMyCommunities() {
  return request("/dashboard/my-communities/");
}

export function getDashboardLifeCircleMap() {
  return request("/dashboard/life-circle-map/");
}

// ─── People & Connections ────────────────────────────────────────────────────

export function getPeople(search) {
  const qs = search ? `?search=${encodeURIComponent(search)}` : "";
  return request(`/people/${qs}`);
}

export function getPeopleRecommendations() {
  return request("/people/recommendations/");
}

export function getConnectionRequests() {
  return request("/connections/requests/");
}

export function sendConnectionRequest(data) {
  return request("/connections/requests/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function acceptConnectionRequest(requestId) {
  return request(`/connections/requests/${requestId}/accept/`, {
    method: "POST",
  });
}

export function rejectConnectionRequest(requestId) {
  return request(`/connections/requests/${requestId}/reject/`, {
    method: "POST",
  });
}

export function getConnections() {
  return request("/connections/");
}
