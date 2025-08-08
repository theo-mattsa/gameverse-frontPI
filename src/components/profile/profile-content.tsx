"use client";
import { useState } from "react";
import { CreateListModal } from "./create-list-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { CreateListGameSchema } from "@/lib/schemas/create-listgame-schema";
import { gameListService } from "@/lib/api/gamelist-service";
import { toast } from "sonner";
import { GameList, RatingByUserId } from "@/lib/api/types";

interface ProfileContentProps {
  lists: GameList[];
  reviews: RatingByUserId[];
  isOwnProfile?: boolean;
}

export function ProfileContent({
  lists,
  reviews,
  isOwnProfile = false,
}: ProfileContentProps) {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<"lists" | "reviews">(
    "lists"
  );
  const [openModal, setOpenModal] = useState(false);

  async function handleCreateList(data: CreateListGameSchema) {
    try {
      await gameListService.createGameList(
        data.name,
        data.isPublic === 1,
        data.games
      );
      setOpenModal(false);
      toast.success("Lista criada com sucesso! Recarregando...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      toast.error("Erro ao criar lista. Tente novamente.");
      setOpenModal(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={selectedView}
          onValueChange={(value) =>
            setSelectedView(value as "lists" | "reviews")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar visualização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lists">Listas criadas</SelectItem>
            <SelectItem value="reviews">Reviews criados</SelectItem>
          </SelectContent>
        </Select>
        {selectedView === "lists" && isOwnProfile && (
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            Criar Lista
          </button>
        )}
      </div>

      {selectedView === "lists" ? (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lists.map((list) => (
              <Card
                key={list.id}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(`/list/${list.id}`)}
              >
                <span className="font-semibold text-lg">{list.title}</span>
                <p className="text-muted-foreground text-sm">
                  {list.games.length} jogos
                </p>
              </Card>
            ))}
          </ul>
          {isOwnProfile && (
            <CreateListModal
              open={openModal}
              onOpenChange={setOpenModal}
              onCreate={handleCreateList}
            />
          )}
        </>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => router.push(`/game/${review.game.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-lg">
                  {review.game.name}
                </span>
                <span className="text-yellow-400 font-bold">
                  {review.rate} ★
                </span>
              </div>

              <p className="text-sm font-medium text-muted-foreground mb-1">
                {review.title}
              </p>

              <p className="text-muted-foreground text-sm italic">
                &quot;{review.content}&quot;
              </p>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
