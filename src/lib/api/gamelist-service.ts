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
  async getGameListById(id: string): Promise<GetGameListResponse | null> {
    const res = await api.get<GetGameListResponse>(`/gamelists/${id}`);
    return res.data;
  },
};
