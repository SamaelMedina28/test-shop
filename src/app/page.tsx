import Link from "next/link";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.18),_transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-6 py-16 text-zinc-900">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_30px_100px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
            Prisma + NextAuth
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Base lista para Google login, Prisma y una ruta protegida.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Ya tienes la estructura mínima: Prisma conectado a PostgreSQL,
            Auth.js con Google, y un `proxy` de Next 16 protegiendo
            `/protected`.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Estado sesión</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">
              {session?.user ? `Hola, ${session.user.name ?? session.user.email}` : "No has iniciado sesión"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              La sesión se obtiene en servidor con `auth()`.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Google</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">
              {googleEnabled ? "Configurado" : "Pendiente"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Si todavía no tienes `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET`, usa
              la ruta `/signin` para ver qué falta.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {googleEnabled ? (
            <Link
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-black/80"
              href="/signin"
            >
              Ir a sign in
            </Link>
          ) : (
            <span className="inline-flex h-11 items-center justify-center rounded-full border border-dashed border-zinc-300 px-5 text-sm text-zinc-500">
              Añade tus credenciales de Google para activar el login
            </span>
          )}

          <Link
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            href="/protected"
          >
            Ir a ruta protegida
          </Link>
        </div>
      </section>
    </main>
  );
}
