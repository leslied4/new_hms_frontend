import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const originalFetch = window.fetch.bind(window);

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const requestUrl =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;

  if (!requestUrl.includes('/api/')) {
    return originalFetch(input, init);
  }

  const token = localStorage.getItem('hms_access_token');
  if (!token) {
    return originalFetch(input, init);
  }

  if (input instanceof Request && !init) {
    const headers = new Headers(input.headers);
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return originalFetch(new Request(input, { headers }));
  }

  const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined));
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return originalFetch(input, { ...init, headers });
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
