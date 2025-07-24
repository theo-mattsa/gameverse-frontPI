import { z } from "zod";

export const createListGameSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  isPublic: z.union([z.literal(0), z.literal(1)]),
  games: z.array(z.string()),
});

export type CreateListGameSchema = z.infer<typeof createListGameSchema>;
