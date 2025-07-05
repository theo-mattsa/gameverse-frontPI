import { SignUpRequest, SignInResponse } from "./types";
import { api } from "./axios";
export const authService = {
  async signUp(data: SignUpRequest): Promise<void> {
    return await api.post("/user", data);
  },
  async signIn(email: string, password: string): Promise<SignInResponse> {
    return await api.post("/login", { email, password });
  },
};
