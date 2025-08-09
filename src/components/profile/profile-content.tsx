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
import { ratingService } from "@/lib/api/rating-service";
import { toast } from "sonner";
import { GameList, RatingByUserId } from "@/lib/api/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

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
  const [deletingListId, setDeletingListId] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

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

  async function handleDeleteList(listId: string) {
    setDeletingListId(listId);
    try {
      await gameListService.deleteGameList(listId);
      toast.success("Lista removida com sucesso! Recarregando...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete list:", error);
      toast.error("Falha ao remover a lista.");
    } finally {
      setDeletingListId(null);
    }
  }

  async function handleDeleteReview(reviewId: string) {
    setDeletingReviewId(reviewId);
    try {
      await ratingService.deleteRating(reviewId);
      toast.success("Review removida com sucesso! Recarregando...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Falha ao remover a review.");
    } finally {
      setDeletingReviewId(null);
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
          <Button
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            Criar Lista
          </Button>
        )}
      </div>

      {selectedView === "lists" ? (
        lists.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma lista criada ainda.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lists.map((list) => (
                <Card
                  key={list.id}
                  className="p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => router.push(`/list/${list.id}`)}
                    >
                      <span className="font-semibold text-lg">
                        {list.title}
                      </span>
                      <p className="text-muted-foreground text-sm">
                        {list.games.length} jogos
                      </p>
                    </div>
                    {isOwnProfile && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive ml-2"
                            disabled={deletingListId === list.id}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Atenção</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja remover a lista &quot;
                              {list.title}&quot;? Esta ação não pode ser
                              desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteList(list.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {deletingListId === list.id
                                ? "Removendo..."
                                : "Remover"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </Card>
              ))}
            </ul>
          </>
        )
      ) : reviews.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma review criada ainda.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="p-4 hover:bg-accent transition-colors"
            >
              <div className="flex justify-between items-start">
                <div
                  className="flex-1 cursor-pointer"
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
                </div>
                {isOwnProfile && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive ml-2"
                        disabled={deletingReviewId === review.id}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover Review</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover a review do jogo &quot;
                          {review.game.name}&quot;? Esta ação não pode ser
                          desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteReview(review.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          {deletingReviewId === review.id
                            ? "Removendo..."
                            : "Remover"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </Card>
          ))}
        </ul>
      )}
      <CreateListModal
        open={openModal && isOwnProfile}
        onOpenChange={setOpenModal}
        onCreate={handleCreateList}
      />
    </div>
  );
}
