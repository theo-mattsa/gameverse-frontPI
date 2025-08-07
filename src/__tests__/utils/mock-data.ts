/**
 * @fileoverview Fábrica de dados falsos (mock data) para os testes.
 * Exporta funções que geram dados consistentes e previsíveis para os testes (ex: usuários, jogos).
 * Isso evita a repetição de objetos mock em cada teste e garante que os dados de teste sejam padronizados.
 */

import { 
  Game, 
  User, 
  Activity, 
  GameList, 
  Rating, 
  RatingByUserId, 
  GameStatus,
  SignInResponse,
  ApiError,
  Follower
} from '@/lib/api/types'

// Mock data generators for consistent test data

export const mockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  username: 'testuser',
  foto: 'https://example.com/avatar.jpg',
  bio: 'Test user bio',
  ...overrides,
})

export const mockUsers = (count: number = 3): User[] => 
  Array.from({ length: count }, (_, index) => mockUser({
    id: `${index + 1}`,
    username: `testuser${index + 1}`,
    foto: `https://example.com/avatar${index + 1}.jpg`,
  }))

export const mockGame = (overrides: Partial<Game> = {}): Game => ({
  id: '1',
  name: 'Test Game',
  releaseDate: '2024-01-01',
  foto: 'https://example.com/game.jpg',
  slug: 'test-game',
  genres: ['Action', 'Adventure'],
  platforms: ['PC', 'PlayStation 5'],
  averageRating: 4.5,
  totalRatings: 100,
  ...overrides,
})

export const mockGames = (count: number = 5): Game[] =>
  Array.from({ length: count }, (_, index) => mockGame({
    id: `${index + 1}`,
    name: `Test Game ${index + 1}`,
    slug: `test-game-${index + 1}`,
    foto: `https://example.com/game${index + 1}.jpg`,
    averageRating: 3 + Math.random() * 2, // Random rating between 3-5
    totalRatings: Math.floor(Math.random() * 200) + 50, // Random ratings count
  }))

export const mockActivity = (overrides: Partial<Activity> = {}): Activity => ({
  id: '1',
  type: 'new_review',
  createdAt: '2024-01-01T00:00:00Z',
  user: {
    id: '1',
    username: 'testuser',
    foto: 'https://example.com/avatar.jpg',
  },
  targetGame: {
    id: '1',
    title: 'Test Game',
    slug: 'test-game',
  },
  contentSnippet: 'Great game!',
  ...overrides,
})

export const mockActivities = (count: number = 5): Activity[] => {
  const types: Activity['type'][] = ['new_review', 'new_list', 'game_status_update', 'new_rating']
  
  return Array.from({ length: count }, (_, index) => mockActivity({
    id: `${index + 1}`,
    type: types[index % types.length],
    user: {
      id: `${index + 1}`,
      username: `testuser${index + 1}`,
      foto: `https://example.com/avatar${index + 1}.jpg`,
    },
    targetGame: {
      id: `${index + 1}`,
      title: `Test Game ${index + 1}`,
      slug: `test-game-${index + 1}`,
    },
  }))
}

export const mockGameList = (overrides: Partial<GameList> = {}): GameList => ({
  id: '1',
  title: 'My Favorite Games',
  isPublic: true,
  createdAt: '2024-01-01T00:00:00Z',
  userId: '1',
  games: mockGames(3),
  ...overrides,
})

export const mockGameLists = (count: number = 3): GameList[] =>
  Array.from({ length: count }, (_, index) => mockGameList({
    id: `${index + 1}`,
    title: `Game List ${index + 1}`,
    games: mockGames(Math.floor(Math.random() * 5) + 1),
  }))

export const mockRating = (overrides: Partial<Rating> = {}): Rating => ({
  id: '1',
  content: 'This is a great game with amazing graphics and gameplay!',
  createdAt: '2024-01-01T00:00:00Z',
  rate: 5,
  title: 'Amazing Game!',
  authorId: '1',
  gameId: '1',
  user: {
    id: '1',
    username: 'testuser',
    foto: 'https://example.com/avatar.jpg',
  },
  ...overrides,
})

export const mockRatings = (count: number = 5): Rating[] =>
  Array.from({ length: count }, (_, index) => mockRating({
    id: `${index + 1}`,
    rate: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
    title: `Review ${index + 1}`,
    content: `This is review content ${index + 1}`,
    authorId: `${index + 1}`,
    gameId: `${index + 1}`,
    user: {
      id: `${index + 1}`,
      username: `reviewer${index + 1}`,
      foto: `https://example.com/avatar${index + 1}.jpg`,
    },
  }))

export const mockRatingByUserId = (overrides: Partial<RatingByUserId> = {}): RatingByUserId => ({
  id: '1',
  content: 'This is a great game!',
  createdAt: '2024-01-01T00:00:00Z',
  rate: 5,
  title: 'Amazing Game!',
  authorId: '1',
  gameId: '1',
  game: {
    id: '1',
    name: 'Test Game',
    releaseDate: '2024-01-01',
    foto: 'https://example.com/game.jpg',
    slug: 'test-game',
  },
  ...overrides,
})

export const mockFollower = (overrides: Partial<Follower> = {}): Follower => ({
  id: '1',
  username: 'follower1',
  foto: 'https://example.com/follower.jpg',
  ...overrides,
})

export const mockFollowers = (count: number = 5): Follower[] =>
  Array.from({ length: count }, (_, index) => mockFollower({
    id: `${index + 1}`,
    username: `follower${index + 1}`,
    foto: `https://example.com/follower${index + 1}.jpg`,
  }))

export const mockSignInResponse = (overrides: Partial<SignInResponse> = {}): SignInResponse => ({
  token: 'mock-jwt-token-12345',
  ...overrides,
})

export const mockApiError = (overrides: Partial<ApiError> = {}): ApiError => ({
  message: 'An error occurred',
  status: 400,
  errors: {
    field: ['This field is required'],
  },
  ...overrides,
})

// API Response mocks for different scenarios
export const mockApiResponses = {
  // Success responses
  success: {
    games: mockGames(),
    game: mockGame(),
    users: mockUsers(),
    user: mockUser(),
    activities: mockActivities(),
    gameLists: mockGameLists(),
    ratings: mockRatings(),
    followers: mockFollowers(),
    signIn: mockSignInResponse(),
  },
  
  // Loading states
  loading: null,
  
  // Error responses
  error: {
    notFound: mockApiError({ message: 'Resource not found', status: 404 }),
    unauthorized: mockApiError({ message: 'Unauthorized', status: 401 }),
    validation: mockApiError({ 
      message: 'Validation failed', 
      status: 422,
      errors: {
        email: ['Email is required'],
        password: ['Password must be at least 8 characters'],
      }
    }),
    serverError: mockApiError({ message: 'Internal server error', status: 500 }),
  },
  
  // Empty states
  empty: {
    games: [],
    users: [],
    activities: [],
    gameLists: [],
    ratings: [],
    followers: [],
  },
}

// Helper functions for creating specific test scenarios
export const createMockGameWithStatus = (status: GameStatus): Game & { status: GameStatus } => ({
  ...mockGame(),
  status,
})

export const createMockUserProfile = (isOwnProfile: boolean = false): User & { isOwnProfile: boolean } => ({
  ...mockUser(),
  isOwnProfile,
})

export const createMockPaginatedResponse = <T>(data: T[], page: number = 1, limit: number = 10) => ({
  data: data.slice((page - 1) * limit, page * limit),
  pagination: {
    page,
    limit,
    total: data.length,
    totalPages: Math.ceil(data.length / limit),
  },
})

// Form data mocks
export const mockFormData = {
  login: {
    email: 'test@example.com',
    password: 'password123',
  },
  signup: {
    username: 'newuser',
    email: 'newuser@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  },
  rating: {
    title: 'Great game!',
    content: 'This game is amazing with great graphics and gameplay.',
    rate: 5,
  },
  gameList: {
    title: 'My Favorite RPGs',
    isPublic: true,
  },
  profile: {
    username: 'updateduser',
    bio: 'Updated bio text',
  },
}