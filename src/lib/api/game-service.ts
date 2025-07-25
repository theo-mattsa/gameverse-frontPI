import { api } from "./axios";
import { GetGameByUsernameResponse } from "./types";

export const gameService = {
  async getGameBySubstring(
    substring: string
  ): Promise<GetGameByUsernameResponse[]> {
    const res = await api.get<GetGameByUsernameResponse[]>(
      `/games/${substring}`
    );
    return res.data;
  },
  async createGame(
    name: string,
    foto: string,
    releaseDate: string
  ): Promise<void> {
    await api.post("/game", {
      name,
      foto,
      releaseDate,
    });
  },
};
