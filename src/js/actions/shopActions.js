// ===============================
// SHOP ACTIONS — AÇÕES DA LOJA
// ===============================

import { TEXTS } from '../core/texts.js';
import { state } from '../core/state.js';

import {
   increaseUpgradeLevel,
   getUpgradeCost,
   getStartLevel,
} from '../systems/upgrades.js';

import { upgradeOldItemsToStartLevel } from '../systems/grid.js';

import { showSpawnPopup, applySpawnSpeedUpgrade } from '../systems/spawn.js';

import { saveGame } from '../persistence/save.js';

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
