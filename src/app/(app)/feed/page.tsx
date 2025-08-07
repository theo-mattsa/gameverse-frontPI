"use client";

import { ActivityItem } from "@/components/feed/activity-item";
import { FeedService } from "@/lib/api/feed-service";
import { Activity } from "@/lib/api/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function FeedPage() {
  const [activities, setActivities] = useState<Activity[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const result = await FeedService.getActivities();
        setActivities(result);
      } catch (error) {
        console.error("Error fetching activities:", error);
        toast.error("Erro ao carregar atividades do feed.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivities();
  }, []);

  if (isLoading) {
    Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="flex gap-3 p-4 border border-border rounded-lg bg-card"
      >
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    ));
  } else {
    return (
      <div className="space-y-4">
        <div className="p-8 space-y-2 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">Feed</h1>
          <p className="text-muted-foreground">
            Atividades recentes dos usuários que você segue
          </p>
          {activities?.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma atividade recente.</p>
          ) : (
            <div className="space-y-4">
              {activities?.length === 0 && (
                <p className="text-muted-foreground">
                  Nenhuma atividade recente.
                </p>
              )}
              {activities?.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
