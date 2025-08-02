import { api } from "./axios";
import { GameStatus } from "./types";

export const gameStatusService = {
  async updateGameStatus(gameId: string, status: GameStatus): Promise<void> {
    await api.post(`/game-status/${gameId}`, {
      status,
    });
  },
  async getGameStatus(gameId: string): Promise<GameStatus> {
    const res = await api.get<{ status: GameStatus }>(`/game-status/${gameId}`);
    return res.data.status;
  },
};