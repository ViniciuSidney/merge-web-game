// ===============================
// LEVEL — PROGRESSÃO DO JOGADOR
// ===============================

import { LEVEL_UP_FEEDBACK_DURATION } from './config.js';
import { TEXTS } from './texts.js';
import { state } from './state.js';

import { getShardsReward, getNextMergeRequirement } from './economy.js';

import { showLevelUpPopup } from './effects.js';
import { saveGame } from './save.js';

export function addMergeProgress({ levelUpPopup, saveStatus, onUpdateUI }) {
   state.mergeProgress++;

   if (state.mergeProgress >= state.mergesNeeded) {
      state.mergeProgress -= state.mergesNeeded;

      const oldLevel = state.playerLevel;
      state.playerLevel++;

      const reward = getShardsReward();
      state.shards += reward;

      showLevelUpPopup(levelUpPopup, oldLevel, state.playerLevel, reward);

      state.mergesNeeded = getNextMergeRequirement();

      clearTimeout(state.saveTextTimer);

      saveStatus.textContent = TEXTS.level.status(reward);

      state.saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = TEXTS.save.autoActive;
      }, LEVEL_UP_FEEDBACK_DURATION);
   }

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame({
      showText: true,
      saveStatus,
   });
}
