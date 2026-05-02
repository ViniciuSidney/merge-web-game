// ===============================
// 12. INTERFACE E RENDERIZAÇÃO (UPGRADES)
// ===============================

import { UPGRADE_CONFIGS } from './upgradeConfig.js';

import { BASE_SPAWN_TIME, MAX_CHANCE, UPGRADE_CHANCE_STEP } from './config.js';

export const upgrades = createInitialUpgrades();

export function createInitialUpgrades() {
   return Object.fromEntries(
      Object.entries(UPGRADE_CONFIGS).map(([key, config]) => [
         key,
         {
            ...config,
            level: 0,
         },
      ]),
   );
}

export function resetUpgrades() {
   Object.values(upgrades).forEach((upgrade) => {
      upgrade.level = 0;
   });
}

export function increaseUpgradeLevel(key, amount = 1) {
   if (!upgrades[key]) return;

   upgrades[key].level += amount;
}

export function setAllUpgradesLevel(level) {
   Object.values(upgrades).forEach((upgrade) => {
      upgrade.level = level;
   });
}

export function getUpgradeCost(key) {
   const upgrade = upgrades[key];
   let cost = upgrade.baseCost;

   const baseMultiplier = upgrade.multiplier ?? 2;
   const tenMultiplier = upgrade.tenMultiplier ?? 4;

   for (let i = 1; i <= upgrade.level; i++) {
      if (!upgrade.noTenMultiplier && i % 10 === 0) {
         cost *= tenMultiplier;
      } else {
         cost *= baseMultiplier;
      }
   }

   return Math.floor(cost);
}

export function getSpawnTime() {
   const reduction = upgrades.spawnSpeed.level * 100;
   return Math.max(2000, BASE_SPAWN_TIME - reduction);
}

export function getStartLevel() {
   return 1 + upgrades.startLevel.level;
}

export function getDoubleSpawnChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.doubleSpawn.level * UPGRADE_CHANCE_STEP,
   );
}

export function getDoubleMoneyChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.doubleMoney.level * UPGRADE_CHANCE_STEP,
   );
}

export function getGoldenChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.goldenChance.level * UPGRADE_CHANCE_STEP,
   );
}

export function setSpawnSpeedToMinimum() {
   const neededLevel = Math.ceil((BASE_SPAWN_TIME - 2000) / 100);

   upgrades.spawnSpeed.level = Math.max(upgrades.spawnSpeed.level, neededLevel);
}
