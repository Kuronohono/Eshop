const BASE = 'http://localhost:8085';

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem('admin_token');

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // Token expired or invalid — boot back to login
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('admin_token');
    window.location.href = '/Admin/Login';
  }

  return res;
}