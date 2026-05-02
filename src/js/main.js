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
   MONEY_TICK_INTERVAL,
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

// import {

// } from './economy.js';

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
   flashError,
} from './effects.js';

// ===============================
// 11. MERGE, LEVEL E ECONOMIA
// ===============================

import { mergeItems } from './merge.js';

function getMergeContext() {
   return {
      onItemCreated: addDragEvents,
      onAddMergeProgress: () => addMergeProgress(getLevelContext()),
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

import { addMergeProgress } from './level.js';

function getLevelContext() {
   return {
      levelUpPopup,
      saveStatus,
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

import { incomeTick } from './income.js';

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
// 16. EVENTOS DE INTERFACE
// ===============================

import { setupPanels } from './panels.js';

function getPanelsContext() {
   return {
      settingsTabs,
      settingsContents,

      openSettingsBtn,
      closeSettingsBtn,
      settingsPanel,
      settingsOverlay,

      openShopBtn,
      closeShopBtn,
      shop,
      shopOverlay,
   };
}

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
      mergeItems(targetItem, getMergeContext());
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

// ===============================
// 17. INICIALIZAÇÃO DO JOGO
// ===============================

setupPanels(getPanelsContext());
setupDevTools(getDevToolsContext());

setInterval(() => {
   incomeTick({
      onUpdateUI: () => updateUI(getUIContext()),
   });
}, MONEY_TICK_INTERVAL);

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
