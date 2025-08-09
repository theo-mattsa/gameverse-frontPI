# GameVerse Frontend - Copilot Instructions

## Project Overview

GameVerse is a Next.js 15 gaming social platform built with TypeScript, React 19, Tailwind CSS, and shadcn/ui. It connects to a backend API for game management, user profiles, ratings, and social features.

## Architecture & Patterns

### Directory Structure

- `src/app/` - Next.js App Router with route groups:
  - `(auth)/` - Public routes (login, signup)
  - `(app)/` - Protected routes with shared layout (feed, games, profile, users)
- `src/lib/api/` - Service layer with typed API clients
- `src/components/` - Feature-based component organization matching route structure
- `src/contexts/` - React contexts for global state (auth)
- `src/hooks/` - Custom hooks with JSDoc documentation

### API Layer Conventions

- All services use centralized `axios` instance with automatic auth headers
- Services follow pattern: `export const serviceService = { methodName: async () => {} }`
- Types are centralized in `src/lib/api/types.ts` with shared interfaces
- Token management via `tokenManager` with automatic 401 handling

### Authentication Flow

- Protected routes use `(app)` route group with shared auth layout
- Middleware redirects based on token presence and route protection level
- `AuthContext` provides: `isAuthenticated`, `isLoading`, `user`, `login()`, `logout()`
- Constants in `src/lib/constants/auth.ts` define protected/public routes

### Component Patterns

- shadcn/ui components in `src/components/ui/` (never modify directly)
- Feature components organized by domain (feed, game, profile, etc.)
- Use `cn()` utility from `src/lib/utils.ts` for className merging
- All components use TypeScript with proper interface definitions

### State Management

- React Context for global auth state
- Form state via React Hook Form with Zod validation
- Local state with `useState` and custom hooks (e.g., `useDebounce`)

## Development Workflow

### Essential Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build (CI=false set for warnings)
pnpm lint         # ESLint with auto-fix
pnpm type-docs    # Generate TypeDoc documentation
```

### Environment Setup

- Requires `.env.local` with `NEXT_PUBLIC_API_URL=localhost:8080`
- Backend must run on port 8080 for local development
- Uses pnpm for package management (not npm)

### Code Quality

- TypeDoc comments required for hooks and complex functions
- ESLint with Next.js config and auto-fix on lint command
- No test suite currently implemented (placeholder in package.json)

## Key Integration Points

### Backend Communication

- Base URL via `NEXT_PUBLIC_API_URL` environment variable
- Automatic JWT token injection via axios interceptors
- Error handling with automatic token cleanup on 401 responses
- All API responses are typed with interfaces from `types.ts`

### Route Protection

- Middleware checks token and redirects appropriately
- Protected routes: `/feed`, `/games`, `/users`, `/profile`
- Public routes: `/login`, `/signup`
- Auth layout handles loading states and user data fetching

### Theme & Styling

- Dark theme by default with system theme support
- Tailwind CSS with shadcn/ui component system
- Global fonts: Geist Sans and Geist Mono
- Toast notifications via Sonner

## Common Patterns to Follow

### Service Creation

```typescript
export const newService = {
  async getData(): Promise<DataType[]> {
    const res = await api.get<DataType[]>("/endpoint");
    return res.data;
  },
};
```

### Protected Page Structure

```typescript
// Use (app) route group for automatic auth protection
// Layout handles auth checks and loading states
```

### Custom Hook Documentation

```typescript
/**
 * Hook description explaining purpose and behavior
 * @param param Description of parameter
 * @returns Description of return value
 */
export function useCustomHook(param: Type): ReturnType {
  // Implementation
}
```

When working on this codebase, prioritize type safety, follow the established service patterns, and ensure all new routes respect the authentication flow.
