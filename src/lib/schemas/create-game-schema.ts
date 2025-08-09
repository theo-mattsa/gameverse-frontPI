import z from "zod";

export const createGameSchema = z.object({
  name: z.string().min(1, "Título é obrigatório"),
  releaseDate: z.string().date(),
  foto: z.string().min(1, "Capa do jogo é obrigatória"),
  platforms: z
    .array(z.string())
    .min(1, "Pelo menos uma plataforma é obrigatória"),
  genres: z.array(z.string()).min(1, "Pelo menos um gênero é obrigatório"),
});

export type CreateGameSchema = z.infer<typeof createGameSchema>;
