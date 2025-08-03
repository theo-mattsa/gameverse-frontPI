'use client'

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserSearchBarProps {
  onSearchChange: (term: string) => void
}

export function UserSearchBar({ onSearchChange }: UserSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    onSearchChange(searchTerm)
  }

  return (
    <div className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Buscar usuários por username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch} size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}