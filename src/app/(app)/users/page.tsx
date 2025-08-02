'use client'

import { useEffect, useState } from "react"
import { User } from "@/lib/api/types"
import { userService } from "@/lib/api/user-service"
import { UserCard } from "@/components/users/user-card"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const fetchedUsers = await userService.getAllUsers()
        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Usuários</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-full h-64 bg-card rounded-lg animate-pulse" />) // Placeholder Skeleton
          : users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  )
}
