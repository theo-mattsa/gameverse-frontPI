import { api } from "./axios";
import { GetGameListResponse } from "./types";

export const gameListService = {
  async createGameList(
    title: string,
    isPublic: boolean,
    games: string[]
  ): Promise<void> {
    await api.post("/gamelist", {
      title,
      isPublic,
      games,
    });
  },
  async getGameListByUsername(
    username: string
  ): Promise<GetGameListResponse[]> {
    const response = await api.get<GetGameListResponse[]>(
      `/gamelists/username/${username}`
    );
    return response.data;
  },
};
