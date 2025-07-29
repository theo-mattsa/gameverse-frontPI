"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  CreateGameSchema,
  createGameSchema,
} from "@/lib/schemas/create-game-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { gameService } from "@/lib/api/game-service";
import { toast } from "sonner";
import { fileToBase64 } from "@/utils";
export default function AdminGamesPage() {
  const [fotoPreview, setFotoPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateGameSchema>({
    resolver: zodResolver(createGameSchema),
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    if (base64) {
      setValue("foto", base64);
      setFotoPreview(base64);
    }
  }

  async function onSubmit(data: CreateGameSchema) {
    try {
      await gameService.createGame(data.name, data.foto, data.releaseDate);
      toast.success("Jogo cadastrado com sucesso!");
      reset();
      setFotoPreview("");
    } catch (error) {
      toast.error("Erro ao cadastrar jogo.");
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Cadastro de Jogos
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do jogo</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Digite o nome do jogo"
            required
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseDate">Data de Lançamento</Label>
          <Input
            id="releaseDate"
            type="date"
            {...register("releaseDate")}
            required
            className="w-full"
          />
          {errors.releaseDate && (
            <p className="text-red-500 text-sm">{errors.releaseDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="foto">Capa do Jogo</Label>
          <Input
            id="foto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {errors.foto && (
            <p className="text-red-500 text-sm">{errors.foto.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="fotoPreview">Pré-visualização da foto do jogo</Label>
          {fotoPreview ? (
            <div className="flex justify-start">
              <img
                id="fotoPreview"
                src={fotoPreview}
                alt="Pré-visualização da Capa"
                className="w-16 h-auto mt-2 rounded shadow-sm border border-gray-200 object-contain"
              />
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              Nenhuma imagem selecionada
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-full sm:w-auto">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
