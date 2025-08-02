import { api } from "./axios";

export const userStatisticsService = {
  async getFavoriteGenreByUserUsername(username: string): Promise<{ favoriteGenre: string | null, message?: string }> {
    const res = await api.get<{ favoriteGenre: string, message?: string }>(`/user-statistics/favorite-genre/${username}`);
    return res.data;
  }
};