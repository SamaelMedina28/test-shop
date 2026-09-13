import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Fingerprint,
  KeyRound,
  LogOut,
  ShieldCheck,
  Vault,
} from "lucide-react";

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signInWithGoogle, signOutAction } from "./actions";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.75 1.14-4.76 2.88-2.03 3.51-.52 8.72 1.46 11.57.96 1.39 2.11 2.95 3.62 2.89 1.45-.06 2-.94 3.76-.94s2.25.94 3.79.91c1.56-.03 2.56-1.42 3.51-2.82 1.11-1.62 1.56-3.19 1.59-3.27-.04-.02-3.06-1.17-3.04-4.64ZM14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.63Z" />
    </svg>
  );
}

const sidePerks = [
  {
    icon: ShieldCheck,
    title: "Cifrado siempre activo",
    description: "Tu bóveda solo se abre con tu sesión.",
  },
  {
    icon: KeyRound,
    title: "Todo organizado",
    description: "Logins, tarjetas, notas y Wi-Fi en un lugar.",
  },
  {
    icon: Fingerprint,
    title: "Un clic para entrar",
    description: "Sin otra contraseña que memorizar.",
  },
];

export default async function SignInPage() {
  const session = await auth();
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
  );
  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() ??
    session?.user?.email?.charAt(0)?.toUpperCase() ??
    "S";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Panel lateral */}
      <aside className="hidden w-1/2 flex-col justify-between border-r bg-muted/40 p-10 lg:flex xl:p-14">
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

        <div className="max-w-md">
          <Badge variant="secondary" className="rounded-full">
            Acceso seguro
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance xl:text-5xl">
            Tu bóveda, a un clic de distancia
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Inicia sesión con Google y recupera todas tus claves al instante,
            desde cualquier dispositivo.
          </p>

          <div className="mt-8 space-y-5">
            {sidePerks.map((perk) => (
              <div key={perk.title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm ring-1 ring-border">
                  <perk.icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-medium">{perk.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mini preview */}
          <Card className="mt-10 gap-3 bg-background/80 backdrop-blur">
            <CardContent className="space-y-2.5 p-5">
              {[
                { site: "github.com", user: "samael@dev.io", dots: "••••••••••" },
                { site: "gmail.com", user: "samael@gmail.com", dots: "••••••••••••" },
              ].map((row) => (
                <div
                  key={row.site}
                  className="flex items-center justify-between rounded-lg border bg-muted/50 px-3.5 py-2.5 text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary">
                      {row.site.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <span className="block font-medium">{row.site}</span>
                      <span className="block text-xs text-muted-foreground">
                        {row.user}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs tracking-widest text-muted-foreground">
                    {row.dots}
                  </span>
                </div>
              ))}
              <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="size-3.5 text-primary" />
                Vista previa de cómo se verá tu bóveda
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Protegido con Auth.js · OAuth 2.0 de Google
        </p>
      </aside>

      {/* Formulario */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Vault aria-hidden="true" className="size-5" />
            </span>
            <span className="font-semibold text-foreground">Secrets</span>
          </Link>

          <Card className="gap-6 shadow-sm">
            <CardHeader className="items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Vault aria-hidden="true" className="size-6" />
              </span>
              <Badge variant="outline" className="mt-2 rounded-full">
                Bienvenido de nuevo
              </Badge>
              <CardTitle className="text-2xl sm:text-3xl">
                Inicia sesión en Secrets
              </CardTitle>
              <CardDescription className="max-w-xs leading-6">
                Usa tu cuenta de Google para abrir tu bóveda de contraseñas.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {session?.user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border bg-muted/50 p-4">
                    <Avatar size="lg">
                      {session.user.image ? (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name ?? "Avatar"}
                        />
                      ) : null}
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {session.user.name ?? "Usuario"}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        <Check aria-hidden="true" className="size-3.5" />
                        Sesión activa
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Button
                      nativeButton={false}
                      render={<Link href="/protected" />}
                      size="lg"
                      className="h-11 w-full"
                    >
                      Ir a mi bóveda
                      <ArrowRight aria-hidden="true" />
                    </Button>
                    <form action={signOutAction}>
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="h-11 w-full"
                      >
                        <LogOut aria-hidden="true" />
                        Usar otra cuenta
                      </Button>
                    </form>
                  </div>
                </div>
              ) : googleEnabled ? (
                <form action={signInWithGoogle}>
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    className="h-12 w-full gap-2.5 bg-background text-sm shadow-sm transition-all hover:bg-muted"
                  >
                    <GoogleIcon className="size-5 shrink-0" />
                    Continuar con Google
                  </Button>
                </form>
              ) : ( 
                <div className="space-y-3">
                  <Button size="lg" className="h-12 w-full" disabled>
                    <GoogleIcon className="size-5 shrink-0 opacity-60" />
                    Continuar con Google
                  </Button>
                  <div className="rounded-xl border border-dashed bg-muted/50 p-4 text-sm leading-6 text-muted-foreground">
                    <p className="font-medium text-foreground">
                      Google aún no está configurado
                    </p>
                    <p className="mt-1">
                      Añade{" "}
                      <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs ring-1 ring-border">
                        AUTH_GOOGLE_ID
                      </code>{" "}
                      y{" "}
                      <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs ring-1 ring-border">
                        AUTH_GOOGLE_SECRET
                      </code>{" "}
                      en tu{" "}
                      <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs ring-1 ring-border">
                        .env
                      </code>{" "}
                      y reinicia el servidor para activar el acceso.
                    </p>
                    <p className="mt-2 font-mono text-xs">
                      Redirect URI: http://localhost:3000/api/auth/callback/google
                    </p>
                  </div>
                </div>
              )}

              {!session?.user && googleEnabled && (
                <>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Separator className="flex-1" />
                    <span className="shrink-0">o continúa con</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11"
                      disabled
                      title="Disponible próximamente"
                    >
                      <GitHubIcon className="size-4.5 shrink-0" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11"
                      disabled
                      title="Disponible próximamente"
                    >
                      <AppleIcon className="size-4.5 shrink-0" />
                      Apple
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Más proveedores próximamente
                  </p>
                </>
              )}

              <ul className="space-y-2 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                {[
                  "Cifrado y sesión segura con Auth.js",
                  "Tus claves solo las ves tú",
                  "Accede desde cualquier dispositivo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex-col gap-4">
              <Separator />
              <div className="flex w-full items-center justify-between text-sm">
                <Button
                  nativeButton={false}
                  render={<Link href="/" />}
                  variant="ghost"
                  size="sm"
                >
                  <ArrowLeft aria-hidden="true" />
                  Volver al inicio
                </Button>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Link href="/" className="px-2 py-1 transition-colors hover:text-foreground">
                    Términos
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link href="/" className="px-2 py-1 transition-colors hover:text-foreground">
                    Privacidad
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            Al continuar aceptas nuestros Términos y confirmas que leíste la
            Política de Privacidad.
          </p>
        </div>
      </main>
    </div>
  );
}
