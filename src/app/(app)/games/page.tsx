'use client'

import { useEffect, useState } from "react"
import { GamesGrid } from "@/components/games/games-grid"
import { GenreFilterSidebar } from "@/components/games/genre-filter-sidebar"
import { gameService } from "@/lib/api/game-service"
import { Game } from "@/lib/api/types"

export default function GamesPage() {
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]) // Gêneros filtrados
  const [allGames, setAllGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true)
        const fetchedGames = await gameService.getAllGames()
        setAllGames(fetchedGames)
      } catch (error) {
        console.error("Failed to fetch games:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handleApplyFilters = (genres: string[]) => {
    setAppliedGenres(genres)
  }

  // Após Sidebar aplicar os filtros, retorna o array de jogos que possuem aquele gênero
  const filteredGames = appliedGenres.length
    ? allGames.filter(
        (game) =>
          game.genres &&
          game.genres.some((genreId) => appliedGenres.includes(genreId)) // Retorna true se algum dos gêneros do jogo estiver presente na lista de gêneros filtrados (appliedGenres)
      )
    : allGames

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <p className="text-muted-foreground">
          Descubra e explore nossa coleção de jogos
        </p>
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
  )
}

