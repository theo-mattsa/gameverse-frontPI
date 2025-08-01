import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { GameRating } from "./game-rating"

interface GameCardProps {
  game: {
    id: string
    title: string
    foto?: string
    averageRating?: number
  }
  className?: string
}

export function GameCard({ game, className }: GameCardProps) {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoading, setImageLoading] = React.useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden",
        className
      )}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-muted overflow-hidden">
          {!imageError && game.foto ? (
            <>
              <Image
                src={game.foto}
                alt={`${game.title} cover`}
                fill
                className={cn(
                  "object-cover transition-opacity duration-200",
                  imageLoading ? "opacity-0" : "opacity-100"
                )}
                onError={handleImageError}
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs">No Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <GameRating 
              rating={game.averageRating} 
              size="sm" 
              showValue={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}