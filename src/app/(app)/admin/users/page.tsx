"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/lib/api/types";
import { userService } from "@/lib/api/user-service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditUserModal } from "@/components/admin/edit-user-modal";

export default function AdminUsersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/feed");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (deletingUserId) return;

    setDeletingUserId(userId);
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success(`Usuário ${username} removido com sucesso`);
    } catch {
      toast.error("Erro ao remover usuário");
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/admin">
        <Button className="mb-4" variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Admin
        </Button>
      </Link>
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar usuários</h1>
          <p className="text-muted-foreground mt-2">
            Total de usuários: {users.length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((userItem) => (
            <Card key={userItem.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userItem.foto || ""} />
                    <AvatarFallback>
                      {userItem.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{userItem.username}</h3>
                    <p className="text-sm text-muted-foreground">
                      ID: {userItem.id}
                    </p>
                    {userItem.bio && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {userItem.bio}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      userItem.role === "ADMIN" ? "default" : "secondary"
                    }
                  >
                    {userItem.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingUser(userItem)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {userItem.id !== user.id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja remover o usuário &quot;
                            {userItem.username}&quot;? Esta ação não pode ser
                            desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDeleteUser(userItem.id, userItem.username)
                            }
                            disabled={deletingUserId === userItem.id}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            {deletingUserId === userItem.id && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {deletingUserId === userItem.id
                              ? "Removendo..."
                              : "Remover"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
}
