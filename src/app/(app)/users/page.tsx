'use client'

import { useEffect, useState } from "react"
import { User } from "@/lib/api/types"
import { userService } from "@/lib/api/user-service"
import { UserCard } from "@/components/users/user-card"
import { UserSearchBar } from "@/components/users/user-search-bar"
import { useAuth } from "@/contexts/auth-context"

export default function UsersPage() {
  const { user: currentUser } = useAuth()
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const fetchedUsers = await userService.getAllUsers()
        setAllUsers(fetchedUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.username !== currentUser?.username
  )

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Usuários</h1>
      <div className="flex mb-6">
        <UserSearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-full h-48 bg-card rounded-lg animate-pulse" />) // Placeholder Skeleton
          : filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  )
}