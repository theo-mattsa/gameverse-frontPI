import z from "zod";

export const reviewSchema = z.object({
  title: z.string().max(100),
  content: z.string().min(10, "Comentário muito curto"),
  rate: z.number().min(1).max(5),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
