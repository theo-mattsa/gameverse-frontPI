export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  foto: string | null;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  genres: string[];
  platforms: string[];
  releaseDate: string;
  coverImageUrl?: string;
  averageRating?: number; // 0-5
  developer?: string;
}

export interface GameList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  games: Pick<Game, "id" | "title" | "coverImageUrl">[];
  createdAt: string;
  updatedAt?: string;
  isPublic: boolean;
}

export interface UserReview {
  id: string;
  user: Pick<User, "id" | "username" | "foto">;
  game: Pick<Game, "id" | "title" | "coverImageUrl">;
  title: string;
  text: string;
  createdAt: string;
  rating: number;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  user: Pick<User, "id" | "username" | "foto">;
  type: "new_review" | "new_list" | "game_status_update" | "new_rating";
  targetGame?: Pick<Game, "id" | "title">;
  targetList?: Pick<GameList, "id" | "name">;
  targetReview?: Pick<UserReview, "id" | "rating">;
  contentSnippet?: string;
  createdAt: string;
}

export type GameStatus =
  | "playing"
  | "completed"
  | "paused"
  | "dropped"
  | "backlog";

export interface UserGameEntry {
  id: string;
  userId: string;
  game: Game;
  status: GameStatus;
  rating?: number;
  review?: UserReview;
  addedDate: string;
}
