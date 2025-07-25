import { useState, useEffect } from "react";
import { User, UserReview, GetGameListResponse } from "@/lib/api/types";
import { fakeReviews } from "@/lib/fake-data";
import { userService } from "@/lib/api/user-service";
import { gameListService } from "@/lib/api/gamelist-service";

export function useProfileData(username: string) {
  const [profileUser, setProfileUser] = useState<Pick<
    User,
    "bio" | "username" | "foto"
  > | null>(null);
  const [lists, setLists] = useState<GetGameListResponse[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
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
        setProfileUser(userData);
        setLists(listsData);
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
