import { Star } from "lucide-react";

interface GameRatingProps {
  avarageRating: number;
}

export function GameRating({ avarageRating }: GameRatingProps) {
  const value = avarageRating ?? 0;
  const clamped = Math.max(0, Math.min(value, 5));
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= clamped;
    const partial = !filled && i < clamped;
    const percent = partial ? (clamped % 1) * 100 : 0;
    return { filled, partial, percent };
  });

  return (
    <div
      className="inline-flex items-center gap-1 text-xs [&>svg]:size-3"
      role="img"
    >
      <>
        {stars.map((star, i) => (
          <div key={i} className="relative">
            {star.partial ? (
              <>
                <Star className="text-muted-foreground/30" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${star.percent}%` }}
                >
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </>
            ) : (
              <Star
                className={
                  star.filled
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                }
              />
            )}
          </div>
        ))}
      </>
    </div>
  );
}
