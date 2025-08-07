"use client";

import { Activity } from "@/lib/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  function getGameStatusBadge(status: string | undefined) {
    switch (status) {
      case "PLAYING":
        return <Badge variant="secondary">Jogando</Badge>;
      case "COMPLETED":
        return <Badge variant="secondary">Finalizado</Badge>;
      case "ON_HOLD":
        return <Badge variant="secondary">Em pausa</Badge>;
      case "DROPPED":
        return <Badge variant="secondary">Abandonado</Badge>;
      case "WISH_LIST":
        return <Badge variant="secondary">Lista de desejos</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "new_review":
        return (
          <>
            escreveu uma avaliação para{" "}
            <span className="font-semibold">{activity.targetGame?.title}</span>
          </>
        );
      case "new_list":
        return (
          <>
            criou uma nova lista:{" "}
            <span className="font-semibold">
              &quot;{activity.targetList?.name}&quot;
            </span>
          </>
        );
      case "game_status_update":
        return (
          <>
            atualizou o status de{" "}
            <span className="font-semibold">{activity.targetGame?.title}</span>{" "}
            para {getGameStatusBadge(activity.contentSnippet)}
          </>
        );
      case "new_rating":
        return (
          <>
            avaliou{" "}
            <span className="font-semibold">{activity.targetGame?.title}</span>{" "}
            com{" "}
            <div className="inline-flex items-center gap-1">
              <span className="font-semibold">{activity.contentSnippet}</span>
              <span>estrelas</span>
            </div>
          </>
        );
      default:
        return activity.contentSnippet;
    }
  };

  return (
    <div className="flex gap-3 p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors">
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarImage src={activity.user.foto || undefined} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {activity.user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="text-sm leading-relaxed">
              <span
                className="font-semibold text-foreground hover:underline hover:cursor-pointer"
                onClick={() =>
                  router.push(`/profile/${activity.user.username}`)
                }
              >
                {activity.user.username}
              </span>{" "}
              {getActivityText(activity)}
            </div>
            {activity.type === "new_review" && activity.contentSnippet && (
              <div className="mt-2 p-3 bg-muted/50 rounded-md border-l-2 border-blue-500">
                <p className="text-sm text-muted-foreground italic">
                  &quot;{activity.contentSnippet}&quot;
                </p>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">
                {formatDate(activity.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
