"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, Swords, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-around">
        <Link
          href="/feed"
          className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Swords className="w-8 h-8 text-primary transition-transform duration-1000 group-hover:rotate-360" />
          <span className="text-xl font-bold">GameVerse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/feed"
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Feed
          </Link>
          <Link
            href="/games"
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary "
          >
            Jogos
          </Link>
          <Link
            href="/users"
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary "
          >
            Usuários
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.foto || undefined} />
                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.username || "Usuário"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "Email não disponível"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                className="cursor-pointer"
                href={`/profile/${user?.username}`}
              >
                <User className="w-4 h-4" />
                Ver meu perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden border-t px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link
            href="/feed"
            className="flex-1 text-center py-2 px-3 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            Feed
          </Link>
          <Link
            href="/users"
            className="flex-1 text-center py-2 px-3 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            Usuários
          </Link>
          <Link
            href="/games"
            className="flex-1 text-center py-2 px-3 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            Jogos
          </Link>
        </nav>
      </div>
    </header>
  );
}
