import Cookies from "js-cookie";
import { AUTH_CONSTANTS } from "../constants/auth";

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
};
