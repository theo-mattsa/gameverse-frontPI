import { useState, useEffect } from "react";
import { userService } from "@/lib/api/user-service";
import { gameListService } from "@/lib/api/gamelist-service";
import { GameList, Rating, RatingByUserId, User } from "@/lib/api/types";
import { ratingService } from "@/lib/api/rating-service";

export function useProfileData(username: string) {
  const [profileUser, setProfileUser] = useState<Pick<
    User,
    "bio" | "username" | "foto"
  > | null>(null);
  const [lists, setLists] = useState<GameList[]>([]);
  const [reviews, setReviews] = useState<RatingByUserId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [userData, listsData] = await Promise.all([
          userService.getUserByUsername(username),
          gameListService.getGameListByUsername(username),
        ]);
        const fetchedReviews = await ratingService.getRatingsByUserId(
          userData.id
        );
        setProfileUser(userData);
        setLists(listsData);
        setReviews(fetchedReviews);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { profileUser, lists, reviews, isLoading, error, setProfileUser };
}
