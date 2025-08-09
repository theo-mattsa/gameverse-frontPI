"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Game } from "@/lib/api/types";
import { gameService } from "@/lib/api/game-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function AdminGamesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/feed");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      loadGames();
    }
  }, [user]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await gameService.getAllGames();
      setGames(gamesData);
    } catch {
      toast.error("Erro ao carregar jogos");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/admin">
        <Button variant="outline" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Admin
        </Button>
      </Link>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Jogos</h1>
            <p className="text-muted-foreground mt-2">
              Total de jogos: {games.length}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/games/create">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Jogo
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={game.foto}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{game.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{new Date(game.releaseDate).getFullYear()}</span>
                  <span>•</span>
                  <span>⭐ {game.averageRating.toFixed(1)}</span>
                  <span>({game.totalRatings})</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {game.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                  {game.genres.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{game.genres.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
