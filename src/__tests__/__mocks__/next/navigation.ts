/**
 * Mock for Next.js navigation hooks
 * Provides mock implementations for useRouter, usePathname, useSearchParams, etc.
 */

export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockBack = jest.fn();
export const mockForward = jest.fn();
export const mockRefresh = jest.fn();
export const mockPrefetch = jest.fn();

export const useRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
  prefetch: mockPrefetch,
}));

export const usePathname = jest.fn(() => '/');

export const useSearchParams = jest.fn(() => ({
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  keys: jest.fn(),
  values: jest.fn(),
  entries: jest.fn(),
  forEach: jest.fn(),
  toString: jest.fn(),
}));

export const useParams = jest.fn(() => ({}));

export const redirect = jest.fn();
export const permanentRedirect = jest.fn();
export const notFound = jest.fn();

// Reset function to clear all mocks
export const resetNavigationMocks = () => {
  mockPush.mockClear();
  mockReplace.mockClear();
  mockBack.mockClear();
  mockForward.mockClear();
  mockRefresh.mockClear();
  mockPrefetch.mockClear();
  useRouter.mockClear();
  usePathname.mockClear();
  useSearchParams.mockClear();
  useParams.mockClear();
  redirect.mockClear();
  permanentRedirect.mockClear();
  notFound.mockClear();
};