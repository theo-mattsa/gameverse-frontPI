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

export interface UserData {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    foto: string | null;
  };
}
