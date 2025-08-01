'use client';

import { GamesGrid } from "@/components/games/games-grid";
import { fakeGames } from "@/lib/fake-data";
import { Game } from "@/lib/api/types";
import { useState, useEffect } from "react";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setGames(fakeGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar jogos');
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const handleRetry = () => {
    setError(null);
    setGames([]);
    setIsLoading(true);
    
    const loadGames = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setGames(fakeGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar jogos');
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <p className="text-muted-foreground">
          Descubra e explore nossa coleção de jogos
        </p>
      </div>

      {/* Games Grid */}
      <GamesGrid 
        games={games}
        isLoading={isLoading}
        error={error}
        className="mt-6"
      />
      
      {/* Error handling with retry */}
      {error && !isLoading && (
        <div className="text-center mt-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}