"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/feed");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie usuários e jogos da plataforma GameVerse
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gerenciar usuários
            </CardTitle>
            <CardDescription>
              Visualize, edite e gerencie todos os usuários da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button className="w-full">
                Acessar gerenciamento de usuários
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Gerenciar Jogos
            </CardTitle>
            <CardDescription>
              Adicione, edite e gerencie o catálogo de jogos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/games">
              <Button className="w-full">Acessar Gerenciamento de Jogos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
