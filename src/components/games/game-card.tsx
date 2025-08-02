import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { GameRating } from "./game-rating";
import { Game } from "@/lib/api/types";
import { useRouter } from "next/navigation";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const router = useRouter();
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
            src={"https://placehold.co/600x400"}
            alt={`${game.name}`}
            fill
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {game.name}
          </h3>
          <div className="flex items-center justify-between">
            <GameRating avarageRating={game.averageRating} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
