'use client'

import { useEffect, useState } from "react"
import { GamesGrid } from "@/components/games/games-grid"
import { GenreFilterSidebar } from "@/components/games/genre-filter-sidebar"
import { GameSearchBar } from "@/components/games/game-search-bar"
import { gameService } from "@/lib/api/game-service"
import { Game } from "@/lib/api/types"
import { GENRES } from "@/lib/constants/genres"

export default function GamesPage() {
  const [appliedGenres, setAppliedGenres] = useState<string[]>([])
  const [allGames, setAllGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredGames = allGames
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => {
      if (appliedGenres.length === 0) {
        return true
      }
      if (!game.genres) { // Jogo sem gêneros
        return false
      }
      // Traduz os IDs dos filtros para Nomes e verifica se há correspondência
      const appliedGenreNames = appliedGenres.map(
        (id) => GENRES.find((g) => g.id === id)?.name
      )
      return game.genres.some((gameGenre) =>
        appliedGenreNames.includes(gameGenre)
      )
    })

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* <div className="space-y-2">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <p className="text-muted-foreground">
          Descubra e explore nossa coleção de jogos
        </p>
      </div> */}

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
  )
}

