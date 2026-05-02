// ===============================
// SHOP ACTIONS — AÇÕES DA LOJA
// ===============================

import { TEXTS } from './texts.js';
import { state } from './state.js';

import {
   increaseUpgradeLevel,
   getUpgradeCost,
   getStartLevel,
} from './upgrades.js';

import { upgradeOldItemsToStartLevel } from './grid.js';

import { showSpawnPopup, applySpawnSpeedUpgrade } from './spawn.js';

import { saveGame } from './save.js';

export function buyUpgrade(
   key,
   { spawnPopup, saveStatus, spawnContext, onUpdateUI },
) {
   const cost = getUpgradeCost(key);

   if (state.money < cost) return;

   state.money -= cost;
   increaseUpgradeLevel(key);

   if (key === 'spawnSpeed') {
      applySpawnSpeedUpgrade(spawnContext);
   }

   if (key === 'startLevel') {
      const oldStartLevel = getStartLevel() - 1;

      upgradeOldItemsToStartLevel({
         onChanged: () => {
            if (typeof onUpdateUI === 'function') {
               onUpdateUI();
            }

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

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame({
      showText: true,
      saveStatus,
   });
}
