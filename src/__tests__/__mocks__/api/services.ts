/**
 * Mock implementations for all API services
 * Provides jest mock functions for testing API interactions
 */

import { 
  Game, 
  User, 
  SignInResponse, 
  Activity, 
  Follower, 
  GameStatus, 
  GameList, 
  Rating, 
  RatingByUserId 
} from '@/lib/api/types';
import { SignUpSchema } from '@/lib/schemas/signup-schema';

// Game Service Mock
export const gameService = {
  getGameBySubstring: jest.fn<Promise<Game[]>, [string]>(),
  getGameById: jest.fn<Promise<Game>, [string]>(),
  getAllGames: jest.fn<Promise<Game[]>, []>(),
  createGame: jest.fn<Promise<void>, [string, string, string]>(),
};

// Auth Service Mock
export const authService = {
  signUp: jest.fn<Promise<void>, [SignUpSchema]>(),
  signIn: jest.fn<Promise<SignInResponse>, [string, string]>(),
  getUserData: jest.fn<Promise<User>, []>(),
};

// User Service Mock
export const userService = {
  getUserByUsername: jest.fn<Promise<User>, [string]>(),
  updateUserProfile: jest.fn<Promise<void>, [string | null, string | null]>(),
  getAllUsers: jest.fn<Promise<User[]>, []>(),
};

// Feed Service Mock
export const FeedService = {
  getActivities: jest.fn<Promise<Activity[]>, []>(),
};

// Follow Service Mock
export const followService = {
  followUser: jest.fn<Promise<void>, [string]>(),
  unfollowUser: jest.fn<Promise<void>, [string]>(),
  getFollowers: jest.fn<Promise<Follower[]>, []>(),
  getFollowing: jest.fn<Promise<Follower[]>, []>(),
  checkIfFollowing: jest.fn<Promise<boolean>, [string]>(),
};

// Game Status Service Mock
export const gameStatusService = {
  updateGameStatus: jest.fn<Promise<void>, [string, GameStatus]>(),
  getGameStatus: jest.fn<Promise<GameStatus>, [string]>(),
};

// Game List Service Mock
export const gameListService = {
  createGameList: jest.fn<Promise<void>, [string, boolean, string[]]>(),
  getGameListByUsername: jest.fn<Promise<GameList[]>, [string]>(),
  getGameListById: jest.fn<Promise<GameList | null>, [string]>(),
};

// Rating Service Mock
export const ratingService = {
  getRatingsByGameId: jest.fn<Promise<Rating[]>, [string]>(),
  getRatingsByUserId: jest.fn<Promise<RatingByUserId[]>, [string]>(),
  createRating: jest.fn<Promise<Rating>, [string, number, string, string]>(),
};

// User Statistics Service Mock
export const userStatisticsService = {
  getFavoriteGenreByUserUsername: jest.fn<Promise<{ favoriteGenre: string | null, message?: string }>, [string]>(),
};

// Reset function to clear all mocks
export const resetApiMocks = () => {
  // Game Service
  gameService.getGameBySubstring.mockClear();
  gameService.getGameById.mockClear();
  gameService.getAllGames.mockClear();
  gameService.createGame.mockClear();

  // Auth Service
  authService.signUp.mockClear();
  authService.signIn.mockClear();
  authService.getUserData.mockClear();

  // User Service
  userService.getUserByUsername.mockClear();
  userService.updateUserProfile.mockClear();
  userService.getAllUsers.mockClear();

  // Feed Service
  FeedService.getActivities.mockClear();

  // Follow Service
  followService.followUser.mockClear();
  followService.unfollowUser.mockClear();
  followService.getFollowers.mockClear();
  followService.getFollowing.mockClear();
  followService.checkIfFollowing.mockClear();

  // Game Status Service
  gameStatusService.updateGameStatus.mockClear();
  gameStatusService.getGameStatus.mockClear();

  // Game List Service
  gameListService.createGameList.mockClear();
  gameListService.getGameListByUsername.mockClear();
  gameListService.getGameListById.mockClear();

  // Rating Service
  ratingService.getRatingsByGameId.mockClear();
  ratingService.getRatingsByUserId.mockClear();
  ratingService.createRating.mockClear();

  // User Statistics Service
  userStatisticsService.getFavoriteGenreByUserUsername.mockClear();
};