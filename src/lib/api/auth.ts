import { SignInResponse, User } from "./types";
import { api } from "./axios";
import { SignUpSchema } from "../schemas/signup-schema";
export const authService = {
  async signUp(data: SignUpSchema): Promise<void> {
    await api.post("/user", data);
  },
  async signIn(email: string, password: string): Promise<SignInResponse> {
    const res = await api.post("/login", { email, password });
    return res.data;
  },
  async getUserData(): Promise<User> {
    const res = await api.get("/me");
    return res.data;
  },
};
