// ===============================
// INCOME — GANHO PASSIVO
// ===============================

import { state } from '../core/state.js';

import { getDoubleMoneyChance } from './upgrades.js';

import { getBaseItemValue, getShardMultiplier } from './economy.js';

import { shouldShowMoneyPopup, createMoneyPopup } from './effects.js';

import { saveGame } from '../persistence/save.js';

export function incomeTick({ onUpdateUI } = {}) {
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

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame();
}
