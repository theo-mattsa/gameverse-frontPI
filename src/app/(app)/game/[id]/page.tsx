"use client";
import { GameDetails } from "@/components/game/game-details";
import { gameService } from "@/lib/api/game-service";
import { ratingService } from "@/lib/api/rating-service";
import { Game, Rating } from "@/lib/api/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingGamePage from "@/components/game/loading-gamepage";

export default function GamePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<Game>();
  const [reviews, setReviews] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameData, reviewsData] = await Promise.all([
          gameService.getGameById(id as string),
          ratingService.getRatingsByGameId(id as string),
        ]);
        setGame(gameData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingGamePage />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Jogo</h1>
      {game && <GameDetails game={game} reviews={reviews} />}
    </div>
  );
}
