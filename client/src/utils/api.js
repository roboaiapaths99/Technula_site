const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(method, endpoint, data) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  };
  if (data && method !== 'GET') {
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  const json = await res.json().catch(() => ({ status: 'error', message: `HTTP ${res.status}` }));
  if (!res.ok) {
    const err = new Error(json.message || `API error: ${res.status}`);
    err.data = json;
    throw err;
  }
  return json;
}

export const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  put: (endpoint, data) => request('PUT', endpoint, data)
};
