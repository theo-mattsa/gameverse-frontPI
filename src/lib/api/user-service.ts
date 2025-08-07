import { api } from "./axios";
import { User } from "./types";

export const userService = {
  async getUserByUsername(username: string): Promise<User> {
    const res = await api.get<User>(`/user/username/${username}`);
    return res.data;
  },
  async updateUserProfile(
    bio: string | null,
    foto: string | null
  ): Promise<void> {
    await api.put("/me", { foto, bio });
  },
  async getAllUsers(): Promise<User[]> {
    const res = await api.get<User[]>("/users");
    return res.data;
  },
};
