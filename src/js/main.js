
import { DOM } from './dom.js';

import { SPAWN_TICK_RATE, MONEY_TICK_INTERVAL } from './config.js';

import { state } from './state.js';

import { resetUpgrades } from './upgrades.js';

import { createGrid, createItem } from './grid.js';

import { updateSpawnProgressBar, updateSpawnBarVisual, restartSpawnTimer } from './spawn.js';

function getSpawnContext() {
   return {
      spawnProgressText: DOM.spawn.progressText,
      spawnProgressFill: DOM.spawn.progressFill,
      spawnPopupElement: DOM.spawn.popup,
      onItemCreated: addDragEvents,
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

import { addDragEvents } from './drag.js';

// Merge
import { mergeItems } from './merge.js';
function getMergeContext() {
   return {
      onItemCreated: addDragEvents,
      onAddMergeProgress: () => addMergeProgress(getLevelContext()),
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

// Level
import { addMergeProgress } from './level.js';
function getLevelContext() {
   return {
      levelUpPopup: DOM.level.popup,
      saveStatus: DOM.game.saveStatus,
      onUpdateUI: () => updateUI(getUIContext()),
   };
}

// Economia
import { incomeTick } from './income.js';


import { updateUI } from './ui.js';
function getUIContext() {
   return {
      moneyEl: DOM.top.money,
      incomeEl: DOM.top.income,
      shardsEl: DOM.top.shards,

      shopMoney: DOM.shop.money,
      upgradesEl: DOM.shop.upgrades,
      onBuyUpgrade: handleBuyUpgrade,

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

import { buyUpgrade } from './shopActions.js';
function getShopActionsContext() {
   return {
      spawnPopup: DOM.spawn.popup,
      saveStatus: DOM.game.saveStatus,
      spawnContext: getSpawnContext(),
      onUpdateUI: () => updateUI(getUIContext()),
   };
}
function handleBuyUpgrade(key) {
   buyUpgrade(key, getShopActionsContext());
}

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
// EVENTOS DE INTERFACE
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

import { setupBoardInput } from './boardInput.js';
function getBoardInputContext() {
   return {
      onMerge: (targetItem) => mergeItems(targetItem, getMergeContext()),
      onUpdateUI: () => updateUI(getUIContext()),
      onSave: () => saveGame(),
   };
}

DOM.settings.resetBtn.addEventListener('click', resetGame);

// ===============================
// INICIALIZAÇÃO DO JOGO
// ===============================

setupPanels(getPanelsContext());
setupDevTools(getDevToolsContext());
setupBoardInput(getBoardInputContext());

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
