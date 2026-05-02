// ===============================
// 1. ELEMENTOS DO DOM
// ===============================

import { DOM } from './dom.js';

// ===============================
// 2. CONSTANTES E CONFIGURAÇÕES BASE
// ===============================

import { SPAWN_TICK_RATE, MONEY_TICK_INTERVAL } from './config.js';

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

import {
   resetUpgrades,
   increaseUpgradeLevel,
   getUpgradeCost,
   getStartLevel,
} from './upgrades.js';

// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

// import { formatNumber } from './format.js';

// ===============================
// 6. FUNÇÕES DE CÁLCULO
// ===============================

// import {...} from './economy.js';

// ===============================
// 7. GRID E ITENS
// ===============================

import {
   createGrid,
   createItem,
   upgradeOldItemsToStartLevel,
   getItemByCellIndex,
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
      spawnProgressText: DOM.spawn.progressText,
      spawnProgressFill: DOM.spawn.progressFill,
      spawnPopupElement: DOM.spawn.popup,
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

import { flashError } from './effects.js';

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
      levelUpPopup: DOM.level.popup,
      saveStatus: DOM.game.saveStatus,
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
      moneyEl: DOM.top.money,
      incomeEl: DOM.top.income,
      shardsEl: DOM.top.shards,

      shopMoney: DOM.shop.money,
      upgradesEl: DOM.shop.upgrades,
      onBuyUpgrade: buyUpgrade,

      spawnTimeStat: DOM.stats.spawnTime,
      startLevelStat: DOM.stats.startLevel,
      doubleSpawnStat: DOM.stats.doubleSpawn,
      doubleMoneyStat: DOM.stats.doubleMoney,
      goldenChanceStat: DOM.stats.goldenChance,
      multiplierStat: DOM.stats.multiplier,
      itemsStat: DOM.stats.items,
      levelStat: DOM.stats.level,

      playerLevelEl: DOM.level.playerLevel,
      levelProgressText: DOM.level.progressText,
      levelProgressFill: DOM.level.progressFill,
      levelBonusText: DOM.level.bonusText,

      devAddPolygonsSmall: DOM.dev.addPolygonsSmall,
      devAddPolygonsBig: DOM.dev.addPolygonsBig,
      devAddShardsSmall: DOM.dev.addShardsSmall,
      devAddShardsBig: DOM.dev.addShardsBig,
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
               saveStatus: DOM.game.saveStatus,
            });
         },
      });

      showSpawnPopup(
         DOM.spawn.popup,
         TEXTS.spawn.upgradedForms(oldStartLevel, getStartLevel()),
         'upgrade',
      );
   }

   updateUI(getUIContext());
   saveGame({
      showText: true,
      saveStatus: DOM.game.saveStatus,
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
      saveStatus: DOM.game.saveStatus,
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
      saveStatus: DOM.game.saveStatus,
   });
}

function getDevToolsContext() {
   return {
      devAddPolygonsSmall: DOM.dev.addPolygonsSmall,
      devAddPolygonsBig: DOM.dev.addPolygonsBig,
      devAddShardsSmall: DOM.dev.addShardsSmall,
      devAddShardsBig: DOM.dev.addShardsBig,
      devSpawnOne: DOM.dev.spawnOne,
      devSpawnGolden: DOM.dev.spawnGolden,
      devFillGrid: DOM.dev.fillGrid,
      devClearGrid: DOM.dev.clearGrid,
      devMaxSpawnSpeed: DOM.dev.maxSpawnSpeed,
      devLevelUpForm: DOM.dev.levelUpForm,
      devResetUpgrades: DOM.dev.resetUpgrades,
      devAllUpgrades5: DOM.dev.allUpgrades5,
      devAddMerge: DOM.dev.addMerge,
      devForceLevelUp: DOM.dev.forceLevelUp,
      devLoginBtn: DOM.dev.loginBtn,
      devPasswordInput: DOM.dev.passwordInput,
      devErrorText: DOM.dev.errorText,
      devLoginSection: DOM.dev.loginSection,
      devContent: DOM.dev.content,

      spawnPopup: DOM.spawn.popup,

      onItemCreated: addDragEvents,
      onRefresh: devRefresh,
      onRestartSpawnTimer: () => restartSpawnTimer(getSpawnContext()),
      onAddMergeProgress: () => addMergeProgress(getLevelContext()),
   };
}

// ===============================
// 16. EVENTOS DE INTERFACE
// ===============================

import { setupPanels } from './panels.js';

function getPanelsContext() {
   return {
      settingsTabs: DOM.settings.tabs,
      settingsContents: DOM.settings.contents,

      openSettingsBtn: DOM.settings.openBtn,
      closeSettingsBtn: DOM.settings.closeBtn,
      settingsPanel: DOM.settings.panel,
      settingsOverlay: DOM.settings.overlay,

      openShopBtn: DOM.shop.openBtn,
      closeShopBtn: DOM.shop.closeBtn,
      shop: DOM.shop.panel,
      shopOverlay: DOM.shop.overlay,
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

DOM.settings.resetBtn.addEventListener('click', resetGame);

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

createGrid(DOM.game.grid);
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
