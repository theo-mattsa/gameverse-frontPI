import { api } from "./axios";
import { Game } from "./types";

export const gameService = {
  async getGameBySubstring(substring: string): Promise<Game[]> {
    const res = await api.get<Game[]>(`/games/${substring}`);
    return res.data;
  },
  async getGameById(id: string): Promise<Game> {
    const res = await api.get<Game>(`/game/${id}`);
    return res.data;
  },
  async getAllGames(): Promise<Game[]> {
    const res = await api.get<Game[]>("/games");
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
