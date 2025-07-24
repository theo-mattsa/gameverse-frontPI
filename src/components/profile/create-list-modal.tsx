"use client";

import { useState } from "react";
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
import { fakeGames } from "@/lib/fake-data";
import { Game } from "@/lib/api/types";
import {
  createListGameSchema,
  CreateListGameSchema,
} from "@/lib/schemas/create-listgame-schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const games: Pick<Game, "id" | "title">[] = fakeGames;
  const selectedGames = watch("games");

  function handleAddGame(gameId: string) {
    if (!selectedGames.includes(gameId)) {
      setValue("games", [...selectedGames, gameId]);
    }
  }

  function handleRemoveGame(gameId: string) {
    setValue(
      "games",
      selectedGames.filter((id) => id !== gameId)
    );
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
                {search ? (
                  games
                    .filter((g) =>
                      g.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((game) => (
                      <CommandItem
                        key={game.id}
                        onSelect={() => handleAddGame(game.id)}
                      >
                        {game.title}
                      </CommandItem>
                    ))
                ) : (
                  <CommandEmpty>Nenhum jogo encontrado.</CommandEmpty>
                )}
              </CommandList>
            </Command>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedGames.map((game) => (
                <span className="bg-accent px-2 py-1 rounded flex items-center gap-1 text-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveGame(game)}
                  >
                    <span className="sr-only">Remover jogo</span>
                    &times;
                  </Button>
                </span>
              ))}
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
