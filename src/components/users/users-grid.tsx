"use client";

import { User } from "@/lib/api/types";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCard } from "./user-card";

interface UsersGridProps {
  users: User[]
  isLoading: boolean
}

export function UsersGrid({ users, isLoading }: UsersGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3 w-64">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}