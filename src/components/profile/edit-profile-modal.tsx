"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";

interface EditProfileModalProps {
  currentBio?: string;
  currentFoto?: string | null;
  username: string;
  onSave: (bio: string, foto: string | null) => void;
}

export function EditProfileModal({
  currentBio = "",
  currentFoto,
  username,
  onSave,
}: EditProfileModalProps) {
  const [bio, setBio] = useState(currentBio);
  const [foto, setFoto] = useState<string | null>(currentFoto || null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFoto = () => {
    setFoto(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    onSave(bio, foto);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize sua biografia e foto de perfil.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20 border">
            <AvatarImage src={foto || undefined} alt={username} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-3xl">
              {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              {foto ? "Alterar foto" : "Adicionar foto"}
            </Button>
            {foto && (
              <Button
                variant="destructive"
                type="button"
                onClick={handleRemoveFoto}
              >
                Remover
              </Button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Biografia</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Fale um pouco sobre você..."
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleSave}>
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
