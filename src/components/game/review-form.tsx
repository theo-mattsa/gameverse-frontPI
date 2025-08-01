"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReviewFormData,
  reviewSchema,
} from "@/lib/schemas/create-rating-schema";

export default function ReviewForm({
  onSubmit,
}: {
  onSubmit: (data: ReviewFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rate: 3,
    },
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Escreva sua avaliação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Titulo da sua resenha"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Comentário</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Conte sua experiência com o jogo..."
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nota</Label>
            <Slider
              defaultValue={[3]}
              min={1}
              max={5}
              step={1}
              onValueChange={(val) => setValue("rate", val[0])}
            />
            <p className="text-sm text-muted-foreground">
              Nota: {watch("rate")}
            </p>
          </div>

          <Button type="submit">Enviar Avaliação</Button>
        </form>
      </CardContent>
    </Card>
  );
}
