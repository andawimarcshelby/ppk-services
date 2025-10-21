// Simple API helper using the Vite dev proxy (/api -> backend:8000)
const API_BASE = "/api";

/** GET /api/companies */
export async function getCompanies() {
  const res = await fetch(`${API_BASE}/companies`, { credentials: "include" });
  if (!res.ok) throw new Error(`companies failed: ${res.status}`);
  return res.json();
}

/** POST /api/login -> { token, user, company } */
export async function login({ username, password, company_code }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, company_code }),
  });
  if (!res.ok) {
    let msg = "login_failed";
    try {
      const j = await res.json();
      msg = j?.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

/** Authenticated GET /api/modules (requires Bearer) */
export async function getModules(token) {
  const res = await fetch(`${API_BASE}/modules`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (res.status === 401) throw new Error("401 Unauthorized");
  if (!res.ok) throw new Error(`modules failed: ${res.status}`);
  return res.json();
}

/** POST /api/logout (best-effort) */
export async function logout(token) {
  try {
    const res = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false; // don't block UI on network errors
  }
}
