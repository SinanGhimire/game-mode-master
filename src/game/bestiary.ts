import { CRITTER_ENEMIES, CRITTER_MAP, type CritterEnemyKey } from "./critters";
import { CRITTER_STATS, CRITTER_TIER } from "./critter-species";
import type { Gait } from "./art-strips";

/** Where an enemy sits in the wave design. */
export type EnemyClass = "fodder" | "ranged" | "disruptor" | "elite" | "guardian";

export const CLASS_LABEL: Record<EnemyClass, string> = {
  fodder: "Fodder",
  ranged: "Ranged",
  disruptor: "Disruptor",
  elite: "Elite",
  guardian: "Guardian",
};

export const CLASS_COLOR: Record<EnemyClass, string> = {
  fodder: "#8ff6ff",
  ranged: "#a6ff7d",
  disruptor: "#ffb46b",
  elite: "#ff7a9c",
  guardian: "#ffd24a",
};

export interface EnemyLore {
  cls: EnemyClass;
  role: string;
}

/** Design intent per enemy — what it does to a wave, so the roster stays readable. */
export const ENEMY_LORE: Record<CritterEnemyKey, EnemyLore> = {
  e_imp_violet: { cls: "fodder", role: "Pack imp — quick, fragile, and never travels alone." },
  e_imp_bile: { cls: "fodder", role: "Sturdier imp that walks you down and bites." },
  e_imp_crimson: { cls: "disruptor", role: "Horned imp that sprints in sudden bursts." },
  e_gnat: { cls: "fodder", role: "Fuzzy flyer that weaves hard to break your auto-aim." },
  e_mushroom: { cls: "disruptor", role: "Trundles in and leaves a trail of toxic spores behind it." },
  e_bringer: { cls: "elite", role: "Scythe-wielding wraith that hits twice as hard once you are hurt." },
  e_skel_white: { cls: "fodder", role: "Sword-armed footsoldier that walks you down and swings." },
  e_skel_gold: { cls: "disruptor", role: "Marks a lane, then charges straight down it." },
  e_golem_blue: { cls: "elite", role: "Rams the arena border and showers you in debris." },
  e_golem_ember: { cls: "elite", role: "Accelerates in and detonates on contact." },
  e_golem_armor: { cls: "elite", role: "Frontal stone barrier — shots from the front bounce off." },
  e_bat: { cls: "fodder", role: "Cave bat that weaves erratically to spoil your aim." },
  e_wizard: { cls: "ranged", role: "Floating warlock that hurls arcane bolts from deep cover." },
  e_gollux: { cls: "guardian", role: "Stone titan — its front plating turns away incoming fire." },
  e_blob_gray: { cls: "fodder", role: "Gelatinous gray sack that bursts into three pups when popped." },
  e_blob_pup: { cls: "fodder", role: "Splinter of a bigger blob — tiny, fast and relentless." },
  e_zombie: { cls: "fodder", role: "Shambles you down and heals itself with every bite it lands." },
  e_ghost: { cls: "disruptor", role: "Invisible until it drifts into striking range." },
  e_hound: { cls: "disruptor", role: "Grave-dog that sprints at you in sudden bursts." },
};

/** Same rig selection the game uses, so previews animate exactly like combat. */
export function gaitForKey(key: string): Gait {
  const d = CRITTER_MAP[key];
  if (!d) return "ground";
  if (d.legs === "many") return "crawler";
  if (d.shape === "serpent" || d.shape === "worm" || d.shape === "long") return "serpent";
  if (d.legs === "none" || d.wings || d.shape === "ghost" || d.shape === "orb" || d.shape === "jelly")
    return "float";
  if (d.size <= 0.85) return "skitter";
  if (d.size >= 1.3) return "heavy";
  return "ground";
}

export interface BestiaryEntry {
  key: CritterEnemyKey;
  name: string;
  cls: EnemyClass;
  role: string;
  tier: number;
  hp: number;
  damage: number;
  speed: [number, number];
  minWave: number;
  gait: Gait;
}

/** Roster sorted the way a player meets it: earliest wave first, then tier. */
export const BESTIARY: BestiaryEntry[] = CRITTER_ENEMIES.map((d) => {
  const key = d.key as CritterEnemyKey;
  const s = CRITTER_STATS[key];
  const lore = ENEMY_LORE[key];
  return {
    key,
    name: d.name,
    cls: lore.cls,
    role: lore.role,
    tier: CRITTER_TIER[key],
    hp: s.hp,
    damage: s.damage,
    speed: s.speed,
    minWave: s.minWave,
    gait: gaitForKey(key),
  };
}).sort((a, b) => a.minWave - b.minWave || a.tier - b.tier || a.name.localeCompare(b.name));
