// ===============================
// 6. FUNÇÕES DE CÁLCULO (ECONOMIA)
// ===============================

import { state } from "../core/state.js";

import {
  SHARD_MULTIPLIER_STEP,
  SHARD_REWARD_STEP,
  MERGE_REQUIREMENT_MULTIPLIER,
} from "../core/config.js";

import {
  getExtraShardReward,
  getGoldenMultiplier,
  getPolygonBoostMultiplier,
} from "./specialUpgrades.js";

export function getShardMultiplier() {
  return 1 + state.shards * SHARD_MULTIPLIER_STEP;
}

export function getShardsReward() {
  const baseReward = (state.playerLevel - 1) * SHARD_REWARD_STEP;
  const extraReward = getExtraShardReward();

  return Math.floor(baseReward + extraReward);
}

export function getNextMergeRequirement() {
  return Math.ceil(state.mergesNeeded * MERGE_REQUIREMENT_MULTIPLIER);
}

export function getBaseItemValue(level) {
  return Math.pow(3, level - 1);
}

export function getItemPotentialValue(item) {
  const goldenMultiplier = item.isGolden ? getGoldenMultiplier() : 1;

  return (
    getBaseItemValue(item.level) *
    goldenMultiplier *
    getShardMultiplier() *
    getPolygonBoostMultiplier()
  );
}

export function getTotalIncomePreview() {
  return state.items.reduce(
    (total, item) => total + getItemPotentialValue(item),
    0,
  );
}
