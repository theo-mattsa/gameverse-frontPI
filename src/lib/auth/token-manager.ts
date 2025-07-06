import Cookies from "js-cookie";
import { AUTH_CONSTANTS } from "../constants/auth";
import { User } from "../api/types";

export const tokenManager = {
  setToken(token: string) {
    Cookies.set(AUTH_CONSTANTS.TOKEN_KEY, token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  },

  getToken(): string | null {
    return Cookies.get(AUTH_CONSTANTS.TOKEN_KEY) || null;
  },

  removeToken(): void {
    Cookies.remove(AUTH_CONSTANTS.TOKEN_KEY, { path: "/" });
  },

  hasToken(): boolean {
    return !!this.getToken();
  },
  setUserData(userData: User): void {
    Cookies.set(AUTH_CONSTANTS.USER_KEY, JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  },
  getUserData(): User | null {
    const data = Cookies.get(AUTH_CONSTANTS.USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  removeUserData(): void {
    Cookies.remove(AUTH_CONSTANTS.USER_KEY, { path: "/" });
  },
};
