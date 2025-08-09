"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useProfileData } from "@/hooks/use-profile-data";

import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileContent } from "@/components/profile/profile-content";
import { toast } from "sonner";
import { userService } from "@/lib/api/user-service";

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user, updateUser } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const {
    profileUser,
    lists,
    reviews,
    isLoading,
    error,
    setProfileUser,
    favoriteGenre,
  } = useProfileData(username);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          Perfil não encontrado ou erro ao carregar.
        </p>
      </div>
    );
  }

  const isCurrentUser = user?.username === profileUser.username;

  async function handleSaveProfile(newBio: string, newFoto: string | null) {
    if (!user || isUpdatingProfile) return;

    setIsUpdatingProfile(true);
    try {
      await userService.updateUserProfile(
        newBio,
        newFoto?.split(",")[1] || null
      );
      updateUser({ ...user, bio: newBio, foto: newFoto });
      setProfileUser((prev) =>
        prev ? { ...prev, bio: newBio, foto: newFoto } : null
      );
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente mais tarde.");
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-8">
      <ProfileHeader
        profileUser={profileUser}
        isCurrentUser={isCurrentUser}
        onSave={handleSaveProfile}
      />

      <ProfileStats
        listsCount={lists.length}
        reviewsCount={reviews.length}
        favoriteGenre={favoriteGenre}
      />

      <ProfileContent
        lists={lists}
        reviews={reviews}
        isOwnProfile={isCurrentUser}
      />
    </div>
  );
}
