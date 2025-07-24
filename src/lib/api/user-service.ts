import { api } from "./axios";
import { GetUserByUsernameResponse } from "./types";

export const userService = {
  async getUserByUsername(
    username: string
  ): Promise<GetUserByUsernameResponse> {
    const res = await api.get<GetUserByUsernameResponse>(
      `/user/username/${username}`
    );
    return res.data;
  },
};
