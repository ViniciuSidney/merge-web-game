// ===============================
// 13. SALVAMENTO
// ===============================

import { SAVE_KEY, SAVE_FEEDBACK_DURATION } from '../core/config.js';
import { TEXTS } from '../core/texts.js';
import { state } from '../core/state.js';
import { upgrades } from '../systems/upgrades.js';
import { createItem } from '../systems/grid.js';

export function saveGame({ showText = false, saveStatus = null } = {}) {
   const saveData = {
      money: state.money,
      shards: state.shards,
      playerLevel: state.playerLevel,
      mergeProgress: state.mergeProgress,
      mergesNeeded: state.mergesNeeded,

      items: state.items.map((item) => ({
         level: item.level,
         cellIndex: item.cellIndex,
         isGolden: item.isGolden,
      })),

      upgrades: Object.fromEntries(
         Object.entries(upgrades).map(([key, upgrade]) => [key, upgrade.level]),
      ),
   };

   localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

   if (showText && saveStatus) {
      clearTimeout(state.saveTextTimer);

      saveStatus.innerHTML = TEXTS.save.saved;

      state.saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = TEXTS.save.autoActive;
      }, SAVE_FEEDBACK_DURATION);
   }
}

export function loadGame({ onItemCreated = null } = {}) {
   const rawSave = localStorage.getItem(SAVE_KEY);
   if (!rawSave) return false;

   try {
      const saveData = JSON.parse(rawSave);

      state.money = saveData.money ?? 0;
      state.shards = saveData.shards ?? 0;
      state.playerLevel = saveData.playerLevel ?? 1;
      state.mergeProgress = saveData.mergeProgress ?? 0;
      state.mergesNeeded = saveData.mergesNeeded ?? 5;

      if (saveData.upgrades) {
         Object.entries(saveData.upgrades).forEach(([key, level]) => {
            if (upgrades[key]) {
               upgrades[key].level = level;
            }
         });
      }

      if (Array.isArray(saveData.items)) {
         saveData.items.forEach((savedItem) => {
            createItem({
               level: savedItem.level,
               cellIndex: savedItem.cellIndex,
               forcedGolden: savedItem.isGolden,
               onCreated: onItemCreated,
            });
         });
      }

      return true;
   } catch (error) {
      console.warn(TEXTS.save.loadError, error);
      return false;
   }
}

export function clearSave() {
   localStorage.removeItem(SAVE_KEY);
}
