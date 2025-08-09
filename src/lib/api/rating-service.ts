import { api } from "./axios";
import { Rating, RatingByUserId } from "./types";

export const ratingService = {
  async getRatingsByGameId(gameId: string): Promise<Rating[]> {
    const res = await api.get<Rating[]>(`/ratings/game/${gameId}`);
    return res.data;
  },
  async getRatingsByUserId(userId: string): Promise<RatingByUserId[]> {
    const res = await api.get<RatingByUserId[]>(`/ratings/user/${userId}`);
    return res.data;
  },
  async createRating(
    content: string,
    rate: number,
    title: string,
    gameId: string
  ): Promise<Rating> {
    const res = await api.post<Rating>("/rating", {
      content,
      rate,
      title,
      gameId,
    });
    return res.data;
  },
  async deleteRating(ratingId: string): Promise<void> {
    await api.delete(`/rating/${ratingId}`);
  },
};
