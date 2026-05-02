// ===============================
// BOARD INPUT — INTERAÇÃO COM O TABULEIRO
// ===============================

import { state } from '../core/state.js';

import {
   moveDraggedItem,
   getCellUnderPointer,
   clearHighlights,
   returnToOriginalCell,
   moveItemToCell,
   clearDraggedItem,
} from './drag.js';

import { getItemByCellIndex } from './grid.js';

import { flashError } from './effects.js';

export function setupBoardInput({ onMerge, onUpdateUI, onSave }) {
   document.addEventListener('pointermove', (event) => {
      if (!state.draggedItem) return;

      moveDraggedItem(event.clientX, event.clientY);
      clearHighlights();

      const cell = getCellUnderPointer(event.clientX, event.clientY);
      if (!cell) return;

      const targetItem = getItemByCellIndex(
         Number(cell.dataset.index),
         state.draggedItem,
      );

      if (targetItem && targetItem.level === state.draggedItem.level) {
         cell.classList.add('highlight');
      }
   });

   document.addEventListener('pointerup', (event) => {
      if (!state.draggedItem) return;

      const cell = getCellUnderPointer(event.clientX, event.clientY);
      clearHighlights();

      if (!cell) {
         returnToOriginalCell();
         clearDraggedItem();
         return;
      }

      const targetCellIndex = Number(cell.dataset.index);
      const targetItem = getItemByCellIndex(targetCellIndex, state.draggedItem);

      if (targetItem && targetItem.level === state.draggedItem.level) {
         onMerge(targetItem);
         return;
      }

      if (targetItem && targetItem.level !== state.draggedItem.level) {
         flashError(targetItem, cell, state.draggedItem);
         returnToOriginalCell();
         clearDraggedItem();
         return;
      }

      if (!targetItem) {
         moveItemToCell(targetCellIndex);

         if (typeof onUpdateUI === 'function') {
            onUpdateUI();
         }

         if (typeof onSave === 'function') {
            onSave();
         }

         return;
      }

      returnToOriginalCell();
      clearDraggedItem();
   });
}
