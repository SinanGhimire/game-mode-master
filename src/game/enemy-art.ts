import type { CritterEnemyKey } from "./critters";

/**
 * Hand-drawn enemy artwork.
 *
 * Each entry points at three ready-made horizontal sprite strips that already
 * match the engine's frame budget (idle 6, walk 8, death 10), so they are fed
 * straight to the renderer instead of being puppet-animated from a still.
 */

import skelWhiteIdle from "@/assets/foes/skel_white-idle.png";
import skelWhiteWalk from "@/assets/foes/skel_white-walk.png";
import skelWhiteDeath from "@/assets/foes/skel_white-death.png";
import skelGoldIdle from "@/assets/foes/skel_gold-idle.png";
import skelGoldWalk from "@/assets/foes/skel_gold-walk.png";
import skelGoldDeath from "@/assets/foes/skel_gold-death.png";
import demonIdle from "@/assets/foes/demon-idle.png";
import demonWalk from "@/assets/foes/demon-walk.png";
import demonDeath from "@/assets/foes/demon-death.png";
import golemBlueIdle from "@/assets/foes/golem_blue-idle.png";
import golemBlueWalk from "@/assets/foes/golem_blue-walk.png";
import golemBlueDeath from "@/assets/foes/golem_blue-death.png";
import golemEmberIdle from "@/assets/foes/golem_ember-idle.png";
import golemEmberWalk from "@/assets/foes/golem_ember-walk.png";
import golemEmberDeath from "@/assets/foes/golem_ember-death.png";
import golemArmorIdle from "@/assets/foes/golem_armor-idle.png";
import golemArmorWalk from "@/assets/foes/golem_armor-walk.png";
import golemArmorDeath from "@/assets/foes/golem_armor-death.png";

import mushroomIdle from "@/assets/foes/mushroom-idle.png";
import mushroomWalk from "@/assets/foes/mushroom-walk.png";
import mushroomDeath from "@/assets/foes/mushroom-death.png";
import bringerIdle from "@/assets/foes/bringer-idle.png";
import bringerWalk from "@/assets/foes/bringer-walk.png";
import bringerDeath from "@/assets/foes/bringer-death.png";

import impVioletIdle from "@/assets/foes/imp_violet-idle.png";
import impVioletWalk from "@/assets/foes/imp_violet-walk.png";
import impVioletDeath from "@/assets/foes/imp_violet-death.png";
import impBileIdle from "@/assets/foes/imp_bile-idle.png";
import impBileWalk from "@/assets/foes/imp_bile-walk.png";
import impBileDeath from "@/assets/foes/imp_bile-death.png";
import impCrimsonIdle from "@/assets/foes/imp_crimson-idle.png";
import impCrimsonWalk from "@/assets/foes/imp_crimson-walk.png";
import impCrimsonDeath from "@/assets/foes/imp_crimson-death.png";
import gnatIdle from "@/assets/foes/gnat-idle.png";
import gnatWalk from "@/assets/foes/gnat-walk.png";
import gnatDeath from "@/assets/foes/gnat-death.png";

import batIdle from "@/assets/foes/bat-idle.png";
import batWalk from "@/assets/foes/bat-walk.png";
import batDeath from "@/assets/foes/bat-death.png";
import wizardIdle from "@/assets/foes/wizard-idle.png";
import wizardWalk from "@/assets/foes/wizard-walk.png";
import wizardDeath from "@/assets/foes/wizard-death.png";
import golluxIdle from "@/assets/foes/gollux-idle.png";
import golluxWalk from "@/assets/foes/gollux-walk.png";
import golluxDeath from "@/assets/foes/gollux-death.png";
import slimeBossIdle from "@/assets/foes/slime_boss-idle.png";
import slimeBossWalk from "@/assets/foes/slime_boss-walk.png";
import slimeBossDeath from "@/assets/foes/slime_boss-death.png";

/** [idle, walk, death] strip urls. */
export type ArtStrips = [string, string, string];

export const ENEMY_ART: Partial<Record<CritterEnemyKey, ArtStrips>> = {
  e_skel_white: [skelWhiteIdle, skelWhiteWalk, skelWhiteDeath],
  e_skel_gold: [skelGoldIdle, skelGoldWalk, skelGoldDeath],
  e_golem_blue: [golemBlueIdle, golemBlueWalk, golemBlueDeath],
  e_golem_ember: [golemEmberIdle, golemEmberWalk, golemEmberDeath],
  e_golem_armor: [golemArmorIdle, golemArmorWalk, golemArmorDeath],
  e_imp_violet: [impVioletIdle, impVioletWalk, impVioletDeath],
  e_imp_bile: [impBileIdle, impBileWalk, impBileDeath],
  e_imp_crimson: [impCrimsonIdle, impCrimsonWalk, impCrimsonDeath],
  e_gnat: [gnatIdle, gnatWalk, gnatDeath],
  e_mushroom: [mushroomIdle, mushroomWalk, mushroomDeath],
  e_bringer: [bringerIdle, bringerWalk, bringerDeath],
  e_bat: [batIdle, batWalk, batDeath],
  e_wizard: [wizardIdle, wizardWalk, wizardDeath],
  e_gollux: [golluxIdle, golluxWalk, golluxDeath],
};
