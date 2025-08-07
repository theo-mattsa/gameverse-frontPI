"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/auth";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Swords } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    try {
      await authService.signUp(data);
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Falha ao cadastrar usuário. Tente novamente.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto gap-4 md:gap-8 w-full max-w-4xl px-4 md:px-8">
      <div className="flex flex-col items-center gap-2">
        {/* <Swords className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-1000 hover:rotate-360" /> */}
        <Image
            src="/logo-completa.png"
            alt="GameVerse Logo"
            width={160}
            height={40}
          />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Comece sua jornada agora!
        </h1>
        <p className="text-sm md:text-base text-center text-gray-600">
          Crie sua conta para acessar todos os recursos do GameVerse
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-2 space-y-3"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input
            className={`h-10 md:h-11 text-sm md:text-base ${
              errors.username ? "border-red-500 focus:border-red-500" : ""
            }`}
            id="username"
            type="text"
            placeholder="Digite seu nome de usuário"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500 text-xs">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Digite seu email"
            className={`h-10 md:h-11 text-sm md:text-base ${
              errors.email ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className={`h-10 md:h-11 text-sm md:text-base ${
              errors.password ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer h-10 md:h-11 text-sm md:text-base mt-4 md:mt-6"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Cadastrar"}
        </Button>
      </form>
      <p className="text-sm md:text-base text-center">
        Já tem uma conta?{" "}
        <Link href="/login" className="font-bold hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
