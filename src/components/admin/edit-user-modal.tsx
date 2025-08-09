"use client";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio || "",
    role: user.role,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userService.updateUser(user.id, {
        username: formData.username,
        bio: formData.bio || null,
        role: formData.role,
      });

      const updatedUser: User = {
        ...user,
        username: formData.username,
        bio: formData.bio || null,
        role: formData.role,
      };

      onUserUpdated(updatedUser);
      toast.success("Usuário atualizado com sucesso");
    } catch {
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Bio do usuário (opcional)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "USER" | "ADMIN") =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Usuário</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
