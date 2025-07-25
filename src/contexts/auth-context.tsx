"use client";
import { authService } from "@/lib/api/auth";
import { User } from "@/lib/api/types";
import { tokenManager } from "@/lib/auth/token-manager";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  user: User | null;
  updateUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const savedToken = tokenManager.getToken();
      const savedUser = tokenManager.getUserData();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        tokenManager.removeToken();
        tokenManager.removeUserData();
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  async function login(newToken: string) {
    try {
      tokenManager.setToken(newToken);
      setToken(newToken);
      const userData = await authService.getUserData();
      tokenManager.setUserData(userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      tokenManager.removeToken();
      tokenManager.removeUserData();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }

  function logout() {
    tokenManager.removeToken();
    tokenManager.removeUserData();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  function updateUser(newUser: User) {
    setUser(newUser);
    tokenManager.setUserData(newUser);
  }

  const values = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      login,
      logout,
      token,
      user,
      updateUser,
    }),
    [isAuthenticated, isLoading, token, user]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
