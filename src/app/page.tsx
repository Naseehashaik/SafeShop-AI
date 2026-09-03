import SimulationBanner from "@/components/SimulationBanner";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50">
      <SimulationBanner />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Razorpay AI Buildathon 2026 · Track 1
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          SafeShop AI
        </h1>
        <p className="text-lg leading-7 text-zinc-600">
          An AI shopping agent for agentic commerce. Step 0 is complete: the
          Next.js app, Tailwind, and Prisma + SQLite are wired up.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-700">
          <li>Shop chat, wallet, and checkout come in later steps.</li>
          <li>The LLM will never change wallet balance directly.</li>
          <li>Razorpay will be Test Mode only.</li>
        </ul>
        <p className="text-sm text-zinc-500">
          Health check:{" "}
          <a className="underline" href="/api/health">
            /api/health
          </a>
        </p>
      </main>
    </div>
  );
}
