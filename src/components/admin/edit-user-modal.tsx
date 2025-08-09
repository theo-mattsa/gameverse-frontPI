"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/api/types";
import { userService } from "@/lib/api/user-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  editAccountSchema,
  EditAccountSchema,
} from "@/lib/schemas/edit-account-schema";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUserUpdated: (user: User) => void;
}

export function EditUserModal({
  user,
  onClose,
  onUserUpdated,
}: EditUserModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: EditAccountSchema) => {
    if (loading) return;
    setLoading(true);
    try {
      const updateData: {
        username?: string;
        email?: string;
        password?: string;
      } = {};

      if (data.username?.trim()) {
        updateData.username = data.username.trim();
      }

      if (data.email?.trim()) {
        updateData.email = data.email.trim();
      }

      if (data.password?.trim()) {
        updateData.password = data.password.trim();
      }

      await userService.updateUser(user.id, updateData);

      const updatedUser: User = {
        ...user,
        username: updateData.username || user.username,
      };

      onUserUpdated(updatedUser);
      toast.success("Usuário atualizado com sucesso");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Edite as informações do usuário {user.username}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário (opcional)</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder={`Atual: ${user.username}`}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Novo email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Nova senha (opcional)</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Nova senha"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
