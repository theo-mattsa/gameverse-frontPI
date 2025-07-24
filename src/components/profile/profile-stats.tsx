import { Card } from "@/components/ui/card";

interface ProfileStatsProps {
  listsCount: number;
  reviewsCount: number;
  favoriteGenre?: string | null;
}

export function ProfileStats({
  listsCount,
  reviewsCount,
  favoriteGenre,
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="flex flex-col items-center justify-center p-4">
        <span className="text-muted-foreground text-sm mb-1">
          Gênero favorito
        </span>
        <span className="font-bold text-lg">{favoriteGenre || "-"}</span>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4">
        <span className="text-muted-foreground text-sm mb-1">
          Reviews criados
        </span>
        <span className="font-bold text-lg">{reviewsCount}</span>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4">
        <span className="text-muted-foreground text-sm mb-1">
          Listas criadas
        </span>
        <span className="font-bold text-lg">{listsCount}</span>
      </Card>
    </div>
  );
}
