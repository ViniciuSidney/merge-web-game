// ===============================
// 1. ELEMENTOS DO DOM
// ===============================

const grid = document.getElementById('grid');
const moneyEl = document.getElementById('money');
const incomeEl = document.getElementById('income');
const shardsEl = document.getElementById('shards');
const saveStatus = document.getElementById('saveStatus');
const openShopBtn = document.getElementById('openShopBtn');
const closeShopBtn = document.getElementById('closeShopBtn');
const shop = document.getElementById('shop');
const shopOverlay = document.getElementById('shopOverlay');
const shopMoney = document.getElementById('shopMoney');
const upgradesEl = document.getElementById('upgrades');
const spawnTimeStat = document.getElementById('spawnTimeStat');
const startLevelStat = document.getElementById('startLevelStat');
const doubleSpawnStat = document.getElementById('doubleSpawnStat');
const doubleMoneyStat = document.getElementById('doubleMoneyStat');
const goldenChanceStat = document.getElementById('goldenChanceStat');
const multiplierStat = document.getElementById('multiplierStat');
const itemsStat = document.getElementById('itemsStat');
const levelStat = document.getElementById('levelStat');
const spawnProgressText = document.getElementById('spawnProgressText');
const spawnProgressFill = document.getElementById('spawnProgressFill');
const playerLevelEl = document.getElementById('playerLevel');
const levelProgressText = document.getElementById('levelProgressText');
const levelProgressFill = document.getElementById('levelProgressFill');
const levelBonusText = document.getElementById('levelBonusText');
const levelUpPopup = document.getElementById('levelUpPopup');
const spawnPopup = document.getElementById('spawnPopup');

const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsTabs = document.querySelectorAll('.settingsTab');
const settingsContents = document.querySelectorAll('.settingsContent');
const resetInsideBtn = document.getElementById('resetInsideBtn');

const devAddPolygonsSmall = document.getElementById('devAddPolygonsSmall');
const devAddPolygonsBig = document.getElementById('devAddPolygonsBig');
const devAddShardsSmall = document.getElementById('devAddShardsSmall');
const devAddShardsBig = document.getElementById('devAddShardsBig');
const devSpawnOne = document.getElementById('devSpawnOne');
const devSpawnGolden = document.getElementById('devSpawnGolden');
const devFillGrid = document.getElementById('devFillGrid');
const devClearGrid = document.getElementById('devClearGrid');
const devMaxSpawnSpeed = document.getElementById('devMaxSpawnSpeed');
const devLevelUpForm = document.getElementById('devLevelUpForm');
const devResetUpgrades = document.getElementById('devResetUpgrades');
const devAllUpgrades5 = document.getElementById('devAllUpgrades5');
const devAddMerge = document.getElementById('devAddMerge');
const devForceLevelUp = document.getElementById('devForceLevelUp');
const devPasswordInput = document.getElementById('devPasswordInput');
const devLoginBtn = document.getElementById('devLoginBtn');
const devErrorText = document.getElementById('devErrorText');
const devLoginSection = document.getElementById('devLoginSection');
const devContent = document.getElementById('devContent');

// ===============================
// 2. CONSTANTES E CONFIGURAÇÕES BASE
// ===============================

import {
   GRID_SIZE,
   BASE_SPAWN_TIME,
   SPAWN_TICK_RATE,
   DEV_PASSWORD,
   MAX_CHANCE,
   UPGRADE_CHANCE_STEP,
   SHARD_MULTIPLIER_STEP,
   SHARD_REWARD_STEP,
   MERGE_REWARD_MULTIPLIER,
   MERGE_REQUIREMENT_MULTIPLIER,
   MONEY_TICK_INTERVAL,
   SAVE_FEEDBACK_DURATION,
   LEVEL_UP_FEEDBACK_DURATION,
   RING_REMOVE_DELAY,
   ERROR_EFFECT_DURATION,
   MONEY_POPUP_DURATION,
   DEV_ADD_SMALL_MONEY,
   DEV_ADD_BIG_MONEY,
   DEV_ADD_SMALL_SHARDS,
   DEV_ADD_BIG_SHARDS,
   LEVEL_COLORS,
   NUMBER_SUFFIXES,
} from './config.js';

// ===============================
// 2.1 TEXTOS DO JOGO
// ===============================

import { TEXTS } from './texts.js';

// ===============================
// 3. ESTADO DO JOGO
// ===============================

import { state } from './state.js';

// ===============================
// 4. CONFIGURAÇÕES DE UPGRADES
// ===============================

import { UPGRADE_CONFIGS } from './upgradeConfig.js';

import {
   upgrades,
   resetUpgrades,
   increaseUpgradeLevel,
   setAllUpgradesLevel,
   getUpgradeCost,
   getSpawnTime,
   getStartLevel,
   getDoubleSpawnChance,
   getDoubleMoneyChance,
   getGoldenChance,
   setSpawnSpeedToMinimum,
} from './upgrades.js';

// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

import {
   formatNumber,
   formatMoney,
   formatShards,
   getCycleRoman,
} from './format.js';

// ===============================
// 6. FUNÇÕES DE CÁLCULO
// ===============================

import {
   getShardMultiplier,
   getShardsReward,
   getNextMergeRequirement,
   getBaseItemValue,
   getItemPotentialValue,
   getTotalIncomePreview,
} from './economy.js';

// ===============================
// 7. GRID E ITENS
// ===============================

import {
   createGrid,
   createItem,
   clearAllItems,
   upgradeOldItemsToStartLevel,
   updateItemElement,
   getFreeCells,
   isGridFull,
   getItemByCellIndex,
   getItemByExactCell,
} from './grid.js';

// ===============================
// 8. SPAWN
// ===============================

import {
   updateSpawnProgressBar,
   updateSpawnBarVisual,
   showSpawnPopup,
   applySpawnSpeedUpgrade,
   restartSpawnTimer,
} from './spawn.js';

function getSpawnContext() {
   return {
      spawnProgressText,
      spawnProgressFill,
      spawnPopupElement: spawnPopup,
      onItemCreated: addDragEvents,
      onUpdateUI: updateUI,
   };
}

// ===============================
// 9. DRAG AND DROP
// ===============================

import {
   addDragEvents,
   moveDraggedItem,
   getCellUnderPointer,
   clearHighlights,
   returnToOriginalCell,
   moveItemToCell,
   clearDraggedItem,
} from './drag.js';

// ===============================
// 10. EFEITOS VISUAIS
// ===============================

import {
   getElementCenter,
   createRing,
   flashError,
   showLevelUpPopup,
   shouldShowMoneyPopup,
   createMoneyPopup,
} from './effects.js';

// ===============================
// 11. MERGE, LEVEL E ECONOMIA
// ===============================

function mergeItems(targetItem) {
   const newLevel = state.draggedItem.level + 1;
   const targetCellIndex = targetItem.cellIndex;
   const newIsGolden = state.draggedItem.isGolden || targetItem.isGolden;
   const center = getElementCenter(targetItem.element);

   state.draggedItem.element.remove();
   targetItem.element.remove();
   state.items = state.items.filter(
      (item) => item !== state.draggedItem && item !== targetItem,
   );

   state.draggedItem = null;
   createItem({
      level: newLevel,
      cellIndex: targetCellIndex,
      forcedGolden: newIsGolden,
      onCreated: addDragEvents,
   });

   const newItem = getItemByExactCell(targetCellIndex);
   if (newItem) newItem.element.classList.add('mergeBurst');
   createRing(center.x, center.y, 'merge');

   state.money +=
      getBaseItemValue(newLevel) *
      (newIsGolden ? 2 : 1) *
      MERGE_REWARD_MULTIPLIER *
      getShardMultiplier();
   addMergeProgress();
   updateUI();
   saveGame();
}

function addMergeProgress() {
   state.mergeProgress++;

   if (state.mergeProgress >= state.mergesNeeded) {
      state.mergeProgress -= state.mergesNeeded;

      const oldLevel = state.playerLevel;
      state.playerLevel++;

      const reward = getShardsReward();
      state.shards += reward;

      showLevelUpPopup(levelUpPopup, oldLevel, state.playerLevel, reward);

      state.mergesNeeded = getNextMergeRequirement();

      clearTimeout(state.saveTextTimer);
      saveStatus.textContent = TEXTS.level.status(reward);

      state.saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = TEXTS.save.autoActive;
      }, LEVEL_UP_FEEDBACK_DURATION);
   }

   updateUI();
   saveGame({
      showText: true,
      saveStatus,
   });
}

function incomeTick() {
   state.items.forEach((item) => {
      const base = getBaseItemValue(item.level);
      const goldenMultiplier = item.isGolden ? 2 : 1;
      const isDoubleTick = Math.random() < getDoubleMoneyChance();
      const tickMultiplier = isDoubleTick ? 2 : 1;
      const gained =
         base * goldenMultiplier * tickMultiplier * getShardMultiplier();

      state.money += gained;

      if (shouldShowMoneyPopup(isDoubleTick, item)) {
         createMoneyPopup(item, gained, isDoubleTick);
      }
   });

   updateUI();
   saveGame();
}

// ===============================
// 12. INTERFACE E RENDERIZAÇÃO
// ===============================

function updateUI() {
   moneyEl.textContent = formatMoney(state.money);
   incomeEl.textContent = `${formatMoney(getTotalIncomePreview())}/s`;
   shardsEl.textContent = formatShards(state.shards);
   shopMoney.innerHTML = TEXTS.shop.balance(
      formatMoney(state.money),
      formatShards(state.shards),
   );
   spawnTimeStat.textContent = TEXTS.stats.spawnTime(getSpawnTime() / 1000);
   startLevelStat.textContent = TEXTS.stats.startLevel(getStartLevel());
   doubleSpawnStat.textContent = TEXTS.stats.chance(getDoubleSpawnChance());
   doubleMoneyStat.textContent = TEXTS.stats.chance(getDoubleMoneyChance());
   goldenChanceStat.textContent = TEXTS.stats.chance(getGoldenChance());
   multiplierStat.textContent = TEXTS.stats.multiplier(getShardMultiplier());
   itemsStat.textContent = TEXTS.stats.items(state.items.length, GRID_SIZE);
   levelStat.textContent = state.playerLevel;
   playerLevelEl.textContent = state.playerLevel;
   levelProgressText.textContent = TEXTS.level.progress(
      state.mergeProgress,
      state.mergesNeeded,
   );
   levelProgressFill.style.width = `${Math.min(100, (state.mergeProgress / state.mergesNeeded) * 100)}%`;
   levelBonusText.innerHTML = TEXTS.level.shardMultiplier(getShardMultiplier());
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
   renderUpgrades();
}

function getUpgradeEffectText(key) {
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

function renderUpgrades() {
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
         .addEventListener('click', () => buyUpgrade(key));
      upgradesEl.appendChild(card);
   });
}

function buyUpgrade(key) {
   const cost = getUpgradeCost(key);
   if (state.money < cost) return;

   state.money -= cost;
   increaseUpgradeLevel(key);

   if (key === 'spawnSpeed') applySpawnSpeedUpgrade(getSpawnContext());

   if (key === 'startLevel') {
      const oldStartLevel = getStartLevel() - 1;

      upgradeOldItemsToStartLevel({
         onChanged: () => {
            updateUI();
            saveGame({
               showText: true,
               saveStatus,
            });
         },
      });

      showSpawnPopup(
         spawnPopup,
         TEXTS.spawn.upgradedForms(oldStartLevel, getStartLevel()),
         'upgrade',
      );
   }

   updateUI();
   saveGame({
      showText: true,
      saveStatus,
   });
}

// ===============================
// 13. SALVAMENTO
// ===============================

import { saveGame, loadGame, clearSave } from './save.js';

function resetGame() {
   state.money = 0;
   state.shards = 0;
   state.playerLevel = 1;
   state.mergeProgress = 0;
   state.mergesNeeded = 5;

   state.items.forEach((item) => item.element.remove());
   state.items = [];

   resetUpgrades();
   clearSave();

   resetUpgrades();
   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: addDragEvents,
   });
   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: addDragEvents,
   });
   restartSpawnTimer(getSpawnContext());
   updateUI();

   saveGame({
      showText: true,
      saveStatus,
   });
}

// ===============================
// 14. DEV TOOLS
// ===============================

function unlockDevTools() {
   const typedPassword = devPasswordInput.value;

   if (typedPassword !== DEV_PASSWORD) {
      devErrorText.textContent = TEXTS.dev.wrongPassword;
      devPasswordInput.value = '';
      return;
   }

   devErrorText.textContent = '';
   devLoginSection.style.display = 'none';
   devContent.classList.remove('locked');
}

function devRefresh() {
   updateUI();
   updateSpawnBarVisual(getSpawnContext());
   saveGame({
      showText: true,
      saveStatus,
   });
}

// ===============================
// 15. EVENTOS DEV TOOLS
// ===============================

devAddPolygonsSmall.addEventListener('click', () => {
   state.money += DEV_ADD_SMALL_MONEY;
   devRefresh();
});

devAddPolygonsBig.addEventListener('click', () => {
   state.money += DEV_ADD_BIG_MONEY;
   devRefresh();
});

devAddShardsSmall.addEventListener('click', () => {
   state.shards += DEV_ADD_SMALL_SHARDS;
   devRefresh();
});

devAddShardsBig.addEventListener('click', () => {
   state.shards += DEV_ADD_BIG_SHARDS;
   devRefresh();
});

devSpawnOne.addEventListener('click', () => {
   createItem({
      onCreated: addDragEvents,
      onGoldenSpawn: () => showSpawnPopup(TEXTS.spawn.goldenObject, 'golden'),
   });
   devRefresh();
});

devSpawnGolden.addEventListener('click', () => {
   createItem({
      level: getStartLevel(),
      forcedGolden: true,
      onCreated: addDragEvents,
      onGoldenSpawn: () => showSpawnPopup(TEXTS.spawn.goldenObject, 'golden'),
   });

   devRefresh();
});

devFillGrid.addEventListener('click', () => {
   while (!isGridFull()) {
      createItem({
         onCreated: addDragEvents,
         onGoldenSpawn: () =>
            showSpawnPopup(TEXTS.spawn.goldenObject, 'golden'),
      });
   }

   devRefresh();
});

devClearGrid.addEventListener('click', () => {
   clearAllItems();
   devRefresh();
});

devMaxSpawnSpeed.addEventListener('click', () => {
   setSpawnSpeedToMinimum();
   restartSpawnTimer(getSpawnContext());
   devRefresh();
});

devLevelUpForm.addEventListener('click', () => {
   increaseUpgradeLevel('startLevel');
   upgradeOldItemsToStartLevel({
      onChanged: devRefresh,
   });
   devRefresh();
});

devResetUpgrades.addEventListener('click', () => {
   resetUpgrades();
   restartSpawnTimer(getSpawnContext());
   devRefresh();
});

devAllUpgrades5.addEventListener('click', () => {
   setAllUpgradesLevel(5);

   upgradeOldItemsToStartLevel({
      onChanged: devRefresh,
   });
   restartSpawnTimer(getSpawnContext());
   devRefresh();
});

devAddMerge.addEventListener('click', () => {
   addMergeProgress();
   devRefresh();
});

devForceLevelUp.addEventListener('click', () => {
   state.mergeProgress = state.mergesNeeded - 1;
   addMergeProgress();
   devRefresh();
});

devLoginBtn.addEventListener('click', unlockDevTools);

devPasswordInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      unlockDevTools();
   }
});

// ===============================
// 16. EVENTOS DE INTERFACE
// ===============================

settingsTabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      const selectedTab = tab.dataset.tab;

      settingsTabs.forEach((item) => item.classList.remove('active'));
      settingsContents.forEach((content) => content.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${selectedTab}`).classList.add('active');
   });
});

document.addEventListener('pointermove', (event) => {
   if (!state.draggedItem) return;

   moveDraggedItem(event.clientX, event.clientY);
   clearHighlights();

   const cell = getCellUnderPointer(event.clientX, event.clientY);
   if (!cell) return;

   const targetItem = getItemByCellIndex(
      Number(cell.dataset.index),
      state.draggedItem,
   );

   if (targetItem && targetItem.level === state.draggedItem.level) {
      cell.classList.add('highlight');
   }
});

document.addEventListener('pointerup', (event) => {
   if (!state.draggedItem) return;

   const cell = getCellUnderPointer(event.clientX, event.clientY);
   clearHighlights();

   if (!cell) {
      returnToOriginalCell();
      clearDraggedItem();
      return;
   }

   const targetCellIndex = Number(cell.dataset.index);
   const targetItem = getItemByCellIndex(targetCellIndex, state.draggedItem);

   if (targetItem && targetItem.level === state.draggedItem.level) {
      mergeItems(targetItem);
      return;
   }

   if (targetItem && targetItem.level !== state.draggedItem.level) {
      flashError(targetItem, cell, state.draggedItem);
      returnToOriginalCell();
      clearDraggedItem();
      return;
   }

   if (!targetItem) {
      moveItemToCell(targetCellIndex);
      updateUI();
      saveGame();
      return;
   }

   returnToOriginalCell();
   clearDraggedItem();
});

resetInsideBtn.addEventListener('click', resetGame);

openSettingsBtn.addEventListener('click', () => {
   settingsPanel.classList.add('active');
   settingsOverlay.classList.add('active');
});

function closeSettings() {
   settingsPanel.classList.remove('active');
   settingsOverlay.classList.remove('active');
}

closeSettingsBtn.addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', closeSettings);

openShopBtn.addEventListener('click', () => {
   shop.classList.add('active');
   shopOverlay.classList.add('active');
});

function closeShop() {
   shop.classList.remove('active');
   shopOverlay.classList.remove('active');
}

closeShopBtn.addEventListener('click', closeShop);
shopOverlay.addEventListener('click', closeShop);

// ===============================
// 17. INICIALIZAÇÃO DO JOGO
// ===============================

setInterval(incomeTick, MONEY_TICK_INTERVAL);
setInterval(() => {
   updateSpawnProgressBar(getSpawnContext());
}, SPAWN_TICK_RATE);

createGrid(grid);
const loaded = loadGame({
   onItemCreated: addDragEvents,
});

if (!loaded || state.items.length === 0) {
   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: addDragEvents,
   });
   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: addDragEvents,
   });
}

restartSpawnTimer(getSpawnContext());
updateUI();

updateSpawnProgressBar(getSpawnContext());
