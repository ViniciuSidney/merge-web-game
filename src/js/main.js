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
   SPAWN_TICK_RATE,
   MERGE_REWARD_MULTIPLIER,
   MONEY_TICK_INTERVAL,
   LEVEL_UP_FEEDBACK_DURATION,
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
   getUpgradeCost,
   getSpawnTime,
   getStartLevel,
   getDoubleSpawnChance,
   getDoubleMoneyChance,
   getGoldenChance,
} from './upgrades.js';

// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

import { formatNumber } from './format.js';

// ===============================
// 6. FUNÇÕES DE CÁLCULO
// ===============================

import {
   getShardMultiplier,
   getShardsReward,
   getNextMergeRequirement,
   getBaseItemValue,
} from './economy.js';

// ===============================
// 7. GRID E ITENS
// ===============================

import {
   createGrid,
   createItem,
   clearAllItems,
   upgradeOldItemsToStartLevel,
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
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

function getDevToolsContext() {
   return {
      devAddPolygonsSmall,
      devAddPolygonsBig,
      devAddShardsSmall,
      devAddShardsBig,
      devSpawnOne,
      devSpawnGolden,
      devFillGrid,
      devClearGrid,
      devMaxSpawnSpeed,
      devLevelUpForm,
      devResetUpgrades,
      devAllUpgrades5,
      devAddMerge,
      devForceLevelUp,
      devLoginBtn,
      devPasswordInput,
      devErrorText,
      devLoginSection,
      devContent,

      spawnPopup,

      onItemCreated: addDragEvents,
      onRefresh: devRefresh,
      onRestartSpawnTimer: () => restartSpawnTimer(getSpawnContext()),
      onAddMergeProgress: addMergeProgress,
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
   updateUI(getUIContext());
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

   updateUI(getUIContext());
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

   updateUI(getUIContext());
   saveGame();
}

// ===============================
// 12. INTERFACE E RENDERIZAÇÃO
// ===============================

import { updateUI } from './ui.js';

function getUIContext() {
   return {
      moneyEl,
      incomeEl,
      shardsEl,

      shopMoney,
      upgradesEl,
      onBuyUpgrade: buyUpgrade,

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
   };
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
            updateUI(getUIContext());
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

   updateUI(getUIContext());
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
   updateUI(getUIContext());

   saveGame({
      showText: true,
      saveStatus,
   });
}

// ===============================
// 14. DEV TOOLS
// ===============================

import { setupDevTools } from './devTools.js';

function devRefresh() {
   updateUI(getUIContext());
   updateSpawnBarVisual(getSpawnContext());
   saveGame({
      showText: true,
      saveStatus,
   });
}

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
      updateUI(getUIContext());
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

setupDevTools(getDevToolsContext());

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
updateUI(getUIContext());

updateSpawnProgressBar(getSpawnContext());
