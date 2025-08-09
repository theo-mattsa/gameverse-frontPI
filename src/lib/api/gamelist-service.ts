import { api } from "./axios";
import { GameList } from "./types";

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
  async getGameListByUsername(username: string): Promise<GameList[]> {
    const response = await api.get<GameList[]>(
      `/gamelists/username/${username}`
    );
    return response.data;
  },
  async getGameListById(id: string): Promise<GameList | null> {
    const res = await api.get<GameList>(`/gamelists/${id}`);
    return res.data;
  },
  async deleteGameList(listId: string): Promise<void> {
    await api.delete(`/gamelist/${listId}`);
  },
};
