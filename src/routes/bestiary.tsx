import { createFileRoute, Link } from "@tanstack/react-router";
import { Bestiary } from "@/components/Bestiary";

export const Route = createFileRoute("/bestiary")({
  head: () => ({
    meta: [
      { title: "Echo Bestiary — Animated Hero & Enemy Preview" },
      {
        name: "description",
        content:
          "Preview every Echo hero skin and all 35 enemies with their live idle, walk and death animations, tiers, damage and wave data.",
      },
      { property: "og:title", content: "Echo Bestiary — Animated Hero & Enemy Preview" },
      {
        property: "og:description",
        content:
          "Every hero and enemy in Echo, animated exactly as they appear in combat, with tier, HP, damage and wave stats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BestiaryPage,
});

function BestiaryPage() {
  return (
    <main className="min-h-screen bg-[#0b0714] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="pop-title text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
              Bestiary
            </h1>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/60">
              Live idle · walk · death for the full cast
            </p>
          </div>
          <Link
            to="/"
            className="rounded-full border-2 border-ink bg-amber-500 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
          >
            Back to menu
          </Link>
        </header>

        <div className="pop-shell rounded-[2rem] p-3 sm:p-5">
          <Bestiary />
        </div>
      </div>
    </main>
  );
}
