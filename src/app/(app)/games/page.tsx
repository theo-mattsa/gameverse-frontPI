"use client";

import { useEffect, useState } from "react";
import { GamesGrid } from "@/components/games/games-grid";
import { GenreFilterSidebar } from "@/components/games/genre-filter-sidebar";
import { GameSearchBar } from "@/components/games/game-search-bar";
import { gameService } from "@/lib/api/game-service";
import { Game } from "@/lib/api/types";

export default function GamesPage() {
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const result = await gameService.getAllGames();
        setAllGames(result);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleApplyFilters = (genres: string[]) => {
    setAppliedGenres(genres);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredGames = allGames
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => {
      if (appliedGenres.length === 0) {
        return true;
      }
      if (!game.genres) {
        return false;
      }
      return game.genres.some((genre) => appliedGenres.includes(genre));
    });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-center py-4">
        <GameSearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <GenreFilterSidebar
          appliedGenres={appliedGenres}
          onApply={handleApplyFilters}
        />
        <main className="flex-1">
          <GamesGrid games={filteredGames} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
