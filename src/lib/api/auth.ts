import { SignUpRequest, SignInResponse, UserData } from "./types";
import { api } from "./axios";
export const authService = {
  async signUp(data: SignUpRequest): Promise<void> {
    await api.post("/user", data);
  },
  async signIn(email: string, password: string): Promise<SignInResponse> {
    const res = await api.post("/login", { email, password });
    return res.data;
  },
  async getUserData(): Promise<UserData> {
    const res = await api.get("/me");
    return res.data;
  },
};
