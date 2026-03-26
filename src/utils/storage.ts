import type { LoginResponse } from "@types";

const USER_LOGIN_KEY = "USER_LOGIN";

export function getStoredUser(): LoginResponse | null {
  try {
    const rawValue = localStorage.getItem(USER_LOGIN_KEY);

    if (!rawValue) return null;

    return JSON.parse(rawValue) as LoginResponse;
  } catch {
    localStorage.removeItem(USER_LOGIN_KEY);
    return null;
  }
}

export function setStoredUser(user: LoginResponse): void {
  localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOGIN_KEY);
}

export function getAccessToken(): string {
  return getStoredUser()?.token ?? "";
}
