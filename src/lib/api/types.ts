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
