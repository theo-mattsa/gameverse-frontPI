"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGameSchema,
  CreateGameSchema,
} from "@/lib/schemas/create-game-schema";
import { gameService } from "@/lib/api/game-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS } from "@/lib/constants/platforms";
import { GENRES } from "@/lib/constants/genres";
import { fileToBase64 } from "@/utils";
import Image from "next/image";

export default function CreateGamePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateGameSchema>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: "",
      releaseDate: "",
      foto: "",
      platforms: [],
      genres: [],
    },
  });

  const selectedPlatforms = watch("platforms");
  const selectedGenres = watch("genres");

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/feed");
    }
  }, [user, isLoading, router]);

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = selectedPlatforms || [];
    if (currentPlatforms.includes(platform)) {
      setValue(
        "platforms",
        currentPlatforms.filter((p) => p !== platform)
      );
    } else {
      setValue("platforms", [...currentPlatforms, platform]);
    }
  };

  const handleGenreToggle = (genre: string) => {
    const currentGenres = selectedGenres || [];
    if (currentGenres.includes(genre)) {
      setValue(
        "genres",
        currentGenres.filter((g) => g !== genre)
      );
    } else {
      setValue("genres", [...currentGenres, genre]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      if (base64) {
        setValue("foto", base64);
        setPreviewImage(base64);
      }
    } catch (error) {
      console.error("Erro ao converter arquivo:", error);
      toast.error("Erro ao processar a imagem");
    }
  };

  const handleRemoveImage = () => {
    setValue("foto", "");
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: CreateGameSchema) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await gameService.createGame(
        data.name,
        data.foto,
        data.releaseDate,
        data.platforms,
        data.genres
      );
      toast.success("Jogo criado com sucesso!");
      router.push("/admin/games");
    } catch (error) {
      console.error("Erro ao criar jogo:", error);
      toast.error("Erro ao criar jogo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="container mx-auto p-6 max-w-2xl">
      <Link href="/admin/games">
        <Button className="mb-4" variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogos
        </Button>
      </Link>
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Adicionar jogo</h1>
          <p className="text-muted-foreground mt-1">
            Preencha os dados do jogo para adicioná-lo à plataforma
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Jogo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Jogo *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Digite o nome do jogo"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseDate">Data de Lançamento *</Label>
              <Input
                id="releaseDate"
                type="date"
                {...register("releaseDate")}
                className={errors.releaseDate ? "border-red-500" : ""}
              />
              {errors.releaseDate && (
                <p className="text-sm text-red-500">
                  {errors.releaseDate.message}
                </p>
              )}
            </div>

            {/* Upload da Capa */}
            <div className="space-y-3">
              <Label>Capa do Jogo *</Label>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Selecionar Imagem</span>
                  </Button>
                  {previewImage && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewImage ? (
                  <div className="relative w-48 h-64 rounded-lg overflow-hidden border">
                    <Image
                      src={previewImage}
                      alt="Preview da capa"
                      fill
                      className="object-contain"
                      style={{ objectFit: "contain", borderRadius: "8px" }}
                    />
                  </div>
                ) : (
                  <div className="w-48 h-64 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <span className="text-sm">Nenhuma imagem selecionada</span>
                  </div>
                )}

                <p className="text-sm text-muted-foreground">
                  Formatos aceitos: JPEG, PNG, GIF. Tamanho máximo: 5MB
                </p>
              </div>
              {errors.foto && (
                <p className="text-sm text-red-500">{errors.foto.message}</p>
              )}
            </div>
            <div className="space-y-3">
              <Label>Plataformas *</Label>
              <p className="text-sm text-muted-foreground">
                Selecione pelo menos uma plataforma
              </p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <Badge
                    key={platform}
                    variant={
                      selectedPlatforms?.includes(platform)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handlePlatformToggle(platform)}
                  >
                    {platform}
                    {selectedPlatforms?.includes(platform) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
              {errors.platforms && (
                <p className="text-sm text-red-500">
                  {errors.platforms.message}
                </p>
              )}
            </div>

            {/* Gêneros */}
            <div className="space-y-3">
              <Label>Gêneros *</Label>
              <p className="text-sm text-muted-foreground">
                Selecione pelo menos um gênero
              </p>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <Badge
                    key={genre}
                    variant={
                      selectedGenres?.includes(genre) ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleGenreToggle(genre)}
                  >
                    {genre}
                    {selectedGenres?.includes(genre) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
              {errors.genres && (
                <p className="text-sm text-red-500">{errors.genres.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/games")}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Jogo
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
