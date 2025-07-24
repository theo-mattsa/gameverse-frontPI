"use client";

import { useState } from "react";
import { User } from "@/lib/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";

interface ProfileHeaderProps {
  profileUser: Pick<User, "bio" | "username" | "foto">;
  isCurrentUser: boolean;
  onSave: (newBio: string, newFoto: string | null) => void;
}

export function ProfileHeader({
  profileUser,
  isCurrentUser,
  onSave,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar className="w-20 h-20 border text-3xl">
        <AvatarImage
          src={profileUser.foto || undefined}
          alt={profileUser.username}
        />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {profileUser.username?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold">{profileUser.username}</h2>
        <p className="text-muted-foreground text-sm mt-1 break-words max-w-md">
          {profileUser.bio || "Este usuário ainda não definiu uma biografia."}
        </p>
      </div>
      {isCurrentUser ? (
        <EditProfileModal
          currentBio={profileUser.bio || null}
          currentFoto={profileUser.foto || null}
          username={profileUser.username}
          onSave={onSave}
        />
      ) : (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          onClick={() => setIsFollowing((prev) => !prev)}
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </Button>
      )}
    </div>
  );
}
