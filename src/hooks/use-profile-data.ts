import { useState, useEffect } from "react";
import { User, GameList, UserReview } from "@/lib/api/types";
import { fakeGameLists, fakeReviews, fakeUsers } from "@/lib/fake-data";
import { userService } from "@/lib/api/user-service";
/* 
import {
  getUserByUsername,
  getUserLists,
  getUserReviews,
} from "@/lib/api/client";
 */

export function useProfileData(username: string) {
  const [profileUser, setProfileUser] = useState<Pick<
    User,
    "bio" | "username" | "foto"
  > | null>(null);
  const [lists, setLists] = useState<GameList[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        /*
        // Busca todos os dados em paralelo
        const [userData, listsData, reviewsData] = await Promise.all([
          // getUserByUsername(username),
          // getUserLists(username),
          // getUserReviews(username),
        ]);
         */
        const [userData] = await Promise.all([
          userService.getUserByUsername(username),
        ]);
        setProfileUser(userData);
        setLists(fakeGameLists);
        setReviews(fakeReviews);
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
