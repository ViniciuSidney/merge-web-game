// ===============================
// MERGE — COMBINAÇÃO DE ITENS
// ===============================

import { MERGE_REWARD_MULTIPLIER } from '../core/config.js';
import { state } from '../core/state.js';

import { createItem, getItemByExactCell } from './grid.js';

import { getBaseItemValue, getShardMultiplier } from './economy.js';

import { getElementCenter, createRing } from '../ui/effects.js';

import { saveGame } from '../persistence/save.js';

export function mergeItems(
   targetItem,
   { onItemCreated, onAddMergeProgress, onUpdateUI },
) {
   if (!state.draggedItem || !targetItem) return;

   const newLevel = state.draggedItem.level + 1;
   const targetCellIndex = targetItem.cellIndex;
   const newIsGolden = state.draggedItem.isGolden || targetItem.isGolden;
   const center = getElementCenter(targetItem.element);

   state.draggedItem.element.remove();
   targetItem.element.remove();

   state.items = state.items.filter(
      (item) => item !== state.draggedItem && item !== targetItem,
   );

   state.draggedItem = null;

   createItem({
      level: newLevel,
      cellIndex: targetCellIndex,
      forcedGolden: newIsGolden,
      onCreated: onItemCreated,
   });

   const newItem = getItemByExactCell(targetCellIndex);

   if (newItem) {
      newItem.element.classList.add('mergeBurst');
   }

   createRing(center.x, center.y, 'merge');

   state.money +=
      getBaseItemValue(newLevel) *
      (newIsGolden ? 2 : 1) *
      MERGE_REWARD_MULTIPLIER *
      getShardMultiplier();

   if (typeof onAddMergeProgress === 'function') {
      onAddMergeProgress();
   }

   if (typeof onUpdateUI === 'function') {
      onUpdateUI();
   }

   saveGame();
}
