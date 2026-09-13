import Link from "next/link";
import {
  ArrowRight,
  Check,
  Fingerprint,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: ShieldCheck,
    title: "Cifrado de confianza",
    description:
      "Tu bóveda vive en un espacio protegido. Solo tú puedes ver tus secretos una vez inicias sesión.",
  },
  {
    icon: KeyRound,
    title: "Todo en un solo lugar",
    description:
      "Guarda logins, tarjetas, notas y claves Wi-Fi con búsqueda instantánea y organización por carpetas.",
  },
  {
    icon: Fingerprint,
    title: "Acceso con Google",
    description:
      "Entra en un clic con tu cuenta de Google, sin otra contraseña que recordar. Rápido y seguro.",
  },
];

const steps = [
  {
    n: "01",
    title: "Crea tu cuenta",
    description: "Inicia sesión con Google en segundos, sin formularios eternos.",
  },
  {
    n: "02",
    title: "Guarda tus claves",
    description: "Añade tus contraseñas y accede a ellas desde cualquier dispositivo.",
  },
  {
    n: "03",
    title: "Autocompleta y listo",
    description: "Copia, pega y comparte de forma segura cuando lo necesites.",
  },
];

export default async function Home() {
  const session = await auth();
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
  );
  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() ??
    session?.user?.email?.charAt(0)?.toUpperCase() ??
    "S";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
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

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="#funciones" className="transition-colors hover:text-foreground">
              Funciones
            </Link>
            <Link href="#como-funciona" className="transition-colors hover:text-foreground">
              Cómo funciona
            </Link>
            <Link href="/protected" className="transition-colors hover:text-foreground">
              Mi bóveda
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {session?.user ? (
              <Button
                nativeButton={false}
                render={<Link href="/protected" />}
                size="sm"
              >
                Abrir bóveda
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <Button
                nativeButton={false}
                render={<Link href="/signin" />}
                size="sm"
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,var(--muted)_0%,transparent_70%)]"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-16 pb-12 text-center sm:pt-24">
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
              <Sparkles aria-hidden="true" />
              Gestor de contraseñas
            </Badge>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Todas tus contraseñas, seguras en un solo lugar
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Secrets guarda, organiza y protege tus claves para que no tengas
              que recordarlas nunca más. Entra con Google y listo.
            </p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Button
                nativeButton={false}
                render={<Link href="/signin" />}
                size="lg"
                className="h-11 w-full px-6 text-sm sm:w-auto"
              >
                {googleEnabled ? "Empezar gratis" : "Ver cómo entrar"}
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/protected" />}
                variant="outline"
                size="lg"
                className="h-11 w-full px-6 text-sm sm:w-auto"
              >
                <Lock aria-hidden="true" />
                Ver mi bóveda
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Sin tarjeta", "Acceso con Google", "Cancela cuando quieras"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" className="size-4 text-primary" />
                    {item}
                  </span>
                ),
              )}
            </div>

            {/* Estado de sesión */}
            <Card className="mt-10 w-full max-w-2xl text-left">
              <CardContent className="flex items-center gap-4 p-5 sm:p-6">
                {session?.user ? (
                  <>
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
                      <p className="text-sm text-muted-foreground">Sesión activa</p>
                      <p className="truncate font-semibold">
                        Hola, {session.user.name ?? session.user.email}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        Tu bóveda ya está lista para usarse.
                      </p>
                    </div>
                    <Button
                      nativeButton={false}
                      render={<Link href="/protected" />}
                      variant="secondary"
                      className="shrink-0"
                    >
                      Continuar
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <KeyRound aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">Aún no has iniciado sesión</p>
                      <p className="text-sm text-muted-foreground">
                        Conecta tu cuenta de Google para abrir tu bóveda privada.
                      </p>
                    </div>
                    <Button
                      nativeButton={false}
                      render={<Link href="/signin" />}
                      variant="outline"
                      className="shrink-0"
                    >
                      Iniciar sesión
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section id="funciones" className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <div className="max-w-2xl">
            <Badge variant="outline" className="rounded-full">
              Funciones
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Pensado para que olvides tus contraseñas
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Lo esencial de un gestor moderno, sin complicaciones ni curvas de
              aprendizaje.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="gap-4">
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon aria-hidden="true" className="size-5" />
                  </span>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {f.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl" />

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <Badge variant="outline" className="rounded-full">
                Cómo funciona
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Empieza en menos de un minuto
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Tres pasos y tu vida digital queda ordenada y protegida.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/signin" />}
                className="mt-6"
              >
                Crear mi bóveda
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {steps.map((s) => (
                <Card key={s.n} className="bg-muted/40">
                  <CardHeader>
                    <span className="text-sm font-semibold text-primary tabular-nums">
                      {s.n}
                    </span>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <CardDescription className="leading-6">
                      {s.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  Seguro · Rápido · Siempre disponible
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  Tu tranquilidad digital empieza aquí
                </h2>
                <p className="mt-2 text-sm leading-6 opacity-80 sm:text-base">
                  Únete con tu cuenta de Google y mantén cada acceso bajo
                  control desde tu bóveda personal.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-52">
                <Button
                  nativeButton={false}
                  render={<Link href="/signin" />}
                  variant="secondary"
                  size="lg"
                  className="h-11 w-full"
                >
                  Entrar ahora
                  <ArrowRight aria-hidden="true" />
                </Button>
                <p className="text-center text-xs opacity-70">
                  Gratis para empezar
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Vault aria-hidden="true" className="size-3.5" />
            </span>
            Secrets · Gestor de contraseñas
          </span>
          <span>Hecho con seguridad · Auth.js + Google</span>
        </div>
      </footer>
    </div>
  );
}
