"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Game, GameStatus, Rating } from "@/lib/api/types";
import ReviewForm from "./review-form";
import { ReviewFormData } from "@/lib/schemas/create-rating-schema";
import { ratingService } from "@/lib/api/rating-service";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { gameStatusService } from "@/lib/api/game-status-service";
import { useEffect, useState } from "react";

interface GameDetails {
  game: Game;
  reviews: Rating[];
}

export function GameDetails({ game, reviews }: GameDetails) {
  const { user } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<GameStatus | null>(null);

  async function handleStatusChange(status: GameStatus) {
    try {
      await gameStatusService.updateGameStatus(game.id, status);
      toast.success("Status atualizado com sucesso!");
      setStatus(status);
    } catch (err) {
      toast.error("Erro ao atualizar status.");
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchStatus() {
      const status = await gameStatusService.getGameStatus(game.id);
      setStatus(status);
    }
    fetchStatus();
  }, [game.id]);

  async function onSubmitReview(data: ReviewFormData) {
    try {
      await ratingService.createRating(
        data.content,
        data.rate,
        data.title,
        game.id
      );
      toast.success("Review registrada com sucesso! Recarregando...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Falha ao registrar a review.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Dados do jogo */}
        <div className="md:w-1/3">
          <div className="w-48 h-64 rounded-lg overflow-hidden shadow-lg mx-auto md:mx-0">
            <Image
              src={game.foto}
              alt={game.name}
              width={192}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-2 text-center md:text-left">{game.name}</h1>
          {game.averageRating && (
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-xl">
                {game.averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({reviews.length} avaliações)
              </span>
            </div>
          )}

          <div className="mt-2 mb-6 w-52 max-w-full mx-auto md:mx-0">
            <Select value={status ?? undefined} onValueChange={handleStatusChange}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Definir status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLAYING">Jogando</SelectItem>
                <SelectItem value="COMPLETED">Finalizado</SelectItem>
                <SelectItem value="ON_HOLD">Em pausa</SelectItem>
                <SelectItem value="DROPPED">Abandonado</SelectItem>
                <SelectItem value="WISH_LIST">Lista de desejos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 text-sm text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-sm font-medium">Gêneros:</span>
              <div className="flex flex-wrap gap-1 mt-1 justify-center md:justify-start">
                {game.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Plataformas:</span>
              <div className="flex flex-wrap gap-1 mt-1 justify-center md:justify-start">
                {game.platforms.map((platform) => (
                  <Badge key={platform} variant="outline" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações */}
        <div className="md:w-2/3">
          <ReviewForm onSubmit={onSubmitReview} />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Avaliações ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar
                          className="h-8 w-8 cursor-pointer"
                          onClick={() =>
                            router.push(`/profile/${review.user.username}`)
                          }
                        >
                          <AvatarImage
                            src={review.user.foto || undefined}
                            alt={review.user.username}
                            data-ai-hint="profile picture"
                          />
                          <AvatarFallback className="text-xs">
                            {review.user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {review.user.username === user?.username
                              ? "Você"
                              : review.user.username}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {review.rate}
                            </div>
                            <span>
                              {formatDistanceToNow(new Date(review.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-medium mb-1 text-sm">{review.title}</h4>
                      )}
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                </p>
              )}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}
