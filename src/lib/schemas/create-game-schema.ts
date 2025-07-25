import z from "zod";

export const createGameSchema = z.object({
  name: z.string().min(1, "Título é obrigatório"),
  releaseDate: z.string().date(),
  foto: z.string().min(1, "Capa do jogo é obrigatória"),
});

export type CreateGameSchema = z.infer<typeof createGameSchema>;
