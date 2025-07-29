import * as React from "react"
import { cn } from "@/lib/utils"
import { GameCard } from "./game-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Game } from "@/lib/api/types"

interface GamesGridProps {
  games: Game[]
  isLoading?: boolean
  error?: string | null
  className?: string
}

function GameCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      {/* Title skeleton */}
      <div className="space-y-2 px-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-muted-foreground">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Erro ao carregar jogos
        </h3>
        <p className="text-sm max-w-md">
          {error || "Ocorreu um erro inesperado ao carregar a lista de jogos."}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
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
        <p className="text-sm max-w-md">
          Não há jogos disponíveis no momento.
        </p>
      </div>
    </div>
  )
}

export function GamesGrid({ 
  games, 
  isLoading = false, 
  error = null, 
  className 
}: GamesGridProps) {

  if (error && !isLoading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <ErrorState error={error} />
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <GameCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    )
  }

  if (!games || games.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={{
              id: game.id,
              title: game.title,
              foto: game.foto,
              averageRating: game.averageRating
            }}
          />
        ))}
      </div>
    </div>
  )
}