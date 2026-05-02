// ===============================
// 8. SPAWN
// ===============================

import { state } from '../core/state.js';

import { SPAWN_TICK_RATE } from '../core/config.js';
import { TEXTS } from '../core/texts.js';

import { getSpawnTime, getDoubleSpawnChance } from './upgrades.js';

import { createItem, isGridFull } from './grid.js';

import { saveGame } from '../persistence/save.js';

export function showSpawnPopup(spawnPopupElement, message, type = '') {
   spawnPopupElement.innerHTML = message;
   spawnPopupElement.className = `spawnPopup ${type}`;

   spawnPopupElement.classList.remove('show');
   void spawnPopupElement.offsetWidth;
   spawnPopupElement.classList.add('show');
}

export function updateSpawnBarVisual({ spawnProgressText, spawnProgressFill }) {
   const total = getSpawnTime();
   const remaining = Math.max(0, total - state.spawnProgress);
   const progress = Math.min(100, (state.spawnProgress / total) * 100);

   spawnProgressText.textContent = `${(remaining / 1000).toFixed(2)}s / ${(total / 1000).toFixed(2)}s`;
   spawnProgressFill.style.width = `${progress}%`;
}

export function spawnObjects({ spawnPopupElement, onItemCreated, onUpdateUI }) {
   if (isGridFull()) return false;

   const firstSpawned = createItem({
      onCreated: onItemCreated,
      onGoldenSpawn: () =>
         showSpawnPopup(spawnPopupElement, TEXTS.spawn.goldenObject, 'golden'),
   });

   const canDoubleSpawn =
      !isGridFull() && Math.random() < getDoubleSpawnChance();

   if (canDoubleSpawn) {
      createItem({
         onCreated: onItemCreated,
         onGoldenSpawn: () =>
            showSpawnPopup(
               spawnPopupElement,
               TEXTS.spawn.goldenObject,
               'golden',
            ),
      });

      showSpawnPopup(spawnPopupElement, TEXTS.spawn.doubleDelivery, 'double');
   }

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame();

   return Boolean(firstSpawned);
}

export function updateSpawnProgressBar({
   spawnProgressText,
   spawnProgressFill,
   spawnPopupElement,
   onItemCreated,
   onUpdateUI,
}) {
   const total = getSpawnTime();

   state.spawnProgress += SPAWN_TICK_RATE;

   if (state.spawnProgress >= total) {
      state.spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects({
            spawnPopupElement,
            onItemCreated,
            onUpdateUI,
         });

         state.spawnProgress = 0;
      }
   }

   updateSpawnBarVisual({
      spawnProgressText,
      spawnProgressFill,
   });
}

export function applySpawnSpeedUpgrade({
   spawnProgressText,
   spawnProgressFill,
   spawnPopupElement,
   onItemCreated,
   onUpdateUI,
}) {
   const total = getSpawnTime();

   if (state.spawnProgress >= total) {
      state.spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects({
            spawnPopupElement,
            onItemCreated,
            onUpdateUI,
         });

         state.spawnProgress = 0;
      }
   }

   updateSpawnBarVisual({
      spawnProgressText,
      spawnProgressFill,
   });
}

export function restartSpawnTimer({ spawnProgressText, spawnProgressFill }) {
   state.spawnProgress = 0;

   updateSpawnBarVisual({
      spawnProgressText,
      spawnProgressFill,
   });
}
