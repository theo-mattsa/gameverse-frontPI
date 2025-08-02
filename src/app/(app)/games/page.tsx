"use client";

import { GamesGrid } from "@/components/games/games-grid";
import { gameService } from "@/lib/api/game-service";
import { Game } from "@/lib/api/types";
import { useState, useEffect } from "react";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        const games = await gameService.getAllGames();
        setGames(games);
      } catch (err) {
        console.error("Failed to load games:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadGames();
  }, []);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <p className="text-muted-foreground">
          Descubra e explore nossa coleção de jogos
        </p>
      </div>
      <GamesGrid games={games} isLoading={isLoading} />
    </div>
  );
}
