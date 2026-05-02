// ===============================
// UI — INTERFACE E RENDERIZAÇÃO
// ===============================

import { GRID_SIZE } from './core/config.js';
import {
   DEV_ADD_SMALL_MONEY,
   DEV_ADD_BIG_MONEY,
   DEV_ADD_SMALL_SHARDS,
   DEV_ADD_BIG_SHARDS,
} from './core/config.js';

import { TEXTS } from './core/texts.js';
import { state } from './core/state.js';

import { formatNumber, formatMoney, formatShards } from './format.js';

import {
   upgrades,
   getUpgradeCost,
   getSpawnTime,
   getStartLevel,
   getDoubleSpawnChance,
   getDoubleMoneyChance,
   getGoldenChance,
} from './upgrades.js';

import { getShardMultiplier, getTotalIncomePreview } from './economy.js';

// ===============================
// 1. PAINEL PRINCIPAL
// ===============================

export function updateTopPanel({ moneyEl, incomeEl, shardsEl }) {
   moneyEl.textContent = formatMoney(state.money);
   incomeEl.textContent = `${formatMoney(getTotalIncomePreview())}/s`;
   shardsEl.textContent = formatShards(state.shards);
}

// ===============================
// 2. ESTATÍSTICAS
// ===============================

export function updateStatsPanel({
   spawnTimeStat,
   startLevelStat,
   doubleSpawnStat,
   doubleMoneyStat,
   goldenChanceStat,
   multiplierStat,
   itemsStat,
   levelStat,
}) {
   spawnTimeStat.textContent = TEXTS.stats.spawnTime(getSpawnTime() / 1000);
   startLevelStat.textContent = TEXTS.stats.startLevel(getStartLevel());
   doubleSpawnStat.textContent = TEXTS.stats.chance(getDoubleSpawnChance());
   doubleMoneyStat.textContent = TEXTS.stats.chance(getDoubleMoneyChance());
   goldenChanceStat.textContent = TEXTS.stats.chance(getGoldenChance());
   multiplierStat.textContent = TEXTS.stats.multiplier(getShardMultiplier());
   itemsStat.textContent = TEXTS.stats.items(state.items.length, GRID_SIZE);
   levelStat.textContent = state.playerLevel;
}

// ===============================
// 3. LEVEL E PROGRESSO
// ===============================

export function updateLevelPanel({
   playerLevelEl,
   levelProgressText,
   levelProgressFill,
   levelBonusText,
}) {
   playerLevelEl.textContent = state.playerLevel;

   levelProgressText.textContent = TEXTS.level.progress(
      state.mergeProgress,
      state.mergesNeeded,
   );

   levelProgressFill.style.width = `${Math.min(
      100,
      (state.mergeProgress / state.mergesNeeded) * 100,
   )}%`;

   levelBonusText.innerHTML = TEXTS.level.shardMultiplier(getShardMultiplier());
}

// ===============================
// 4. LOJA / MELHORIAS
// ===============================

export function updateShopBalance({ shopMoney }) {
   shopMoney.innerHTML = TEXTS.shop.balance(
      formatMoney(state.money),
      formatShards(state.shards),
   );
}

export function getUpgradeEffectText(key) {
   if (key === 'spawnSpeed') {
      return `${(getSpawnTime() / 1000).toFixed(1)}s/2.0s`;
   }

   if (key === 'startLevel') {
      return `Lv ${getStartLevel()}`;
   }

   if (key === 'doubleSpawn') {
      return `${Math.round(getDoubleSpawnChance() * 100)}%/50%`;
   }

   if (key === 'doubleMoney') {
      return `${Math.round(getDoubleMoneyChance() * 100)}%/50%`;
   }

   if (key === 'goldenChance') {
      return `${Math.round(getGoldenChance() * 100)}%/50%`;
   }

   return '';
}

export function renderUpgrades({ upgradesEl, onBuyUpgrade }) {
   upgradesEl.innerHTML = '';

   Object.entries(upgrades).forEach(([key, upgrade]) => {
      const cost = getUpgradeCost(key);
      const card = document.createElement('div');

      card.className = `upgrade ${upgrade.golden ? 'goldenUpgrade' : ''}`;

      card.innerHTML = `
         <div class="upgradeTop">
            <h3>${upgrade.name}</h3>

            <div class="upgradeInfo">
               <span class="upgradeEffectCompact">[${getUpgradeEffectText(key)}]</span>
               <span class="upgradeLevel">${TEXTS.shop.level(upgrade.level)}</span>
            </div>
         </div>

         <p>${upgrade.description}</p>

         <button ${state.money < cost ? 'disabled' : ''}>
            ${TEXTS.shop.buyButton(formatMoney(cost))}
         </button>
      `;

      card
         .querySelector('button')
         .addEventListener('click', () => onBuyUpgrade(key));

      upgradesEl.appendChild(card);
   });
}

// ===============================
// 5. DEV TOOLS — TEXTOS DINÂMICOS
// ===============================

export function updateDevButtons({
   devAddPolygonsSmall,
   devAddPolygonsBig,
   devAddShardsSmall,
   devAddShardsBig,
}) {
   devAddPolygonsSmall.textContent = TEXTS.dev.addPolygonsSmall(
      formatNumber(DEV_ADD_SMALL_MONEY),
   );

   devAddPolygonsBig.textContent = TEXTS.dev.addPolygonsBig(
      formatNumber(DEV_ADD_BIG_MONEY),
   );

   devAddShardsSmall.textContent = TEXTS.dev.addShardsSmall(
      formatNumber(DEV_ADD_SMALL_SHARDS),
   );

   devAddShardsBig.textContent = TEXTS.dev.addShardsBig(
      formatNumber(DEV_ADD_BIG_SHARDS),
   );
}

// ===============================
// 6. ATUALIZAÇÃO GERAL
// ===============================

export function updateUI({
   moneyEl,
   incomeEl,
   shardsEl,

   shopMoney,
   upgradesEl,
   onBuyUpgrade,

   spawnTimeStat,
   startLevelStat,
   doubleSpawnStat,
   doubleMoneyStat,
   goldenChanceStat,
   multiplierStat,
   itemsStat,
   levelStat,

   playerLevelEl,
   levelProgressText,
   levelProgressFill,
   levelBonusText,

   devAddPolygonsSmall,
   devAddPolygonsBig,
   devAddShardsSmall,
   devAddShardsBig,
}) {
   updateTopPanel({
      moneyEl,
      incomeEl,
      shardsEl,
   });

   updateShopBalance({
      shopMoney,
   });

   updateStatsPanel({
      spawnTimeStat,
      startLevelStat,
      doubleSpawnStat,
      doubleMoneyStat,
      goldenChanceStat,
      multiplierStat,
      itemsStat,
      levelStat,
   });

   updateLevelPanel({
      playerLevelEl,
      levelProgressText,
      levelProgressFill,
      levelBonusText,
   });

   updateDevButtons({
      devAddPolygonsSmall,
      devAddPolygonsBig,
      devAddShardsSmall,
      devAddShardsBig,
   });

   renderUpgrades({
      upgradesEl,
      onBuyUpgrade,
   });
}
