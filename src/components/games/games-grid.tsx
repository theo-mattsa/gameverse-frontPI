import { GameCard } from "./game-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Game } from "@/lib/api/types";

interface GamesGridProps {
  games: Game[];
  isLoading?: boolean;
}

function GameCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="text-muted-foreground">
        <svg
          className="mx-auto h-12 w-12 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhum jogo encontrado
        </h3>
        <p className="text-sm max-w-md">Não há jogos disponíveis no momento.</p>
      </div>
    </div>
  );
}

export function GamesGrid({ games, isLoading = false }: GamesGridProps) {
  if (isLoading) {
    return (
      <div className={"w-full"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <GameCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }
  if (!games || games.length === 0) {
    return (
      <div className={"w-full"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
