import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Game } from "@/lib/api/types";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const router = useRouter();

  // Pega os primeiros 2 gêneros para exibir, se existirem
  const genresToShow = game.genres ? game.genres.slice(0, 2) : [];

  return (
    <Card
      className={
        "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden"
      }
      onClick={() => router.push(`/game/${game.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] bg-muted overflow-hidden">
          <Image
            src={game.foto}
            alt={`${game.name}`}
            fill
            className="object-contain"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {game.name}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex flex-wrap gap-1">
              {genresToShow.map((genre) => (
                <Badge key={genre} variant="outline" className="px-1.5 py-0.5">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-foreground">
                {game.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
