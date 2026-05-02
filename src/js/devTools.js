// ===============================
// DEV TOOLS
// ===============================

import {
   DEV_PASSWORD,
   DEV_ADD_SMALL_MONEY,
   DEV_ADD_BIG_MONEY,
   DEV_ADD_SMALL_SHARDS,
   DEV_ADD_BIG_SHARDS,
} from './config.js';

import { TEXTS } from './texts.js';
import { state } from './state.js';

import {
   resetUpgrades,
   increaseUpgradeLevel,
   setAllUpgradesLevel,
   setSpawnSpeedToMinimum,
   getStartLevel,
} from './upgrades.js';

import {
   createItem,
   clearAllItems,
   upgradeOldItemsToStartLevel,
   isGridFull,
} from './grid.js';

import { showSpawnPopup } from './spawn.js';

export function unlockDevTools({
   devPasswordInput,
   devErrorText,
   devLoginSection,
   devContent,
}) {
   const typedPassword = devPasswordInput.value;

   if (typedPassword !== DEV_PASSWORD) {
      devErrorText.textContent = TEXTS.dev.wrongPassword;
      devPasswordInput.value = '';
      return;
   }

   devErrorText.textContent = '';
   devLoginSection.style.display = 'none';
   devContent.classList.remove('locked');
}

function showGoldenSpawnPopup({ spawnPopup }) {
   showSpawnPopup(spawnPopup, TEXTS.spawn.goldenObject, 'golden');
}

export function setupDevTools({
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

   onItemCreated,
   onRefresh,
   onRestartSpawnTimer,
   onAddMergeProgress,
}) {
   devAddPolygonsSmall.addEventListener('click', () => {
      state.money += DEV_ADD_SMALL_MONEY;
      onRefresh();
   });

   devAddPolygonsBig.addEventListener('click', () => {
      state.money += DEV_ADD_BIG_MONEY;
      onRefresh();
   });

   devAddShardsSmall.addEventListener('click', () => {
      state.shards += DEV_ADD_SMALL_SHARDS;
      onRefresh();
   });

   devAddShardsBig.addEventListener('click', () => {
      state.shards += DEV_ADD_BIG_SHARDS;
      onRefresh();
   });

   devSpawnOne.addEventListener('click', () => {
      createItem({
         onCreated: onItemCreated,
         onGoldenSpawn: () => showGoldenSpawnPopup({ spawnPopup }),
      });

      onRefresh();
   });

   devSpawnGolden.addEventListener('click', () => {
      createItem({
         level: getStartLevel(),
         forcedGolden: true,
         onCreated: onItemCreated,
         onGoldenSpawn: () => showGoldenSpawnPopup({ spawnPopup }),
      });

      onRefresh();
   });

   devFillGrid.addEventListener('click', () => {
      while (!isGridFull()) {
         createItem({
            onCreated: onItemCreated,
            onGoldenSpawn: () => showGoldenSpawnPopup({ spawnPopup }),
         });
      }

      onRefresh();
   });

   devClearGrid.addEventListener('click', () => {
      clearAllItems();
      onRefresh();
   });

   devMaxSpawnSpeed.addEventListener('click', () => {
      setSpawnSpeedToMinimum();
      onRestartSpawnTimer();
      onRefresh();
   });

   devLevelUpForm.addEventListener('click', () => {
      increaseUpgradeLevel('startLevel');

      upgradeOldItemsToStartLevel({
         onChanged: onRefresh,
      });

      onRefresh();
   });

   devResetUpgrades.addEventListener('click', () => {
      resetUpgrades();
      onRestartSpawnTimer();
      onRefresh();
   });

   devAllUpgrades5.addEventListener('click', () => {
      setAllUpgradesLevel(5);

      upgradeOldItemsToStartLevel({
         onChanged: onRefresh,
      });

      onRestartSpawnTimer();
      onRefresh();
   });

   devAddMerge.addEventListener('click', () => {
      onAddMergeProgress: () => addMergeProgress(getLevelContext()),
      onRefresh();
   });

   devForceLevelUp.addEventListener('click', () => {
      state.mergeProgress = state.mergesNeeded - 1;
      onAddMergeProgress: () => addMergeProgress(getLevelContext()),
      onRefresh();
   });

   devLoginBtn.addEventListener('click', () => {
      unlockDevTools({
         devPasswordInput,
         devErrorText,
         devLoginSection,
         devContent,
      });
   });

   devPasswordInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
         unlockDevTools({
            devPasswordInput,
            devErrorText,
            devLoginSection,
            devContent,
         });
      }
   });
}
