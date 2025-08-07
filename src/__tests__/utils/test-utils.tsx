/**
 * @fileoverview Utilitário de renderização personalizado para testes.
 * Exporta uma função `render` que envolve automaticamente os componentes com os providers necessários
 * da aplicação (ex: ThemeProvider, AuthProvider). Isso simplifica os arquivos de teste, evitando
 * a configuração repetitiva de providers em cada um deles.
 */

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider } from '@/components/theme-provider'

// Mock user data for testing
const mockUser = {
  id: '1',
  username: 'testuser',
  foto: 'https://example.com/avatar.jpg',
  bio: 'Test user bio'
}

// Mock auth context values
const mockAuthContextValue = {
  isAuthenticated: true,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  token: 'mock-token' as string | null,
  user: mockUser as typeof mockUser | null,
  updateUser: jest.fn(),
}

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add custom options here if needed
  authContextValue?: Partial<typeof mockAuthContextValue>
  withAuth?: boolean
  withTheme?: boolean
}

function AllTheProviders({ 
  children, 
  authContextValue = mockAuthContextValue,
  withAuth = true,
  withTheme = true 
}: { 
  children: React.ReactNode
  authContextValue?: Partial<typeof mockAuthContextValue>
  withAuth?: boolean
  withTheme?: boolean
}) {
  let component = <>{children}</>

  // Wrap with ThemeProvider if needed
  if (withTheme) {
    component = (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {component}
      </ThemeProvider>
    )
  }

  // Wrap with AuthProvider if needed
  if (withAuth) {
    // Mock the AuthProvider to use our test values
    const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
      const AuthContext = React.createContext(authContextValue)
      return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    }
    
    component = <MockAuthProvider>{component}</MockAuthProvider>
  }

  return component
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { 
    authContextValue = mockAuthContextValue,
    withAuth = true,
    withTheme = true,
    ...renderOptions 
  } = options

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders 
        authContextValue={authContextValue}
        withAuth={withAuth}
        withTheme={withTheme}
      >
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Helper function to render component without authentication
export const renderWithoutAuth = (ui: ReactElement, options?: Omit<CustomRenderOptions, 'withAuth'>) => {
  return customRender(ui, { ...options, withAuth: false })
}

// Helper function to render component with unauthenticated state
export const renderUnauthenticated = (ui: ReactElement, options?: CustomRenderOptions) => {
  const unauthenticatedContext = {
    ...mockAuthContextValue,
    isAuthenticated: false,
    token: null,
    user: null,
  }
  return customRender(ui, { ...options, authContextValue: unauthenticatedContext })
}

// Helper function to render component with loading state
export const renderWithLoading = (ui: ReactElement, options?: CustomRenderOptions) => {
  const loadingContext = {
    ...mockAuthContextValue,
    isLoading: true,
  }
  return customRender(ui, { ...options, authContextValue: loadingContext })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }