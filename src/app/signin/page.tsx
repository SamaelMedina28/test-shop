import Link from "next/link";

import { auth } from "@/auth";
import { signInWithGoogle } from "./actions";

export default async function SignInPage() {
  const session = await auth();
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_100%)] px-6 py-16 text-zinc-900">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-[0_30px_100px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
            Sign in
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Inicia sesión para entrar a la ruta protegida
          </h1>
          <p className="text-base leading-7 text-zinc-600">
            Este es el destino al que Auth.js te manda cuando una ruta
            protegida no encuentra sesión.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 text-sm text-zinc-700">
          <p className="font-medium text-zinc-900">Estado actual</p>
          <pre className="mt-3 overflow-x-auto text-xs leading-6 text-zinc-600">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm leading-6 text-zinc-700">
          <p className="font-medium text-zinc-900">Callback de Google</p>
          <p className="mt-2">
            En Google Cloud configura este redirect URI exacto para desarrollo:
          </p>
          <code className="mt-3 block rounded-xl bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-100">
            http://localhost:3000/api/auth/callback/google
          </code>
        </div>

        {googleEnabled ? (
          <form action={signInWithGoogle}>
            <button
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-black/80"
              type="submit"
            >
              Continuar con Google
            </button>
          </form>
        ) : (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Google aún no está configurado. Añade `AUTH_GOOGLE_ID` y
            `AUTH_GOOGLE_SECRET` en `.env` o copia `.env.example` y rellénalo
            para activar el acceso.
          </div>
        )}

        <Link
          className="inline-flex h-11 w-fit items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          href="/"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
