"use client";

import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { GameList, User } from "@/lib/api/types";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/layout/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const params = useParams();
  const username = params?.username as string;
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [lists, setLists] = useState<GameList[]>([]);
  const [favoriteGenre, setFavoriteGenre] = useState<string>("");
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [selectedView, setSelectedView] = useState<"lists" | "reviews">(
    "lists"
  );
  const router = useRouter();

  useEffect(() => {
    // TODO: Buscar dados do usuário pelo username da rota (se nao for o proprio usuario)
    if (user && user.username === username + "123") {
      setProfileUser(user);
    } else {
      setProfileUser({
        id: "2",
        username,
        email: "visitante@email.com",
        role: "user",
        foto: null,
      });
    }
    setLists([
      {
        id: "1",
        userId: "2",
        name: "Favoritos",
        games: [],
        createdAt: new Date().toISOString(),
        isPublic: true,
      },
    ]);
    setFavoriteGenre("Ação");
    setReviewsCount(5);
  }, [user, username]);

  if (isLoading)
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-7 w-40 mb-2" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <div className="mb-4 flex justify-end">
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  if (!user) return <div>Usuário não autenticado.</div>;

  // TODO: Adicionar um 404
  if (!profileUser) return <div>Perfil não encontrado.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-20 h-20 border">
          <AvatarImage
            src={profileUser.foto || undefined}
            alt={profileUser.username}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-3xl">
            {profileUser.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profileUser.username}</h2>
        </div>
        {profileUser.id !== user.id && (
          <Button
            className="cursor-pointer"
            variant={isFollowing ? "secondary" : "default"}
            onClick={() => setIsFollowing((f) => !f)}
          >
            {isFollowing ? "Seguindo" : "Seguir"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="flex flex-col items-center p-4">
          <span className="text-gray-500 text-sm mb-1">Gênero favorito</span>
          <span className="font-bold text-lg">{favoriteGenre || "-"}</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <span className="text-gray-500 text-sm mb-1">Reviews criados</span>
          <span className="font-bold text-lg">{reviewsCount}</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <span className="text-gray-500 text-sm mb-1">Listas criadas</span>
          <span className="font-bold text-lg">{lists.length}</span>
        </Card>
      </div>

      <div className="mb-4 flex justify-end">
        <Select
          value={selectedView}
          onValueChange={(v) => setSelectedView(v as "lists" | "reviews")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lists">Listas criadas</SelectItem>
            <SelectItem value="reviews">Reviews criados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedView === "lists" ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lists.map((list) => (
            <Card
              key={list.id}
              className="p-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => router.push(`/lists/${list.id}`)}
            >
              <span className="font-medium text-lg">{list.name}</span>
              <div className="text-gray-400 text-sm">
                {list.games.length} jogos
              </div>
            </Card>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(reviewsCount)].map((_, idx) => {
            const review = {
              id: idx + 1,
              game: { title: `Jogo ${idx + 1}` },
              rating: Math.floor(Math.random() * 5) + 1,
              snippet: "Lorem ipsum dolor sit amet, consectetur...",
            };
            return (
              <Card
                key={review.id}
                className="p-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => router.push(`/reviews/${review.id}`)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-lg">
                    {review.game.title}
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </span>
                </div>
                <div className="text-gray-500 text-sm mb-1">
                  Comentou: <span className="italic">"{review.snippet}"</span>
                </div>
                <div className="text-xs text-gray-400">
                  Clique para ver detalhes
                </div>
              </Card>
            );
          })}
        </ul>
      )}
    </div>
  );
}
