import type { CharacterKey } from "./types";
import {
  CRITTER_ENEMIES,
  CRITTER_HEROES,
  CRITTER_MAP,
  critterSrc,
  type CritterEnemyKey,
} from "./critters";
import { ENEMY_ART } from "./enemy-art";



/* ---- player skins ---- */
import pIdle from "@/assets/sprites2/player-idle.png";
import pWalk from "@/assets/sprites2/player-walk.png";
import pDeath from "@/assets/sprites2/player-death.png";
import p2Idle from "@/assets/sprites2/p2-idle.png";
import p2Walk from "@/assets/sprites2/p2-walk.png";
import p2Death from "@/assets/sprites2/p2-death.png";
import p3Idle from "@/assets/sprites2/p3-idle.png";
import p3Walk from "@/assets/sprites2/p3-walk.png";
import p3Death from "@/assets/sprites2/p3-death.png";
import p4Idle from "@/assets/sprites2/p4-idle.png";
import p4Walk from "@/assets/sprites2/p4-walk.png";
import p4Death from "@/assets/sprites2/p4-death.png";

/* ---- props & fx ---- */
import gunPistolPng from "@/assets/sprites/gun-pistol.png";
import gunRiflePng from "@/assets/sprites/gun-rifle.png";
import gunShotgunPng from "@/assets/sprites/gun-shotgun.png";
import muzzlePng from "@/assets/sprites/muzzle.png";
import bulletPng from "@/assets/sprites/bullet.png";
import crosshairPng from "@/assets/sprites2/crosshair.png";
import rock1Png from "@/assets/sprites/rockt1.png";
import rock2Png from "@/assets/sprites/rockt2.png";
import rock3Png from "@/assets/sprites/rockt3.png";

/* ---- extra gun sprites from community packs ---- */
import gp1 from "@/assets/sprites/guns/gun1.png";
import gp5 from "@/assets/sprites/guns/gun5.png";
import gp10 from "@/assets/sprites/guns/gun10.png";
import gp15 from "@/assets/sprites/guns/gun15.png";
import gp20 from "@/assets/sprites/guns/gun20.png";
import gp25 from "@/assets/sprites/guns/gun25.png";
import gp30 from "@/assets/sprites/guns/gun30.png";
import gp35 from "@/assets/sprites/guns/gun35.png";
import gp40 from "@/assets/sprites/guns/gun40.png";
import gp45 from "@/assets/sprites/guns/gun45.png";
import gpistol2 from "@/assets/sprites/guns/pistol2.png";
import gshotgun2 from "@/assets/sprites/guns/shotgun2.png";
import gsniper2 from "@/assets/sprites/guns/sniper2.png";
import gminigun2 from "@/assets/sprites/guns/minigun2.png";
import guzi2 from "@/assets/sprites/guns/uzi2.png";
import gRAR from "@/assets/sprites/guns/ranitaya_ar.png";
import gRSG from "@/assets/sprites/guns/ranitaya_shotgun.png";
import gRSN from "@/assets/sprites/guns/ranitaya_sniper.png";
import gRMG from "@/assets/sprites/guns/ranitaya_mg.png";
import gRPI from "@/assets/sprites/guns/ranitaya_pistol.png";
import gRRV from "@/assets/sprites/guns/ranitaya_revolver.png";
import gRSM from "@/assets/sprites/guns/ranitaya_smg.png";
import gREX from "@/assets/sprites/guns/ranitaya_explosive.png";
import gRAR2 from "@/assets/sprites/guns/ranitaya_ar2.png";
import gREX2 from "@/assets/sprites/guns/ranitaya_explosive2.png";
import gRRV2 from "@/assets/sprites/guns/ranitaya_revolver2.png";
import gRSM2 from "@/assets/sprites/guns/ranitaya_smg2.png";
import gRSN2 from "@/assets/sprites/guns/ranitaya_sniper2.png";
import gRSG2 from "@/assets/sprites/guns/ranitaya_shotgun2.png";
import gRMG2 from "@/assets/sprites/guns/ranitaya_mg2.png";
import gRPI2 from "@/assets/sprites/guns/ranitaya_pistol2.png";
import gaAR2 from "@/assets/sprites/guns/ga_ar2.png";
import gaRV2 from "@/assets/sprites/guns/ga_revolver2.png";
import gaSG2 from "@/assets/sprites/guns/ga_shotgun2.png";
import gaPI3 from "@/assets/sprites/guns/ga_pistol3.png";
import grev2 from "@/assets/sprites/guns/revolver2.png";
import gsub2 from "@/assets/sprites/guns/subfusile2.png";

export interface Strip {
  img: HTMLImageElement;
  frames: number;
}

export type AnimKey = "idle" | "walk" | "death";

export type ActorKey = CritterEnemyKey;

/** Hand-written sprite keys used directly by the renderer. */
export type CoreSingleKey =
  | "gun"
  | "gunRifle"
  | "gunPistol"
  | "gunShotgun"
  | "muzzle"
  | "bullet"
  | "crosshair"
  | "rock1"
  | "rock2"
  | "rock3";

/** Pack art registers extra keys dynamically (see PACK_SRC). */
export type SingleKey = CoreSingleKey | (string & {});

export type Singles = Record<CoreSingleKey, HTMLImageElement> &
  Record<string, HTMLImageElement | undefined>;

export interface Sprites {
  strips: Record<ActorKey, Record<AnimKey, Strip>>;
  playerSkins: Record<CharacterKey, Record<AnimKey, Strip>>;
  singles: Singles;
}

const IDLE_FRAMES = 6;
const WALK_FRAMES = 8;
const DEATH_FRAMES = 10;

/** [idle, walk, death] source urls per actor. Images are only created client-side. */


const ACTOR_KEYS: ActorKey[] = CRITTER_ENEMIES.map((d) => d.key) as ActorKey[];

function proceduralActorSrc(key: ActorKey): [string, string, string] {
  const design = CRITTER_MAP[key];
  return design ? critterSrc(design) : ["", "", ""];
}

/** Hand-drawn strips when the enemy has art; procedural critter renderer otherwise. */
async function actorSrc(key: ActorKey): Promise<[string, string, string]> {
  const art = ENEMY_ART[key];
  if (art) return art;
  return proceduralActorSrc(key);

}



const PLAYER_STATIC: Partial<Record<CharacterKey, [string, string, string]>> = {
  spike: [pIdle, pWalk, pDeath],
  punk: [p2Idle, p2Walk, p2Death],
  crown: [p4Idle, p4Walk, p4Death],
  bald: [p3Idle, p3Walk, p3Death],
};

const PLAYER_KEYS: CharacterKey[] = [
  "spike",
  "punk",
  "crown",
  "bald",
];

/** Unlockable heroes are drawn procedurally in the same chibi style. */
function playerSrc(key: CharacterKey): [string, string, string] {
  const stat = PLAYER_STATIC[key];
  if (stat) return stat;
  const design = CRITTER_MAP[key];
  return design ? critterSrc(design) : ["", "", ""];
}


/** Every gun / melee png shipped in the art packs, keyed by file name. */
const PACK_MODULES = {
  ...import.meta.glob<{ default: string }>("@/assets/sprites/guns/*.png", { eager: true }),
  ...import.meta.glob<{ default: string }>("@/assets/sprites/melee/*.png", { eager: true }),
} as Record<string, { default: string }>;

export const PACK_SRC: Record<string, string> = Object.fromEntries(
  Object.entries(PACK_MODULES).map(([path, mod]) => [
    path.split("/").pop()!.replace(/\.png$/, ""),
    mod.default,
  ]),
);

/** Sorted list of every pack weapon sprite key — used to build the armoury. */
export const PACK_KEYS: string[] = Object.keys(PACK_SRC).sort();

export const SINGLE_SRC: Record<string, string> = {
  ...PACK_SRC,
  gun: gunRiflePng,
  gunRifle: gunRiflePng,
  gunPistol: gunPistolPng,
  gunShotgun: gunShotgunPng,
  muzzle: muzzlePng,
  bullet: bulletPng,
  crosshair: crosshairPng,
  rock1: rock1Png,
  rock2: rock2Png,
  rock3: rock3Png,
  gp1, gp5, gp10, gp15, gp20, gp25, gp30, gp35, gp40, gp45,
  gpistol2, gshotgun2, gsniper2, gminigun2, guzi2,
  gRAR, gRSG, gRSN, gRMG, gRPI, gRRV, gRSM, gREX,
  gRAR2, gREX2, gRRV2, gRSM2, gRSN2, gRSG2, gRMG2, gRPI2,
  gaAR2, gaRV2, gaSG2, gaPI3, grev2, gsub2,
};


export const PLAYER_CHARACTERS: { key: CharacterKey; portrait: string; frames: number }[] =
  PLAYER_KEYS.map((key) => ({
    key,
    get portrait() {
      return playerSrc(key)[0];
    },
    frames: IDLE_FRAMES,
  }));


function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

async function loadAnims(src: [string, string, string]): Promise<Record<AnimKey, Strip>> {
  const [idle, walk, death] = await Promise.all(src.map(loadImage));
  return {
    idle: { img: idle!, frames: IDLE_FRAMES },
    walk: { img: walk!, frames: WALK_FRAMES },
    death: { img: death!, frames: DEATH_FRAMES },
  };
}

let cache: Sprites | null = null;
let inflight: Promise<Sprites> | null = null;

export function loadSprites(): Promise<Sprites> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = (async () => {
    const actorKeys = ACTOR_KEYS;
    const playerKeys = PLAYER_KEYS;
    const singleKeys = Object.keys(SINGLE_SRC) as SingleKey[];

    const [actorAnims, playerAnims, singleImgs] = await Promise.all([
      Promise.all(actorKeys.map(async (k) => loadAnims(await actorSrc(k)))),
      Promise.all(playerKeys.map((k) => loadAnims(playerSrc(k)))),
      Promise.all(singleKeys.map((k) => loadImage(SINGLE_SRC[k] ?? ""))),
    ]);


    const strips = Object.fromEntries(
      actorKeys.map((k, i) => [k, actorAnims[i]!]),
    ) as Record<ActorKey, Record<AnimKey, Strip>>;
    const playerSkins = Object.fromEntries(
      playerKeys.map((k, i) => [k, playerAnims[i]!]),
    ) as Record<CharacterKey, Record<AnimKey, Strip>>;
    const singles = Object.fromEntries(
      singleKeys.map((k, i) => [k, singleImgs[i]!]),
    ) as Singles;

    cache = { strips, playerSkins, singles };
    return cache;
  })();
  return inflight;
}

