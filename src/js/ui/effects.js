// ===============================
// 10. EFEITOS VISUAIS
// ===============================

import {
   RING_REMOVE_DELAY,
   ERROR_EFFECT_DURATION,
   MONEY_POPUP_DURATION,
} from './core/config.js';

import { TEXTS } from './core/texts.js';
import { formatMoney } from './format.js';

export function getElementCenter(element) {
   const rect = element.getBoundingClientRect();

   return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
   };
}

export function createRing(x, y, type = 'merge') {
   const ring = document.createElement('div');

   ring.className = `effectRing ${type === 'error' ? 'error' : ''}`;
   ring.style.left = `${x}px`;
   ring.style.top = `${y}px`;

   document.body.appendChild(ring);

   setTimeout(() => ring.remove(), RING_REMOVE_DELAY);
}

export function flashError(targetItem, targetCell, draggedItem) {
   const center = getElementCenter(targetItem.element);

   createRing(center.x, center.y, 'error');

   targetCell.classList.add('errorFlash');
   targetItem.element.classList.add('shakeError');

   if (draggedItem) {
      draggedItem.element.classList.add('shakeError');
   }

   setTimeout(() => {
      targetCell.classList.remove('errorFlash');
      targetItem.element.classList.remove('shakeError');

      if (draggedItem) {
         draggedItem.element.classList.remove('shakeError');
      }
   }, ERROR_EFFECT_DURATION);
}

export function showLevelUpPopup(levelUpPopup, oldLevel, newLevel, reward) {
   levelUpPopup.innerHTML = TEXTS.level.up(oldLevel, newLevel, reward);

   levelUpPopup.classList.remove('show');
   void levelUpPopup.offsetWidth;
   levelUpPopup.classList.add('show');
}

export function shouldShowMoneyPopup(isDoubleTick, item) {
   const compactMode = window.innerHeight <= 760 || window.innerWidth <= 520;

   if (!compactMode) return true;
   if (isDoubleTick || item.isGolden) return true;

   return Math.random() < 0.35;
}

export function createMoneyPopup(item, amount, isDoubleTick) {
   const rect = item.element.getBoundingClientRect();
   const popup = document.createElement('div');

   popup.className = `moneyPopup ${isDoubleTick ? 'double' : ''} ${
      item.isGolden ? 'goldenText' : ''
   }`;

   popup.textContent = TEXTS.item.moneyPopup(formatMoney(amount), isDoubleTick);
   popup.style.left = `${rect.left + rect.width / 2 - 24}px`;
   popup.style.top = `${rect.top - 4}px`;

   document.body.appendChild(popup);

   setTimeout(() => popup.remove(), MONEY_POPUP_DURATION);
}
