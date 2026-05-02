// ===============================
// ELEMENTOS DO DOM
// ===============================

import { DOM } from './dom.js';

// ===============================
// CONSTANTES E CONFIGURAÇÕES BASE
// ===============================

import { SPAWN_TICK_RATE, MONEY_TICK_INTERVAL } from './config.js';

// ===============================
// TEXTOS DO JOGO
// ===============================

import { TEXTS } from './texts.js';

// ===============================
// ESTADO DO JOGO
// ===============================

import { state } from './state.js';

// ===============================
// CONFIGURAÇÕES DE UPGRADES
// ===============================

import {
   resetUpgrades,
   increaseUpgradeLevel,
   getUpgradeCost,
   getStartLevel,
} from './upgrades.js';

// ===============================
// GRID E ITENS
// ===============================

import {
   createGrid,
   createItem,
   upgradeOldItemsToStartLevel,
} from './grid.js';

// ===============================
// SPAWN
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
// DRAG AND DROP
// ===============================

import {
   addDragEvents,
} from './drag.js';

// ===============================
// EFEITOS VISUAIS
// ===============================

// ===============================
// MERGE, LEVEL E ECONOMIA
// ===============================

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

// ===============================
// INTERFACE E RENDERIZAÇÃO
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
// SALVAMENTO
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
// DEV TOOLS
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
