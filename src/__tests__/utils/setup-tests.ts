/**
 * @fileoverview Arquivo de configuração global para o Jest.
 * Este arquivo é executado automaticamente antes de todos os testes. Ele importa `jest-dom` para adicionar
 * matchers focados no DOM e pode ser usado para configurar mocks globais ou limpar estados entre os testes.
 */

import '@testing-library/jest-dom'

// Global test setup configuration
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks()

  // Reset DOM state
  document.body.innerHTML = ''

  // Clear localStorage and sessionStorage
  localStorage.clear()
  sessionStorage.clear()

  // Reset any global state that might affect tests
  if (global.fetch && typeof global.fetch === 'function' && 'mockClear' in global.fetch) {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockClear()
  }
})

afterEach(() => {
  // Clean up after each test
  jest.restoreAllMocks()

  // Clean up any timers
  jest.clearAllTimers()

  // Clean up any pending promises
  jest.runOnlyPendingTimers()
})

// Mock Next.js router by default
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useParams: jest.fn(() => ({})),
  notFound: jest.fn(),
  redirect: jest.fn(),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, priority, ...rest } = props
    return {
      type: 'img',
      props: { src, alt, width, height, ...rest }
    }
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return {
      type: 'a',
      props: { href, ...props, children }
    }
  },
}))

// Mock fetch globally
global.fetch = jest.fn()

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Suppress console warnings in tests unless explicitly needed
const originalConsoleWarn = console.warn
const originalConsoleError = console.error

beforeAll(() => {
  // Use fake timers for consistent testing
  jest.useFakeTimers()

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is deprecated') ||
        args[0].includes('Warning: React.createFactory') ||
        args[0].includes('componentWillReceiveProps') ||
        args[0].includes('componentWillMount'))
    ) {
      return
    }
    originalConsoleWarn.call(console, ...args)
  }

  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') ||
        args[0].includes('The above error occurred') ||
        args[0].includes('Consider adding an error boundary'))
    ) {
      return
    }
    originalConsoleError.call(console, ...args)
  }
})

afterAll(() => {
  // Restore real timers
  jest.useRealTimers()

  // Restore console methods
  console.warn = originalConsoleWarn
  console.error = originalConsoleError
})

// Global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}