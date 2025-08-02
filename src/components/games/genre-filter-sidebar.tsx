'use client'

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { GENRES } from "@/lib/constants/genres"

interface GenreFilterSidebarProps {
  appliedGenres: string[]
  onApply: (genres: string[]) => void
}

// Não realiza filtragem, mas armazena todos os filtros selecionados num array e, ao clicar em "Aplicar" manda esse array para a página
export function GenreFilterSidebar({
  appliedGenres,
  onApply,
}: GenreFilterSidebarProps) {
  const [pendingGenres, setPendingGenres] = useState(appliedGenres)

  useEffect(() => {
    setPendingGenres(appliedGenres)
  }, [appliedGenres])

  const handleGenreChange = (genreId: string, isSelected: boolean) => {
    setPendingGenres((prev) => {
      if (isSelected) {
        return [...prev, genreId]
      }
      return prev.filter((id) => id !== genreId)
    })
  }

  return (
    <aside className="w-full md:w-64 rounded-lg border p-4">
      <h3 className="text-lg font-semibold tracking-tight">Gêneros</h3>
      <div className="mt-4 space-y-2">
        {GENRES.map((genre) => (
          <div key={genre.id} className="flex items-center space-x-2">
            <Checkbox
              id={genre.id}
              checked={pendingGenres.includes(genre.id)}
              onCheckedChange={(checked) => {
                handleGenreChange(genre.id, !!checked)
              }}
            />
            <Label
              htmlFor={genre.id}
              className="cursor-pointer text-sm font-medium leading-none"
            >
              {genre.name}
            </Label>
          </div>
        ))}
      </div>
      <Button onClick={() => onApply(pendingGenres)} className="mt-4 w-full">
        Aplicar Filtros
      </Button>
    </aside>
  )
}