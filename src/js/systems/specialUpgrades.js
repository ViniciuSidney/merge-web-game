import { SPECIAL_UPGRADES } from '../config/specialUpgradeConfig.js';
import { state } from '../core/state.js';

export function getSpecialUpgradeLevel(key) {
   return state.specialUpgrades[key] ?? 0;
}

export function getSpecialUpgradeCost(key) {
   const upgrade = SPECIAL_UPGRADES[key];
   const level = getSpecialUpgradeLevel(key);

   if (!upgrade) return 0;

   return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
}

export function isSpecialUpgradeMaxed(key) {
   const upgrade = SPECIAL_UPGRADES[key];
   const level = getSpecialUpgradeLevel(key);

   if (!upgrade.maxLevel) return false;

   return level >= upgrade.maxLevel;
}

export function getPolygonBoostMultiplier() {
   const level = getSpecialUpgradeLevel('polygonBoost');
   const effect = SPECIAL_UPGRADES.polygonBoost.effectPerLevel;

   return 1 + level * effect;
}

export function getExtraShardReward() {
   const level = getSpecialUpgradeLevel('shardRewardBoost');
   const effect = SPECIAL_UPGRADES.shardRewardBoost.effectPerLevel;

   return level * effect;
}

export function getGoldenMultiplier() {
   const level = getSpecialUpgradeLevel('goldenPower');
   const effect = SPECIAL_UPGRADES.goldenPower.effectPerLevel;

   return 2 + level * effect;
}