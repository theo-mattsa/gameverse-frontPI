'use client'

import { User } from "@/lib/api/types"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/profile/${user.username}`)
  }

  return (
    <Card
      className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <CardContent className="p-4 flex flex-col items-center space-y-3">
        <Avatar className="w-20 h-20">
          {user.foto && (
            <AvatarImage src={user.foto} alt={user.username} />
          )}
          <AvatarFallback className="text-lg">
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium text-sm truncate w-full">
            {user.username}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}