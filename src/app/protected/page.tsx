import Link from "next/link";
import { ArrowLeft, Vault } from "lucide-react";

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PasswordDashboard } from "./_components/password-dashboard";

export default async function ProtectedPage() {
  const session = await auth();
  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() ??
    session?.user?.email?.charAt(0)?.toUpperCase() ??
    "S";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Vault aria-hidden="true" className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-semibold tracking-tight">Secrets</span>
              <span className="text-muted-foreground text-xs">
                Gestor de contraseñas
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <ArrowLeft aria-hidden="true" />
              Inicio
            </Button>
            <div className="flex items-center gap-2.5">
              <Avatar>
                {session?.user?.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? "Avatar"}
                  />
                ) : null}
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col leading-tight md:flex">
                <span className="max-w-40 truncate text-sm font-medium">
                  {session?.user?.name ?? "Mi cuenta"}
                </span>
                <span className="max-w-40 truncate text-xs text-muted-foreground">
                  {session?.user?.email ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <PasswordDashboard />
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Vault aria-hidden="true" className="size-3.5" />
            </span>
            Secrets · Mi bóveda
          </span>
          <span className="hidden sm:inline">Tus claves, siempre contigo</span>
        </div>
      </footer>
    </div>
  );
}
