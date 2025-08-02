export interface SignInResponse {
  token: string;
}


export interface Game {
  id: string;
  name: string;
  releaseDate: string;
  foto: string;
  slug: string;
  genres: string[];
  platforms: string[];
  averageRating: number;
  totalRatings: number;
}

export interface User {
  id: string;
  username: string;
  foto: string | null;
  bio?: string | null;
}


export interface Follower {
  id: string;
  username: string;
  foto: string | null;
}

export interface GameList {
  id: string;
  title: string;
  isPublic: boolean;
  createdAt: string;
  userId: string;
  games: Game[];
}

export interface Rating {
  id: string;
  content: string;
  createdAt: string;
  rate: number;
  title: string;
  authorId: string;
  gameId: string;
  user: Pick<User, "id" | "username" | "foto">;
}

export interface RatingByUserId {
  id: string;
  content: string;
  createdAt: string;
  rate: number;
  title: string;
  authorId: string;
  gameId: string;
  game: Pick<Game, "id" | "name" | "releaseDate" | "foto" | "slug">;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}
