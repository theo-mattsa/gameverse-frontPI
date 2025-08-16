import { Game, User, Activity } from "@/lib/api/types";

export const mockUser: User = {
  id: "1",
  username: "testuser",
  foto: "https://example.com/avatar.jpg",
  bio: "Test user bio",
  role: "USER"
};

export const mockGame: Game = {
  id: "1",
  name: "Test Game",
  releaseDate: "2024-01-01",
  foto: "https://example.com/game.jpg",
  slug: "test-game",
  genres: ["RPG", "Aventura"],
  platforms: ["PC", "PlayStation 5"],
  averageRating: 4.5,
  totalRatings: 100
};

export const mockActivity: Activity = {
  id: "1",
  type: "new_rating",
  createdAt: "2024-01-01T00:00:00Z",
  user: mockUser,
  targetGame: {
    id: mockGame.id,
    title: mockGame.name,
    slug: mockGame.slug
  },
  contentSnippet: "Great game!"
};
