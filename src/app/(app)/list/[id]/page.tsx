"use client";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { gameListService } from "@/lib/api/gamelist-service";
import { Skeleton } from "@/components/ui/skeleton";
import { GameList } from "@/lib/api/types";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

export default function ProfilePage() {
  const { id } = useParams();
  const [list, setList] = useState<GameList | null>(null);
  const listApi = useApi<GameList | null>();

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchGameList() {
      try {
        const response = await listApi.execute(() =>
          gameListService.getGameListById(id as string)
        );
        setList(response);
      } catch (error) {
        console.error("Erro ao carregar lista de jogos:", error);
        toast.error(listApi?.error || "Erro ao carregar lista de jogos");
      }
    }
    fetchGameList();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {listApi.isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : !list ? (
        <p>Lista não encontrada.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">{list.title}</h1>
          {list.games.length === 0 ? (
            <p>Nenhum jogo nesta lista.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {list.games.map((game) => (
                <Card
                  key={game.id}
                  className="w-fit hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <CardContent className="flex flex-col">
                    <Image
                      src={"/vercel.svg"}
                      alt={game.name}
                      width={150}
                      height={150}
                      className="object-contain"
                      style={{ objectFit: "contain", borderRadius: "8px" }}
                    />
                    <div className="py-4 flex-1 flex items-center">
                      <h2 className="text-lg font-semibold">{game.name}</h2>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
