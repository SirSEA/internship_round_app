const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function getValidToken() {
  const { auth } = await import("../lib/firebase");
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(true);
      localStorage.setItem("firebase_token", token);
      return token;
    } catch {
      return localStorage.getItem("firebase_token");
    }
  }
  return localStorage.getItem("firebase_token");
}

async function request(endpoint, options = {}) {
  const token = await getValidToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 204) return null;

  if (res.status === 401) {
    const refreshed = await getValidToken();
    if (refreshed && refreshed !== token) {
      headers["Authorization"] = `Bearer ${refreshed}`;
      const retryRes = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });
      if (retryRes.status === 204) return null;
      const retryData = await retryRes.json();
      if (!retryRes.ok) throw new Error(retryData.detail || retryData.message || `Request failed (${retryRes.status})`);
      return retryData;
    }
  }

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
  return request("/api/v1/dashboard/summary/");
}

export function getDashboardActivity() {
  return request("/api/v1/dashboard/activity/");
}

export function getPaymentReminders() {
  return request("/api/v1/dashboard/payment-reminders/");
}

export function getMyCommunities() {
  return request("/api/v1/dashboard/my-communities/");
}

export function getDashboardLifeCircleMap() {
  return request("/api/v1/dashboard/life-circle-map/");
}

// ─── People & Connections ────────────────────────────────────────────────────

export function getPeople(search) {
  const qs = search ? `?search=${encodeURIComponent(search)}` : "";
  return request(`/api/v1/people/${qs}`);
}

export function getPeopleRecommendations() {
  return request("/api/v1/people/recommendations/");
}

export function getConnectionRequests(params = {}) {
  const qs = params.status || params.direction
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  return request(`/api/v1/connections/requests/${qs}`);
}

export function sendConnectionRequest(data) {
  return request("/api/v1/connections/requests/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function acceptConnectionRequest(requestId) {
  return request(`/api/v1/connections/requests/${requestId}/accept/`, {
    method: "POST",
  });
}

export function rejectConnectionRequest(requestId) {
  return request(`/api/v1/connections/requests/${requestId}/reject/`, {
    method: "POST",
  });
}

export function getConnections() {
  return request("/api/v1/connections/");
}

// ─── Password Reset ──────────────────────────────────────────────────────────

export function requestPasswordReset(email) {
  return request("/api/v1/auth/password-reset/request/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function confirmPasswordReset(email, code, password) {
  return request("/api/v1/auth/password-reset/confirm/", {
    method: "POST",
    body: JSON.stringify({ email, code, password }),
  });
}

// ─── Communities ─────────────────────────────────────────────────────────────

export function getCommunities(params = {}) {
  const qs = params.category ? `?category=${encodeURIComponent(params.category)}` : "";
  return request(`/api/v1/communities/${qs}`);
}

export function createCommunity(data) {
  return request("/api/v1/communities/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function joinCommunity(communityId) {
  return request(`/api/v1/communities/${communityId}/join/`, {
    method: "POST",
  });
}

export function getCommunityDetail(communityId) {
  return request(`/api/v1/communities/${communityId}/`);
}

export function getMyCommunitiesList() {
  return request("/api/v1/communities/my/");
}

export function updateCommunity(communityId, data) {
  return request(`/api/v1/communities/${communityId}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function getCommunityMembers(communityId) {
  return request(`/api/v1/communities/${communityId}/members/`);
}

export function updateCommunityMembership(membershipId, data) {
  return request(`/api/v1/community-memberships/${membershipId}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
