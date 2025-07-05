import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, "Username deve ter pelo menos 4 caracteres")
    .max(16, "Username deve ter no máximo 16 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username deve conter apenas letras, números e _"
    ),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter pelo menos uma letra minúscula, maiúscula e um número"
    ),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
