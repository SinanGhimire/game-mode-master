import { useEffect, useMemo, useState } from "react";
import { AnimSprite } from "./AnimSprite";
import { loadSprites, PLAYER_CHARACTERS, type AnimKey, type Sprites } from "@/game/assets";
import { BESTIARY, CLASS_COLOR, CLASS_LABEL, type EnemyClass } from "@/game/bestiary";
import { CHARACTERS, WEAPONS } from "@/game/engine";
import type { CharacterKey } from "@/game/types";

const ANIMS: { key: AnimKey; label: string; fps: number; loop: boolean }[] = [
  { key: "idle", label: "Idle", fps: 9, loop: true },
  { key: "walk", label: "Walk", fps: 14, loop: true },
  { key: "death", label: "Death", fps: 12, loop: false },
];

/** Human-readable name for each animation rig. */
const GAIT_LABEL: Record<string, string> = {
  ground: "Two-leg walk",
  heavy: "Heavy stomp",
  skitter: "Skitter",
  crawler: "Multi-leg crawl",
  float: "Hover / flight",
  serpent: "Slither",
};

const CLASS_FILTERS: ("all" | EnemyClass)[] = [
  "all",
  "fodder",
  "ranged",
  "disruptor",
  "elite",
  "guardian",
];

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string | undefined;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border-2 border-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 ${
        active ? "text-ink" : "bg-[#3c3560]/90 text-white/80"
      }`}
      style={active ? { background: color ?? "#f6c445" } : undefined}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[9px] font-black uppercase tracking-widest text-white/55">{label}</span>
      <span className="text-[11px] font-black tabular-nums text-white">{value}</span>
    </div>
  );
}

/**
 * Animated preview gallery for the whole cast: every hero skin and every enemy,
 * playing the exact strips the game renders in combat.
 */
export function Bestiary({ compact = false }: { compact?: boolean }) {
  const [sprites, setSprites] = useState<Sprites | null>(null);
  const [tab, setTab] = useState<"enemies" | "heroes">("enemies");
  const [anim, setAnim] = useState<AnimKey>("idle");
  const [cls, setCls] = useState<"all" | EnemyClass>("all");
  const [replay, setReplay] = useState(0);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    let alive = true;
    loadSprites().then((s) => alive && setSprites(s));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // death plays once, so give the user a replay tick
  useEffect(() => {
    if (anim !== "death") return;
    const t = setInterval(() => setReplay((r) => r + 1), 2200);
    return () => clearInterval(t);
  }, [anim]);

  const enemies = useMemo(
    () => (cls === "all" ? BESTIARY : BESTIARY.filter((e) => e.cls === cls)),
    [cls],
  );

  const selectedAnim: AnimKey = isPhone ? "idle" : anim;
  const conf = ANIMS.find((a) => a.key === selectedAnim)!;
  const cell = compact ? "h-24" : "h-32 sm:h-36";

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Chip active={tab === "enemies"} onClick={() => setTab("enemies")}>
          Enemies · {BESTIARY.length}
        </Chip>
        <Chip active={tab === "heroes"} onClick={() => setTab("heroes")}>
          Heroes · {PLAYER_CHARACTERS.length}
        </Chip>
        <span className="mx-1 h-5 w-px bg-white/20" />
        {!isPhone && ANIMS.map((a) => (
          <Chip
            key={a.key}
            active={anim === a.key}
            onClick={() => {
              setAnim(a.key);
              setReplay((r) => r + 1);
            }}
          >
            {a.label}
          </Chip>
        ))}
        {isPhone && (
          <span className="w-full text-center text-[9px] font-black uppercase tracking-widest text-white/50">
            Static previews on phone
          </span>
        )}
      </div>

      {tab === "enemies" && (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {CLASS_FILTERS.map((c) => (
            <Chip
              key={c}
              active={cls === c}
              color={c === "all" ? undefined : CLASS_COLOR[c]}
              onClick={() => setCls(c)}
            >
              {c === "all" ? "All" : CLASS_LABEL[c]}
            </Chip>
          ))}
        </div>
      )}

      {!sprites ? (
        <p className="py-10 text-center text-[11px] font-black uppercase tracking-widest text-white/60">
          Rigging animations…
        </p>
      ) : tab === "enemies" ? (
        <div
          className={`grid gap-2.5 overflow-y-auto pr-1 ${
            compact ? "max-h-[46vh] grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {enemies.map((e) => {
            const strip = sprites.strips[e.key][selectedAnim];
            return (
              <article key={e.key} className="pop-card rounded-2xl p-2.5">
                <div className="grid place-items-center rounded-xl bg-[#120c22]/70 p-1">
                  <AnimSprite
                    src={strip.img.src}
                    frames={strip.frames}
                    fps={conf.fps}
                    loop={conf.loop}
                    playing={!isPhone}
                    restartKey={`${selectedAnim}-${replay}`}
                    className={`w-full ${cell}`}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <p className="pop-label truncate text-[11px] font-black uppercase">{e.name}</p>
                  <span
                    className="shrink-0 rounded-full border-2 border-ink px-1.5 text-[8px] font-black uppercase tracking-wider text-ink"
                    style={{ background: CLASS_COLOR[e.cls] }}
                  >
                    {CLASS_LABEL[e.cls]}
                  </span>
                </div>
                {!compact && (
                  <p className="mt-1 text-[10px] font-semibold leading-snug text-white/65">
                    {e.role}
                  </p>
                )}
                <div className="mt-1.5 grid gap-0.5">
                  <Stat label="Rig" value={GAIT_LABEL[e.gait] ?? e.gait} />
                  <Stat label="Tier" value={`${e.tier}`} />
                  <Stat label="HP" value={`${e.hp}`} />
                  <Stat label="Damage" value={`${e.damage}`} />
                  <Stat label="Speed" value={`${e.speed[0]}–${e.speed[1]}`} />
                  <Stat label="From wave" value={`${e.minWave}`} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div
          className={`grid gap-2.5 overflow-y-auto pr-1 ${
            compact ? "max-h-[46vh] grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {PLAYER_CHARACTERS.map((c) => {
            const key = c.key as CharacterKey;
            const strip = sprites.playerSkins[key][selectedAnim];
            const stat = CHARACTERS[key];
            return (
              <article key={c.key} className="pop-card rounded-2xl p-2.5">
                <div className="grid place-items-center rounded-xl bg-[#120c22]/70 p-1">
                  <AnimSprite
                    src={strip.img.src}
                    frames={strip.frames}
                    fps={conf.fps}
                    loop={conf.loop}
                    playing={!isPhone}
                    restartKey={`${selectedAnim}-${replay}`}
                    className={`w-full ${cell}`}
                  />
                </div>
                <p className="pop-label mt-1.5 truncate text-[11px] font-black uppercase">
                  {stat.name}
                </p>
                {!compact && (
                  <p className="mt-1 text-[10px] font-semibold leading-snug text-white/65">
                    {stat.blurb}
                  </p>
                )}
                <div className="mt-1.5 grid gap-0.5">
                  <Stat label="HP" value={`${stat.hp}`} />
                  <Stat label="Speed" value={`${stat.speed}`} />
                  <Stat label="Weapon" value={WEAPONS[stat.weapon].name} />
                  <Stat label="Dmg mult" value={`x${stat.damage}`} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
