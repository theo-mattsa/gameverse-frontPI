export const AUTH_CONSTANTS = {
  TOKEN_KEY: "gameverse_auth_token",
  USER_KEY: "gameverse_user",
  ROUTES: {
    PROTECTED: ["/feed", "/games", "/users", "/profile", "/admin"],
    PUBLIC: ["/login", "/signup"],
    USER_ONLY: ["/feed", "/games", "/users", "/profile"],
    ADMIN_ONLY: ["/admin"],
  },
} as const;
