import { z } from "zod";

export const editAccountSchema = z
  .object({
    password: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
  })
  .refine((data) => data.password || data.username || data.email, {
    message:
      "Pelo menos um campo deve ser fornecido: email, username ou password",
  });

export type EditAccountSchema = z.infer<typeof editAccountSchema>;
