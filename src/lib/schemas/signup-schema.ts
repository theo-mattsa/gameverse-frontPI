import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(6, "Username deve ter pelo menos 6 caracteres")
    .max(18, "Username deve ter no máximo 18 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username deve conter apenas letras, números e _"
    ),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter pelo menos uma letra minúscula, maiúscula e um número"
    ),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
