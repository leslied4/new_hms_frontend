export const ACCESS_TOKEN_KEY = 'hms_access_token';
export const REFRESH_TOKEN_KEY = 'hms_refresh_token';

export type AuthTokens = {
  access: string;
  refresh: string;
};

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = (tokens: AuthTokens): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
