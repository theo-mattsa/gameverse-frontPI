'use client'

import { useEffect, useState } from "react"
import { UsersGrid } from "@/components/users/users-grid"
import { userService } from "@/lib/api/user-service"
import { User } from "@/lib/api/types"
import { useApi } from "@/hooks/use-api"
import { UserSearchBar } from "@/components/users/users-search-bar"
import { useAuth } from "@/contexts/auth-context"

export default function UsersPage() {
  const { user } = useAuth()
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const usersApi = useApi<User[]>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await usersApi.execute(() => userService.getAllUsers())
        setAllUsers(result)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
    fetchUsers()
  }, [])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredUsers = allUsers
    .filter((u) => u.id !== user?.id)
    .filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-center py-4 px">
        <UserSearchBar onSearchChange={handleSearchChange} />
      </div>
      <main className="flex-1">
        <UsersGrid users={filteredUsers} isLoading={usersApi.isLoading} />
      </main>
    </div>
  )
}