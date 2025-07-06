"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  // Loading enquanto busca dados do usuário
  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-muted-foreground">
            Carregando dados do usuário...
          </p>
        </div>
      </div>
    );
  }

  // Não autenticado - Não renderiza nada
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
