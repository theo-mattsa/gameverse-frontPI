import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/lib/api/types"
import Link from "next/link"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/profile/${user.username}`} className="block group">
      <Card className="w-full h-full bg-card border hover:border-primary/80 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-3 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-muted-foreground/20">
            <AvatarImage src={user.foto || undefined} alt={`@${user.username}`} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {user.username}
          </h2>
          
          {/* Placeholder for stats */}
          <div className="mt-3 grid grid-cols-3 gap-1 text-xs text-muted-foreground">
            <div>
              <p className="font-bold text-foreground text-sm">RPG</p>
              <p className="text-xs">Gênero</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">128</p>
              <p className="text-xs">Jogos</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">42</p>
              <p className="text-xs">Reviews</p>
            </div>
          </div>

          {/* Placeholder for favorite games */}
          <div className="mt-3">
            <div className="flex justify-center gap-1.5">
              <div className="w-10 h-14 bg-muted/50 rounded-sm"></div>
              <div className="w-10 h-14 bg-muted/50 rounded-sm"></div>
              <div className="w-10 h-14 bg-muted/50 rounded-sm"></div>
              <div className="w-10 h-14 bg-muted/50 rounded-sm"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
