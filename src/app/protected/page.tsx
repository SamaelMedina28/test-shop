import { auth } from "@/auth";
import Link from "next/link";

export default async function ProtectedPage() {
  const session = await auth();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.3)]">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-700">
          Protected route
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          `/protected`
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          This page is guarded by `src/proxy.ts`. If you are not authenticated,
          NextAuth will send you back to the sign-in flow before rendering it.
        </p>

        <div className="mt-8 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-700">
          <p className="font-medium text-zinc-900">Session</p>
          <pre className="mt-3 overflow-x-auto text-xs leading-6 text-zinc-600">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <Link
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-black/80"
          href="/"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
