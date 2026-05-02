// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

import { NUMBER_SUFFIXES } from './config.js';

export function formatShortNumber(value) {
   if (value >= 100) return value.toFixed(0);
   if (value >= 10) return value.toFixed(1);
   return value.toFixed(2);
}

export function formatNumber(value, symbol = '') {
   if (!Number.isFinite(value)) return `${symbol}∞`;

   const sign = value < 0 ? '-' : '';
   const absValue = Math.abs(value);

   if (absValue < 1000) {
      return `${sign}${symbol}${Math.floor(absValue)}`;
   }

   const suffixIndex = Math.min(
      Math.floor(Math.log10(absValue) / 3),
      NUMBER_SUFFIXES.length - 1,
   );

   const shortValue = absValue / Math.pow(1000, suffixIndex);
   const suffix = NUMBER_SUFFIXES[suffixIndex];

   return `${sign}${symbol}${formatShortNumber(shortValue)}${suffix}`;
}

export function formatMoney(value) {
   return formatNumber(value, '◆ ');
}

export function formatShards(value) {
   return formatNumber(value, '✦ ');
}

export function getCycleRoman(cycle) {
   const roman = ['', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
   return roman[cycle] ?? `${cycle + 1}`;
}
