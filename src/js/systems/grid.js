// ===============================
// 7. GRID E ITENS
// ===============================

import { state } from '../core/state.js';
import { GRID_SIZE, LEVEL_COLORS } from '../core/config.js';
import { TEXTS } from '../core/texts.js';
import { getCycleRoman } from '../utils/format.js';
import { getStartLevel, getGoldenChance } from './upgrades.js';
import { getShardMultiplier } from './economy.js';

export function createGrid(gridElement) {
   gridElement.innerHTML = '';
   state.cells = [];

   for (let i = 0; i < GRID_SIZE; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      gridElement.appendChild(cell);
      state.cells.push(cell);
   }
}

export function getFreeCells() {
   const occupied = state.items.map((item) => item.cellIndex);
   return state.cells.filter((_, index) => !occupied.includes(index));
}

export function isGridFull() {
   return state.items.length >= GRID_SIZE;
}

export function getLevelVisual(level) {
   const colorIndex = (level - 1) % LEVEL_COLORS.length;
   const cycle = Math.floor((level - 1) / LEVEL_COLORS.length);
   const color = LEVEL_COLORS[colorIndex];

   return {
      bg: color.bg,
      text: color.text,
      cycle,
   };
}

export function getLevelShadow(cycle, isGolden) {
   const baseShadow = `
      inset 0 -6px rgba(0, 0, 0, 0.12),
      0 6px 12px rgba(0, 0, 0, 0.16)
   `;

   const cycleEffects = [
      '',
      '0 0 0 3px rgba(255, 255, 255, 0.8)',
      '0 0 0 3px rgba(108, 92, 231, 0.9), 0 0 16px rgba(108, 92, 231, 0.45)',
      '0 0 0 3px rgba(255, 216, 77, 0.95), 0 0 20px rgba(255, 216, 77, 0.55)',
      '0 0 0 4px rgba(255, 255, 255, 0.9), 0 0 24px rgba(31, 143, 72, 0.6)',
   ];

   const cycleShadow = cycleEffects[Math.min(cycle, cycleEffects.length - 1)];
   const goldenShadow = isGolden ? '0 0 0 3px #ffd84d, 0 0 18px #ffd84d' : '';

   return [goldenShadow, cycleShadow, baseShadow].filter(Boolean).join(',');
}

export function updateItemElement(item) {
   const visual = getLevelVisual(item.level);

   const cycleBadge =
      visual.cycle > 0
         ? `<span class="cycleBadge">${getCycleRoman(visual.cycle)}</span>`
         : '';

   item.element.className = `item pop ${item.isGolden ? 'golden' : ''}`;
   item.element.dataset.level = item.level;

   item.element.style.background = `
      linear-gradient(
         145deg,
         ${visual.bg},
         color-mix(in srgb, ${visual.bg} 70%, #000 30%)
      )
   `;

   item.element.style.color = visual.text;
   item.element.style.boxShadow = getLevelShadow(visual.cycle, item.isGolden);

   item.element.innerHTML = `
      ${cycleBadge}
      <span class="itemLevelText">${TEXTS.item.level(item.level)}</span>
      ${item.isGolden ? TEXTS.item.goldenBonus : ''}
   `;
}

export function createItem({
   level = getStartLevel(),
   cellIndex = null,
   forcedGolden = null,
   onCreated = null,
   onGoldenSpawn = null,
} = {}) {
   const freeCells = getFreeCells();
   if (freeCells.length === 0 && cellIndex === null) return false;

   const chosenCell =
      cellIndex !== null
         ? state.cells[cellIndex]
         : freeCells[Math.floor(Math.random() * freeCells.length)];

   if (!chosenCell) return false;

   const chosenIndex = Number(chosenCell.dataset.index);
   const isGolden = forcedGolden ?? Math.random() < getGoldenChance();

   if (isGolden && typeof onGoldenSpawn === 'function') {
      onGoldenSpawn();
   }

   const element = document.createElement('div');

   const item = {
      id: crypto.randomUUID(),
      level,
      cellIndex: chosenIndex,
      isGolden,
      element,
   };

   updateItemElement(item);
   chosenCell.appendChild(element);
   state.items.push(item);

   if (typeof onCreated === 'function') {
      onCreated(item);
   }

   return item;
}

export function clearAllItems() {
   state.items.forEach((item) => item.element.remove());
   state.items = [];
}

export function upgradeOldItemsToStartLevel({ onChanged = null } = {}) {
   const startLevel = getStartLevel();
   let changed = false;

   state.items.forEach((item) => {
      if (item.level < startLevel) {
         item.level = startLevel;
         updateItemElement(item);
         changed = true;
      }
   });

   if (changed && typeof onChanged === 'function') {
      onChanged();
   }
}

export function getItemByCellIndex(cellIndex, ignoredItem = null) {
   return state.items.find(
      (item) => item.cellIndex === cellIndex && item !== ignoredItem,
   );
}

export function getItemByExactCell(cellIndex) {
   return state.items.find((item) => item.cellIndex === cellIndex);
}
