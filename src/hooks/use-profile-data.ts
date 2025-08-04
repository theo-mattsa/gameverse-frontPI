import { useState, useEffect } from "react";
import { userService } from "@/lib/api/user-service";
import { gameListService } from "@/lib/api/gamelist-service";
import { GameList, RatingByUserId, User } from "@/lib/api/types";
import { ratingService } from "@/lib/api/rating-service";
import { userStatisticsService } from "@/lib/api/user-statistics-service";

export function useProfileData(username: string) {
  const [profileUser, setProfileUser] = useState<Pick<
    User,
    "bio" | "username" | "foto" | "id"
  > | null>(null);
  const [lists, setLists] = useState<GameList[]>([]);
  const [reviews, setReviews] = useState<RatingByUserId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteGenre, setFavoriteGenre] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [userData, listsData, favoriteGenreResp] = await Promise.all([
          userService.getUserByUsername(username),
          gameListService.getGameListByUsername(username),
          userStatisticsService.getFavoriteGenreByUserUsername(username),
        ]);
        const fetchedReviews = await ratingService.getRatingsByUserId(
          userData.id
        );
        setProfileUser(userData);
        setLists(listsData);
        setReviews(fetchedReviews);
        setFavoriteGenre(favoriteGenreResp.favoriteGenre);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [username]);

  return { profileUser, lists, reviews, isLoading, error, setProfileUser, favoriteGenre };
}
