"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { useForm, Controller } from "react-hook-form";
import { GetGameBySubstringResponse } from "@/lib/api/types";
import {
  createListGameSchema,
  CreateListGameSchema,
} from "@/lib/schemas/create-listgame-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@/hooks/use-debounce";
import { gameService } from "@/lib/api/game-service";
import { Skeleton } from "../ui/skeleton";

interface CreateListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CreateListGameSchema) => void;
}

export function CreateListModal({
  open,
  onOpenChange,
  onCreate,
}: CreateListModalProps) {
  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<CreateListGameSchema>({
      resolver: zodResolver(createListGameSchema),
      defaultValues: {
        name: "",
        isPublic: 1,
        games: [],
      },
    });

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GetGameBySubstringResponse[]>([]);
  const [selectedGameObjects, setSelectedGameObjects] = useState<
    GetGameBySubstringResponse[]
  >([]);
  const selectedGames = watch("games");

  const debouncedSearch = useDebounce(search, 500);

  // Resetar campos ao fechar o modal
  useEffect(() => {
    if (!open) {
      reset();
      setSearch("");
      setGames([]);
      setSelectedGameObjects([]);
    }
  }, [open, reset]);

  useEffect(() => {
    if (debouncedSearch.trim().length === 0) return;
    async function fetchGames() {
      setIsLoading(true);
      try {
        const data = await gameService.getGameBySubstring(debouncedSearch);
        setGames(data);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGames();
  }, [debouncedSearch]);

  function handleAddGame(gameId: string) {
    if (!selectedGames.includes(gameId)) {
      setValue("games", [...selectedGames, gameId]);
    }
    const gameToAdd = games.find((g) => g.id === gameId);
    if (gameToAdd && !selectedGameObjects.find((g) => g.id === gameId)) {
      setSelectedGameObjects((old) => [...old, gameToAdd]);
    }
    setSearch("");
  }

  function handleRemoveGame(gameId: string) {
    setValue(
      "games",
      selectedGames.filter((id) => id !== gameId)
    );
    setSelectedGameObjects((old) => old.filter((g) => g.id !== gameId));
  }

  function onSubmit(data: CreateListGameSchema) {
    onCreate(data);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova lista</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar sua lista de jogos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Nome da lista"
            {...register("name", { required: true })}
          />
          <div className="flex items-center gap-2">
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value === 1}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                />
              )}
            />
            <span>Pública</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Adicionar jogos</label>
            <Command>
              <CommandInput
                placeholder="Buscar jogo..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                {isLoading ? (
                  <div className="p-2 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : debouncedSearch.length > 0 ? (
                  games.length > 0 ? (
                    games.map((game) => (
                      <CommandItem
                        key={game.id}
                        onSelect={() => handleAddGame(game.id)}
                      >
                        {game.name}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandEmpty>Nenhum jogo encontrado.</CommandEmpty>
                  )
                ) : (
                  <CommandEmpty>Digite para buscar jogos.</CommandEmpty>
                )}
              </CommandList>
            </Command>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGameObjects.map((game) => (
                  <span
                    key={game.id}
                    className="bg-accent px-2 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    {game.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveGame(game.id)}
                      type="button"
                    >
                      <span className="sr-only">Remover jogo</span>
                      &times;
                    </Button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full mt-2">
            Criar lista
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
