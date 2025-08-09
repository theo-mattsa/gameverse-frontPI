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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [gameData, reviewsData] = await Promise.all([
          gameService.getGameById(id as string),
          ratingService.getRatingsByGameId(id as string),
        ]);
        setGame(gameData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching game data:", error);
        setError("Erro ao carregar os dados do jogo. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <LoadingGamePage />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Ops! Algo deu errado
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Jogo não encontrado</h1>
          <p className="text-muted-foreground">
            O jogo que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Jogo</h1>
      <GameDetails game={game} reviews={reviews} />
    </div>
  );
}
