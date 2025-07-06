export const AUTH_CONSTANTS = {
  TOKEN_KEY: "gameverse_auth_token",
  USER_KEY: "gameverse_user",
  ROUTES: {
    PROTECTED: ["/feed", "/games", "/users", "/profile"],
    PUBLIC: ["/login", "/signup"],
  },
} as const;
