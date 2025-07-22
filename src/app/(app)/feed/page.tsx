import { ActivityItem } from "@/components/feed/activity-item";
import { placeholderActivities } from "@/lib/fake-data";

export default function FeedPage() {
  return (
    <div className="p-8 space-y-2 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Feed</h1>
      <p className="text-muted-foreground">
        Atividades recentes dos usuários que você segue
      </p>
      <div className="space-y-4">
        {placeholderActivities.length === 0 && (
          <p className="text-muted-foreground">Nenhuma atividade recente.</p>
        )}
        {placeholderActivities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
