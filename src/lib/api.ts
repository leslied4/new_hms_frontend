import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './auth';
import { toast } from './toast';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';

export class ApiError extends Error {
  public readonly status: number;
  public readonly detail: unknown;

  constructor(message: string, status: number, detail: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

type RequestOptions = {
  skipAuth?: boolean;
  retry?: boolean;
  notifyError?: boolean;
  notifySuccess?: boolean;
};

const toApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${normalizedBase}${normalizedPath}`;
};

const readResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

const parseErrorMessage = (body: unknown, fallback: string): string => {
  if (typeof body === 'string' && body.trim()) {
    return body;
  }
  if (body && typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    const detail = obj.detail;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }
    const nonField = obj.non_field_errors;
    if (Array.isArray(nonField) && typeof nonField[0] === 'string') {
      return nonField[0];
    }
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && value.trim()) {
        return `${key}: ${value}`;
      }
      if (Array.isArray(value) && typeof value[0] === 'string') {
        return `${key}: ${value[0]}`;
      }
    }
  }
  return fallback;
};

const request = async <T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {},
): Promise<T> => {
  const method = String(init.method || 'GET').toUpperCase();
  const notifyError = options.notifyError !== false;
  const notifySuccess = options.notifySuccess ?? (method !== 'GET');
  const headers = new Headers(init.headers ?? {});

  if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  if (!options.skipAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  const response = await fetch(toApiUrl(path), {
    ...init,
    headers,
  });

  if (response.ok) {
    if (response.status === 204) {
      if (notifySuccess) {
        toast.success('Action completed successfully.');
      }
      return undefined as T;
    }
    const data = (await readResponseBody(response)) as T;
    if (notifySuccess && data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      const message =
        (typeof obj.message === 'string' && obj.message.trim())
        || (typeof obj.detail === 'string' && obj.detail.trim())
        || '';
      if (message) {
        toast.success(message);
      }
    }
    return data;
  }

  if (response.status === 401 && !options.retry && !options.skipAuth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return request<T>(path, init, { ...options, retry: true });
    }
  }

  const body = await readResponseBody(response);
  const errorMessage = parseErrorMessage(body, `Request failed (${response.status})`);
  if (notifyError) {
    toast.error(errorMessage);
  }
  throw new ApiError(errorMessage, response.status, body);
};

export const refreshAccessToken = async (): Promise<boolean> => {
  const refresh = getRefreshToken();
  if (!refresh) {
    return false;
  }

  try {
    const data = await request<{ access: string }>('/auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    }, { skipAuth: true, retry: true });

    setTokens({ access: data.access, refresh });
    return true;
  } catch (_error) {
    clearTokens();
    return false;
  }
};

export const login = async (username: string, password: string) => {
  const tokens = await request<{ access: string; refresh: string }>(
    '/auth/token/',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    { skipAuth: true, retry: true },
  );

  setTokens(tokens);
  return tokens;
};

export const api = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'POST',
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
    }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'PUT',
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'PATCH',
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
    }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: 'DELETE' }),
};
