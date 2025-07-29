import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

const gameRatingVariants = cva(
  "inline-flex items-center gap-1",
  {
    variants: {
      size: {
        sm: "text-xs [&>svg]:size-3",
        md: "text-sm [&>svg]:size-4", 
        lg: "text-base [&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface GameRatingProps extends VariantProps<typeof gameRatingVariants> {
  rating?: number
  maxRating?: number
  showValue?: boolean
  className?: string
}

export function GameRating({
  rating,
  maxRating = 5,
  size,
  showValue = true,
  className,
  ...props
}: GameRatingProps) {
  // undefined/null ratings
  const normalizedRating = rating ?? 0
  const clampedRating = Math.max(0, Math.min(normalizedRating, maxRating))
  
  // Array estrelas
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= clampedRating
    const isPartial = starValue > clampedRating && starValue - 1 < clampedRating
    
    return {
      key: index,
      filled: isFilled,
      partial: isPartial,
      fillPercentage: isPartial ? ((clampedRating % 1) * 100) : 0
    }
  })

  // Don't render anything if rating is undefined/null and showValue is false
  if (rating === undefined || rating === null) {
    if (!showValue) return null
    return (
      <div className={cn(gameRatingVariants({ size }), className)} {...props}>
        <span className="text-muted-foreground">No rating</span>
      </div>
    )
  }

  return (
    <div className={cn(gameRatingVariants({ size }), className)} {...props}>
      <div className="flex items-center" role="img" aria-label={`Rating: ${clampedRating} out of ${maxRating} stars`}>
        {stars.map(({ key, filled, partial, fillPercentage }) => (
          <div key={key} className="relative">
            {partial ? (
              <div className="relative">
                <Star className="text-muted-foreground/30" />
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            ) : (
              <Star 
                className={cn(
                  filled 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
      {showValue && (
        <span className="font-medium tabular-nums">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}