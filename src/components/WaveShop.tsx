import { useState } from "react";
import { SINGLE_SRC } from "@/game/assets";
import {
  WEAPONS,
  buyWeapon,
  closeShop,
  equipWeapon,
  rerollPrice,
  rerollShop,
  weaponPrice,
} from "@/game/engine";

import type { GameState, WeaponKey, WeaponRarity } from "@/game/types";

const RARITY_COLOR: Record<WeaponRarity, string> = {
  common: "#9fd8ff",
  uncommon: "#7bf2a8",
  rare: "#c77dff",
  epic: "#ffd166",
  legendary: "#ff7b4d",
};

function statRow(key: WeaponKey) {
  const w = WEAPONS[key];
  const dps = (w.damage * w.pellets) / w.rate;
  return [
    { k: "DPS", v: Math.round(dps) },
    { k: "DMG", v: w.damage * w.pellets },
    { k: "RPS", v: (1 / w.rate).toFixed(1) },
    { k: "PRC", v: w.pierce },
  ];
}

/**
 * Between-wave armoury. Guns only — perks still come off the floor mid-fight.
 */
export function WaveShop({ state, onLeave }: { state: GameState; onLeave: () => void }) {
  const [, setTick] = useState(0);
  const bump = () => setTick((n) => n + 1);
  const s = state;
  const equipped = s.player.weapon;
  const reroll = rerollPrice(s);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-[oklch(0.07_0.02_292/0.86)] p-3 backdrop-blur-md md:rounded-2xl">
      <div className="pop-shell animate-float-up my-auto w-full max-w-3xl rounded-3xl p-4 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-gold">
              Wave {s.wave} cleared
            </p>
            <h2 className="text-title text-3xl leading-none sm:text-4xl">Armoury</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border-2 border-ink/40 px-3 py-1.5">
            <span className="text-base">🪙</span>
            <span className="font-display text-lg leading-none tabular-nums text-gold">
              {s.materials}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {s.shopOffers.map((key) => {
            const w = WEAPONS[key];
            const price = weaponPrice(key, s.wave);
            const owned = s.arsenal.includes(key);
            const canBuy = !owned && s.materials >= price;
            const col = RARITY_COLOR[w.rarity];
            return (
              <div
                key={key}
                className="pop-tray flex items-center gap-3 rounded-2xl p-3 text-left"
                style={{ borderColor: `color-mix(in oklab, ${col} 55%, transparent)` }}
              >
                <img
                  src={SINGLE_SRC[w.sprite]}
                  alt=""
                  className="h-12 w-12 shrink-0 object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm leading-tight" style={{ color: col }}>
                    {w.name}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-pop-edge">
                    {w.rarity}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                    {statRow(key).map((st) => (
                      <span
                        key={st.k}
                        className="text-[9px] font-black tabular-nums text-muted-foreground"
                      >
                        {st.k} <span className="text-foreground">{st.v}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  disabled={!canBuy}
                  onClick={() => {
                    buyWeapon(s, key);
                    bump();
                  }}
                  className={`press shrink-0 rounded-xl px-3 py-2 text-[11px] font-black uppercase tracking-[0.15em] ${
                    canBuy ? "pop-buy" : "pop-quiet opacity-50"
                  }`}
                >
                  {owned ? "Owned" : `🪙 ${price}`}
                </button>
              </div>
            );
          })}
          {s.shopOffers.length === 0 && (
            <p className="col-span-full py-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Stock cleared out
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-pop-edge">Arsenal</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {s.arsenal.map((key) => {
              const w = WEAPONS[key];
              const active = key === equipped;
              return (
                <button
                  key={key}
                  onClick={() => {
                    equipWeapon(s, key);
                    bump();
                  }}
                  className="press flex items-center gap-1.5 rounded-xl border-2 px-2 py-1.5"
                  style={{
                    borderColor: active ? w.color : "color-mix(in oklab, currentColor 20%, transparent)",
                    background: active ? `color-mix(in oklab, ${w.color} 22%, transparent)` : "transparent",
                  }}
                >
                  <img
                    src={SINGLE_SRC[w.sprite]}
                    alt=""
                    className="h-6 w-6 object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: w.color }}>
                    {w.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            disabled={s.materials < reroll}
            onClick={() => {
              rerollShop(s);
              bump();
            }}
            className={`press flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-[0.2em] ${
              s.materials < reroll ? "pop-quiet opacity-50" : "pop-quiet"
            }`}
          >
            Reroll 🪙 {reroll}
          </button>
          <button
            onClick={() => {
              closeShop(s);
              onLeave();
            }}
            className="pop-buy press flex-1 rounded-2xl py-3 text-sm font-black uppercase tracking-[0.2em]"
          >
            Start wave {s.wave + 1}
          </button>
        </div>
      </div>
    </div>
  );
}
