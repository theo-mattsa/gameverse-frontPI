"use client";
import { tokenManager } from "@/lib/auth/token-manager";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const savedToken = tokenManager.getToken();
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      } else {
        tokenManager.removeToken();
        setToken(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  function login(newToken: string) {
    tokenManager.setToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  }

  function logout() {
    tokenManager.removeToken();
    setToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
