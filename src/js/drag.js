// ===============================
// 9. DRAG AND DROP
// ===============================

import { state } from './state.js';

export function addDragEvents(item) {
   item.element.addEventListener('pointerdown', (event) => {
      state.draggedItem = item;
      state.originalCellIndex = item.cellIndex;

      const rect = item.element.getBoundingClientRect();

      state.offsetX = event.clientX - rect.left;
      state.offsetY = event.clientY - rect.top;

      item.element.classList.add('dragging');
      item.element.style.width = `${rect.width}px`;
      item.element.style.height = `${rect.height}px`;

      document.body.appendChild(item.element);

      moveDraggedItem(event.clientX, event.clientY);
   });
}

export function moveDraggedItem(x, y) {
   if (!state.draggedItem) return;

   state.draggedItem.element.style.left = `${x - state.offsetX}px`;
   state.draggedItem.element.style.top = `${y - state.offsetY}px`;
}

export function getCellUnderPointer(x, y) {
   return state.cells.find((cell) => {
      const rect = cell.getBoundingClientRect();

      return (
         x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
   });
}

export function clearHighlights() {
   state.cells.forEach((cell) => {
      cell.classList.remove('highlight');
   });
}

export function resetDraggedStyles() {
   if (!state.draggedItem) return;

   state.draggedItem.element.classList.remove('dragging');
   state.draggedItem.element.style.left = '';
   state.draggedItem.element.style.top = '';
   state.draggedItem.element.style.width = '';
   state.draggedItem.element.style.height = '';
}

export function returnToOriginalCell() {
   if (!state.draggedItem) return;

   const originalCell = state.cells[state.originalCellIndex];

   if (!originalCell) return;

   originalCell.appendChild(state.draggedItem.element);
   state.draggedItem.cellIndex = state.originalCellIndex;

   resetDraggedStyles();
}

export function moveItemToCell(cellIndex) {
   if (!state.draggedItem) return false;

   const cell = state.cells[cellIndex];
   if (!cell) return false;

   cell.appendChild(state.draggedItem.element);
   state.draggedItem.cellIndex = cellIndex;

   resetDraggedStyles();
   state.draggedItem = null;

   return true;
}

export function clearDraggedItem() {
   state.draggedItem = null;
}