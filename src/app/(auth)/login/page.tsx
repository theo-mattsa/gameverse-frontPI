"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { authService } from "@/lib/api/auth";
import { loginSchema, LoginSchema } from "@/lib/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await authService.signIn(data.email, data.password);
      await login(result.token);
      toast.success("Login realizado com sucesso!");
      if (user?.role === "ADMIN") {
        router.push("/admin");
        return;
      }
      router.push("/feed");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto gap-4 md:gap-8 w-full max-w-4xl px-4 md:px-8">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/logo-completa.png"
          alt="GameVerse Logo"
          width={200}
          height={100}
        />
        <p className="text-sm md:text-base text-center text-gray-600">
          Entre com suas credenciais para acessar sua conta
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-2 space-y-3"
      >
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
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
      <p className="text-sm md:text-base text-center">
        Não possui uma conta?{" "}
        <Link href="/signup" className="font-bold hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
