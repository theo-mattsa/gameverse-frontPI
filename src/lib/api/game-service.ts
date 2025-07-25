import { api } from "./axios";
import { GetGameBySubstringResponse } from "./types";

export const gameService = {
  async getGameBySubstring(
    substring: string
  ): Promise<GetGameBySubstringResponse[]> {
    const res = await api.get<GetGameBySubstringResponse[]>(
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
