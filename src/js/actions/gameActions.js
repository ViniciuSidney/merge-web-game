// ===============================
// GAME ACTIONS — AÇÕES GERAIS DO JOGO
// ===============================

import { state } from '../core/state.js';

import { resetUpgrades } from '../systems/upgrades.js';

import { createItem } from '../systems/grid.js';

import { clearSave, saveGame } from '../persistence/save.js';

export function resetGame({
   onItemCreated,
   onRestartSpawnTimer,
   onUpdateUI,
   saveStatus,
}) {
   state.money = 0;
   state.shards = 0;
   state.playerLevel = 1;
   state.mergeProgress = 0;
   state.mergesNeeded = 5;

   state.items.forEach((item) => {
      item.element.remove();
   });

   state.items = [];

   resetUpgrades();
   clearSave();

   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: onItemCreated,
   });

   createItem({
      level: 1,
      forcedGolden: false,
      onCreated: onItemCreated,
   });

   if (typeof onRestartSpawnTimer === 'function') {
      onRestartSpawnTimer();
   }

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame({
      showText: true,
      saveStatus,
   });
}
