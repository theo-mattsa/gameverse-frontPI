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
  async getGameListByUserId(userId: string): Promise<GetGameListResponse[]> {
    const response = await api.get<GetGameListResponse[]>(
      `/gamelists/${userId}`
    );
    return response.data;
  },
};
