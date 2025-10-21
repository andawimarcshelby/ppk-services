// Simple API wrapper with automatic 401 handling.
// If the API says "Unauthenticated", we clear localStorage and bounce to login.

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

function clearAuth() {
  try {
    localStorage.removeItem('ppk_token');
    localStorage.removeItem('ppk_company');
    localStorage.removeItem('ppk_open_sys');
    localStorage.removeItem('ppk_open_mod');
  } catch {}
}

export function logout() {
  clearAuth();
  window.location.href = '/';
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('ppk_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    // Token invalid/expired or DB reseeded – auto-recover gracefully
    clearAuth();
    window.location.href = '/?reason=expired';
    return; // stop further processing
  }

  if (!res.ok) {
    const message = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${message || res.statusText}`);
  }

  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export async function login({ username, password, company_code }) {
  const payload = { username, password, company_code };
  const data = await apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (data?.token) {
    localStorage.setItem('ppk_token', data.token);
    if (data.company) {
      localStorage.setItem('ppk_company', JSON.stringify(data.company));
    }
    return data;
  }
  throw new Error('Login failed.');
}

export function getCompanies() {
  return apiFetch('/api/companies');
}

export function getModules() {
  return apiFetch('/api/modules');
}

export function me() {
  return apiFetch('/api/user');
}
