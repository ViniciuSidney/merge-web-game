// ===============================
// 6. FUNÇÕES DE CÁLCULO (ECONOMIA)
// ===============================

import { state } from './state.js';

import {
   SHARD_MULTIPLIER_STEP,
   SHARD_REWARD_STEP,
   MERGE_REQUIREMENT_MULTIPLIER,
} from './config.js';

export function getShardMultiplier() {
   return 1 + state.shards * SHARD_MULTIPLIER_STEP;
}

export function getShardsReward() {
   return (state.playerLevel - 1) * SHARD_REWARD_STEP;
}

export function getNextMergeRequirement() {
   return Math.ceil(state.mergesNeeded * MERGE_REQUIREMENT_MULTIPLIER);
}

export function getBaseItemValue(level) {
   return Math.pow(3, level - 1);
}

export function getItemPotentialValue(item) {
   return (
      getBaseItemValue(item.level) *
      (item.isGolden ? 2 : 1) *
      getShardMultiplier()
   );
}

export function getTotalIncomePreview() {
   return state.items.reduce(
      (total, item) => total + getItemPotentialValue(item),
      0,
   );
}
