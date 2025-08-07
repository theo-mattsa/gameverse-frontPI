/**
 * Mock for AuthContext and useAuth hook
 * Provides mock implementations for authentication state and methods
 */

import React from 'react';
import { User } from '@/lib/api/types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  user: User | null;
  updateUser: (newUser: User) => void;
}

// Mock functions
export const mockLogin = jest.fn<Promise<void>, [string]>();
export const mockLogout = jest.fn<void, []>();
export const mockUpdateUser = jest.fn<void, [User]>();

// Default mock values
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  login: mockLogin,
  logout: mockLogout,
  token: null,
  user: null,
  updateUser: mockUpdateUser,
};

// Mock context value that can be overridden in tests
let mockAuthContextValue: AuthContextType = { ...defaultAuthContext };

// Mock useAuth hook
export const useAuth = jest.fn(() => mockAuthContextValue);

// Mock AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="auth-provider">{children}</div>;
};

// Helper functions for tests
export const setMockAuthContext = (overrides: Partial<AuthContextType>) => {
  mockAuthContextValue = { ...defaultAuthContext, ...overrides };
};

export const resetAuthMocks = () => {
  mockLogin.mockClear();
  mockLogout.mockClear();
  mockUpdateUser.mockClear();
  useAuth.mockClear();
  mockAuthContextValue = { ...defaultAuthContext };
};

// Common mock scenarios
export const mockAuthenticatedUser = (user: User, token: string = 'mock-token') => {
  setMockAuthContext({
    isAuthenticated: true,
    isLoading: false,
    token,
    user,
  });
};

export const mockUnauthenticatedUser = () => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: false,
    token: null,
    user: null,
  });
};

export const mockLoadingAuth = () => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    user: null,
  });
};