// ===============================
// 1. ELEMENTOS DO DOM
// ===============================

const grid = document.getElementById('grid');
const moneyEl = document.getElementById('money');
const incomeEl = document.getElementById('income');
const shardsEl = document.getElementById('shards');
const saveStatus = document.getElementById('saveStatus');
const openShopBtn = document.getElementById('openShopBtn');
const closeShopBtn = document.getElementById('closeShopBtn');
const shop = document.getElementById('shop');
const shopOverlay = document.getElementById('shopOverlay');
const shopMoney = document.getElementById('shopMoney');
const upgradesEl = document.getElementById('upgrades');
const spawnTimeStat = document.getElementById('spawnTimeStat');
const startLevelStat = document.getElementById('startLevelStat');
const doubleSpawnStat = document.getElementById('doubleSpawnStat');
const doubleMoneyStat = document.getElementById('doubleMoneyStat');
const goldenChanceStat = document.getElementById('goldenChanceStat');
const multiplierStat = document.getElementById('multiplierStat');
const itemsStat = document.getElementById('itemsStat');
const levelStat = document.getElementById('levelStat');
const spawnProgressText = document.getElementById('spawnProgressText');
const spawnProgressFill = document.getElementById('spawnProgressFill');
const playerLevelEl = document.getElementById('playerLevel');
const levelProgressText = document.getElementById('levelProgressText');
const levelProgressFill = document.getElementById('levelProgressFill');
const levelBonusText = document.getElementById('levelBonusText');
const levelUpPopup = document.getElementById('levelUpPopup');
const spawnPopup = document.getElementById('spawnPopup');

const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsTabs = document.querySelectorAll('.settingsTab');
const settingsContents = document.querySelectorAll('.settingsContent');
const resetInsideBtn = document.getElementById('resetInsideBtn');

const devAddPolygonsSmall = document.getElementById('devAddPolygonsSmall');
const devAddPolygonsBig = document.getElementById('devAddPolygonsBig');
const devAddShardsSmall = document.getElementById('devAddShardsSmall');
const devAddShardsBig = document.getElementById('devAddShardsBig');
const devSpawnOne = document.getElementById('devSpawnOne');
const devSpawnGolden = document.getElementById('devSpawnGolden');
const devFillGrid = document.getElementById('devFillGrid');
const devClearGrid = document.getElementById('devClearGrid');
const devMaxSpawnSpeed = document.getElementById('devMaxSpawnSpeed');
const devLevelUpForm = document.getElementById('devLevelUpForm');
const devResetUpgrades = document.getElementById('devResetUpgrades');
const devAllUpgrades5 = document.getElementById('devAllUpgrades5');
const devAddMerge = document.getElementById('devAddMerge');
const devForceLevelUp = document.getElementById('devForceLevelUp');
const devPasswordInput = document.getElementById('devPasswordInput');
const devLoginBtn = document.getElementById('devLoginBtn');
const devErrorText = document.getElementById('devErrorText');
const devLoginSection = document.getElementById('devLoginSection');
const devContent = document.getElementById('devContent');

// ===============================
// 2. CONSTANTES E CONFIGURAÇÕES BASE
// ===============================

import {
   GRID_SIZE,
   BASE_SPAWN_TIME,
   SAVE_KEY,
   SPAWN_TICK_RATE,
   DEV_PASSWORD,
   MAX_CHANCE,
   UPGRADE_CHANCE_STEP,
   SHARD_MULTIPLIER_STEP,
   SHARD_REWARD_STEP,
   MERGE_REWARD_MULTIPLIER,
   MERGE_REQUIREMENT_MULTIPLIER,
   MONEY_TICK_INTERVAL,
   SAVE_FEEDBACK_DURATION,
   LEVEL_UP_FEEDBACK_DURATION,
   RING_REMOVE_DELAY,
   ERROR_EFFECT_DURATION,
   MONEY_POPUP_DURATION,
   DEV_ADD_SMALL_MONEY,
   DEV_ADD_BIG_MONEY,
   DEV_ADD_SMALL_SHARDS,
   DEV_ADD_BIG_SHARDS,
   LEVEL_COLORS,
   NUMBER_SUFFIXES,
} from './config.js';


// ===============================
// 2.1 TEXTOS DO JOGO
// ===============================

const TEXTS = {
   save: {
      autoActive: 'Salvamento automático <strong>ativo</strong>',
      saved: 'Progresso <strong>salvo</strong> ✓',
      loadError: 'Erro ao carregar save:',
   },

   spawn: {
      goldenObject: '🌟 Objeto dourado!',
      doubleDelivery: '📦 Entrega dupla!',
      upgradedForms: (oldLevel, newLevel) =>
         `⬆️ Formas melhoradas! Lv ${oldLevel} → Lv ${newLevel}`,
   },

   level: {
      up: (oldLevel, newLevel, reward) => `
         Nível ${oldLevel} → Nível ${newLevel}
         <small>+${reward} estilhaços!</small>
      `,
      status: (reward) => `Subiu de Nível! +${reward} estilhaços ✦`,
      progress: (current, needed) => `${current} / ${needed} combinações`,
      shardMultiplier: (multiplier) =>
         `Multiplicador por estilhaços: <strong>${multiplier.toFixed(1)}x</strong>`,
   },

   shop: {
      balance: (moneyValue, shardsValue) =>
         `Polígonos: ${moneyValue}<br/> Estilhaços: ${shardsValue}`,
      buyButton: (cost) => `Comprar — ${cost}`,
      level: (level) => `Nv. ${level}`,
   },

   stats: {
      spawnTime: (seconds) => `${seconds.toFixed(2)}s`,
      startLevel: (level) => `Lv ${level}`,
      chance: (chance) => `${Math.round(chance * 100)}%`,
      multiplier: (multiplier) => `${multiplier.toFixed(1)}x`,
      items: (current, max) => `${current}/${max}`,
   },

   item: {
      level: (level) => `Lv ${level}`,
      goldenBonus: '<small>★ 2x</small>',
      moneyPopup: (amount, isDoubleTick) =>
         `+${amount}/s${isDoubleTick ? ' 2x!' : ''}`,
   },

   dev: {
      wrongPassword: 'Senha incorreta.',
      addPolygonsSmall: (amount) => `+${formatNumber(amount)} Polígonos`,
      addPolygonsBig: (amount) => `+${formatNumber(amount)} Polígonos`,
      addShardsSmall: (amount) => `+${formatNumber(amount)} Estilhaços`,
      addShardsBig: (amount) => `+${formatNumber(amount)} Estilhaços`,
   },
};

// ===============================
// 3. ESTADO DO JOGO
// ===============================

let money = 0;
let shards = 0;
let playerLevel = 1;
let mergeProgress = 0;
let mergesNeeded = 5;
let cells = [];
let items = [];
let draggedItem = null;
let originalCellIndex = null;
let offsetX = 0;
let offsetY = 0;
let spawnProgress = 0;
let saveTextTimer = null;

// ===============================
// 4. CONFIGURAÇÕES DE UPGRADES
// ===============================

const UPGRADE_CONFIGS = {
   spawnSpeed: {
      name: 'Esteira mais rápida',
      description:
         'Diminui o tempo de espera para gerar novos objetos em 0.1s por nível.',
      baseCost: 2000,
      multiplier: 2,
      tenMultiplier: 4,
   },

   startLevel: {
      name: 'Forma melhorada',
      description: 'Faz com que os objetos comecem 1 nível acima.',
      baseCost: 5000,
      multiplier: 5,
      tenMultiplier: 10,
   },

   doubleSpawn: {
      name: 'Entrega dupla',
      description:
         'Aumenta em 2% por nível a chance de nascerem 2 objetos ao mesmo tempo.',
      baseCost: 1500,
      multiplier: 2,
      tenMultiplier: 4,
   },

   doubleMoney: {
      name: 'Momento valioso',
      description:
         'Aumenta em 2% por nível a chance de um objeto gerar 2x polígonos naquele momento.',
      baseCost: 2000,
      multiplier: 2,
      tenMultiplier: 4,
   },

   goldenChance: {
      name: 'Objeto dourado',
      description:
         'Aumenta em 2% por nível a chance de nascer um objeto dourado.',
      baseCost: 10000,
      multiplier: 4,
      tenMultiplier: 8,
      golden: true,
   },
};

function createInitialUpgrades() {
   return Object.fromEntries(
      Object.entries(UPGRADE_CONFIGS).map(([key, config]) => [
         key,
         {
            ...config,
            level: 0,
         },
      ]),
   );
}

const upgrades = createInitialUpgrades();

function increaseUpgradeLevel(key, amount = 1) {
   if (!upgrades[key]) return;
   upgrades[key].level += amount;
}

// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

function formatShortNumber(value) {
   if (value >= 100) return value.toFixed(0);
   if (value >= 10) return value.toFixed(1);
   return value.toFixed(2);
}

function formatNumber(value, symbol = '') {
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

function formatMoney(value) {
   return formatNumber(value, '◆ ');
}

function formatShards(value) {
   return formatNumber(value, '✦ ');
}

function getCycleRoman(cycle) {
   const roman = ['', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
   return roman[cycle] ?? `${cycle + 1}`;
}

// ===============================
// 6. FUNÇÕES DE CÁLCULO
// ===============================

function getShardMultiplier() {
   return 1 + shards * SHARD_MULTIPLIER_STEP;
}

function getShardsReward() {
   return (playerLevel - 1) * SHARD_REWARD_STEP;
}

function getNextMergeRequirement() {
   return Math.ceil(mergesNeeded * MERGE_REQUIREMENT_MULTIPLIER);
}

function getUpgradeCost(key) {
   const upgrade = upgrades[key];
   let cost = upgrade.baseCost;

   const baseMultiplier = upgrade.multiplier ?? 2;
   const tenMultiplier = upgrade.tenMultiplier ?? 4;

   for (let i = 1; i <= upgrade.level; i++) {
      if (!upgrade.noTenMultiplier && i % 10 === 0) {
         cost *= tenMultiplier;
      } else {
         cost *= baseMultiplier;
      }
   }

   return Math.floor(cost);
}

function getSpawnTime() {
   const reduction = upgrades.spawnSpeed.level * 100;
   return Math.max(2000, BASE_SPAWN_TIME - reduction);
}

function getStartLevel() {
   return 1 + upgrades.startLevel.level;
}

function getDoubleSpawnChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.doubleSpawn.level * UPGRADE_CHANCE_STEP,
   );
}

function getDoubleMoneyChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.doubleMoney.level * UPGRADE_CHANCE_STEP,
   );
}

function getGoldenChance() {
   return Math.min(
      MAX_CHANCE,
      upgrades.goldenChance.level * UPGRADE_CHANCE_STEP,
   );
}

function getBaseItemValue(level) {
   return Math.pow(3, level - 1);
}

function getItemPotentialValue(item) {
   return (
      getBaseItemValue(item.level) *
      (item.isGolden ? 2 : 1) *
      getShardMultiplier()
   );
}

function getTotalIncomePreview() {
   return items.reduce((total, item) => total + getItemPotentialValue(item), 0);
}

// ===============================
// 7. GRID E ITENS
// ===============================

function createGrid() {
   grid.innerHTML = '';
   cells = [];

   for (let i = 0; i < GRID_SIZE; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      grid.appendChild(cell);
      cells.push(cell);
   }
}

function getFreeCells() {
   const occupied = items.map((item) => item.cellIndex);
   return cells.filter((_, index) => !occupied.includes(index));
}

function isGridFull() {
   return items.length >= GRID_SIZE;
}

function getLevelVisual(level) {
   const colorIndex = (level - 1) % LEVEL_COLORS.length;
   const cycle = Math.floor((level - 1) / LEVEL_COLORS.length);
   const color = LEVEL_COLORS[colorIndex];

   return {
      bg: color.bg,
      text: color.text,
      cycle,
   };
}

function getLevelShadow(cycle, isGolden) {
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

function updateItemElement(item) {
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

function createItem(
   level = getStartLevel(),
   cellIndex = null,
   forcedGolden = null,
) {
   const freeCells = getFreeCells();
   if (freeCells.length === 0 && cellIndex === null) return false;

   const chosenCell =
      cellIndex !== null
         ? cells[cellIndex]
         : freeCells[Math.floor(Math.random() * freeCells.length)];

   const chosenIndex = Number(chosenCell.dataset.index);
   const isGolden = forcedGolden ?? Math.random() < getGoldenChance();

   if (isGolden && cellIndex === null) {
      showSpawnPopup(TEXTS.spawn.goldenObject, 'golden');
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
   items.push(item);
   addDragEvents(item);
   updateUI();
   saveGame();
   return true;
}

function clearAllItems() {
   items.forEach((item) => item.element.remove());
   items = [];
}

function upgradeOldItemsToStartLevel() {
   const startLevel = getStartLevel();
   let changed = false;

   items.forEach((item) => {
      if (item.level < startLevel) {
         item.level = startLevel;
         updateItemElement(item);
         changed = true;
      }
   });

   if (changed) {
      updateUI();
      saveGame(true);
   }
}

// ===============================
// 8. SPAWN
// ===============================

function updateSpawnProgressBar() {
   const total = getSpawnTime();

   spawnProgress += SPAWN_TICK_RATE;

   if (spawnProgress >= total) {
      spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects();
         spawnProgress = 0;
      }
   }

   updateSpawnBarVisual();
}

function updateSpawnBarVisual() {
   const total = getSpawnTime();
   const remaining = Math.max(0, total - spawnProgress);
   const progress = Math.min(100, (spawnProgress / total) * 100);

   spawnProgressText.textContent = `${(remaining / 1000).toFixed(2)}s / ${(total / 1000).toFixed(2)}s`;
   spawnProgressFill.style.width = `${progress}%`;
}

function showSpawnPopup(message, type = '') {
   spawnPopup.innerHTML = message;
   spawnPopup.className = `spawnPopup ${type}`;

   spawnPopup.classList.remove('show');
   void spawnPopup.offsetWidth;
   spawnPopup.classList.add('show');
}

function spawnObjects() {
   if (isGridFull()) return false;

   const firstSpawned = createItem();

   const canDoubleSpawn =
      !isGridFull() && Math.random() < getDoubleSpawnChance();

   if (canDoubleSpawn) {
      createItem();
      showSpawnPopup(TEXTS.spawn.doubleDelivery, 'double');
   }

   return firstSpawned;
}

function applySpawnSpeedUpgrade() {
   const total = getSpawnTime();

   if (spawnProgress >= total) {
      spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects();
         spawnProgress = 0;
      }
   }

   updateSpawnBarVisual();
}

function restartSpawnTimer() {
   spawnProgress = 0;
   updateSpawnBarVisual();
}

// ===============================
// 9. DRAG AND DROP
// ===============================

function addDragEvents(item) {
   item.element.addEventListener('pointerdown', (event) => {
      draggedItem = item;
      originalCellIndex = item.cellIndex;

      const rect = item.element.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;

      item.element.classList.add('dragging');
      item.element.style.width = `${rect.width}px`;
      item.element.style.height = `${rect.height}px`;
      document.body.appendChild(item.element);

      moveDraggedItem(event.clientX, event.clientY);
   });
}

function moveDraggedItem(x, y) {
   if (!draggedItem) return;
   draggedItem.element.style.left = `${x - offsetX}px`;
   draggedItem.element.style.top = `${y - offsetY}px`;
}

function getCellUnderPointer(x, y) {
   return cells.find((cell) => {
      const rect = cell.getBoundingClientRect();
      return (
         x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
   });
}

function getItemByCellIndex(cellIndex) {
   return items.find(
      (item) => item.cellIndex === cellIndex && item !== draggedItem,
   );
}

function getItemByExactCell(cellIndex) {
   return items.find((item) => item.cellIndex === cellIndex);
}

function clearHighlights() {
   cells.forEach((cell) => cell.classList.remove('highlight'));
}

function returnToOriginalCell() {
   const originalCell = cells[originalCellIndex];
   originalCell.appendChild(draggedItem.element);
   draggedItem.cellIndex = originalCellIndex;
   resetDraggedStyles();
}

function resetDraggedStyles() {
   draggedItem.element.classList.remove('dragging');
   draggedItem.element.style.left = '';
   draggedItem.element.style.top = '';
   draggedItem.element.style.width = '';
   draggedItem.element.style.height = '';
}

// ===============================
// 10. EFEITOS VISUAIS
// ===============================

function getElementCenter(element) {
   const rect = element.getBoundingClientRect();
   return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
   };
}

function createRing(x, y, type = 'merge') {
   const ring = document.createElement('div');
   ring.className = `effectRing ${type === 'error' ? 'error' : ''}`;
   ring.style.left = `${x}px`;
   ring.style.top = `${y}px`;
   document.body.appendChild(ring);
   setTimeout(() => ring.remove(), 500);
}

function flashError(targetItem, targetCell) {
   const center = getElementCenter(targetItem.element);
   createRing(center.x, center.y, 'error');
   targetCell.classList.add('errorFlash');
   targetItem.element.classList.add('shakeError');
   draggedItem.element.classList.add('shakeError');

   setTimeout(() => {
      targetCell.classList.remove('errorFlash');
      targetItem.element.classList.remove('shakeError');
      if (draggedItem) draggedItem.element.classList.remove('shakeError');
   }, 360);
}

function showLevelUpPopup(oldLevel, newLevel, reward) {
   levelUpPopup.innerHTML = TEXTS.level.up(oldLevel, newLevel, reward);

   levelUpPopup.classList.remove('show');
   void levelUpPopup.offsetWidth;
   levelUpPopup.classList.add('show');
}

function shouldShowMoneyPopup(isDoubleTick, item) {
   const compactMode = window.innerHeight <= 760 || window.innerWidth <= 520;

   if (!compactMode) return true;

   // Eventos especiais continuam tendo destaque.
   if (isDoubleTick || item.isGolden) return true;

   // Em modo compacto, mostra só parte dos popups comuns.
   return Math.random() < 0.35;
}

function createMoneyPopup(item, amount, isDoubleTick) {
   const rect = item.element.getBoundingClientRect();
   const popup = document.createElement('div');
   popup.className = `moneyPopup ${isDoubleTick ? 'double' : ''} ${item.isGolden ? 'goldenText' : ''}`;
   popup.textContent = TEXTS.item.moneyPopup(formatMoney(amount), isDoubleTick);
   popup.style.left = `${rect.left + rect.width / 2 - 24}px`;
   popup.style.top = `${rect.top - 4}px`;
   document.body.appendChild(popup);
   setTimeout(() => popup.remove(), 900);
}

// ===============================
// 11. MERGE, LEVEL E ECONOMIA
// ===============================

function mergeItems(targetItem) {
   const newLevel = draggedItem.level + 1;
   const targetCellIndex = targetItem.cellIndex;
   const newIsGolden = draggedItem.isGolden || targetItem.isGolden;
   const center = getElementCenter(targetItem.element);

   draggedItem.element.remove();
   targetItem.element.remove();
   items = items.filter((item) => item !== draggedItem && item !== targetItem);

   draggedItem = null;
   createItem(newLevel, targetCellIndex, newIsGolden);

   const newItem = getItemByExactCell(targetCellIndex);
   if (newItem) newItem.element.classList.add('mergeBurst');
   createRing(center.x, center.y, 'merge');

   money +=
      getBaseItemValue(newLevel) *
      (newIsGolden ? 2 : 1) *
      MERGE_REWARD_MULTIPLIER *
      getShardMultiplier();
   addMergeProgress();
   updateUI();
   saveGame();
}

function addMergeProgress() {
   mergeProgress++;

   if (mergeProgress >= mergesNeeded) {
      mergeProgress -= mergesNeeded;

      const oldLevel = playerLevel;
      playerLevel++;

      const reward = getShardsReward();
      shards += reward;

      showLevelUpPopup(oldLevel, playerLevel, reward);

      mergesNeeded = getNextMergeRequirement();

      clearTimeout(saveTextTimer);
      saveStatus.textContent = TEXTS.level.status(reward);

      saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = 'Salvamento automático <strong>ativo</strong>';
      }, 1600);
   }

   updateUI();
   saveGame(true);
}

function incomeTick() {
   items.forEach((item) => {
      const base = getBaseItemValue(item.level);
      const goldenMultiplier = item.isGolden ? 2 : 1;
      const isDoubleTick = Math.random() < getDoubleMoneyChance();
      const tickMultiplier = isDoubleTick ? 2 : 1;
      const gained =
         base * goldenMultiplier * tickMultiplier * getShardMultiplier();

      money += gained;

      if (shouldShowMoneyPopup(isDoubleTick, item)) {
         createMoneyPopup(item, gained, isDoubleTick);
      }
   });

   updateUI();
   saveGame();
}

// ===============================
// 12. INTERFACE E RENDERIZAÇÃO
// ===============================

function updateUI() {
   moneyEl.textContent = formatMoney(money);
   incomeEl.textContent = `${formatMoney(getTotalIncomePreview())}/s`;
   shardsEl.textContent = formatShards(shards);
   shopMoney.innerHTML = TEXTS.shop.balance(
      formatMoney(money),
      formatShards(shards),
   );
   spawnTimeStat.textContent = TEXTS.stats.spawnTime(getSpawnTime() / 1000);
   startLevelStat.textContent = TEXTS.stats.startLevel(getStartLevel());
   doubleSpawnStat.textContent = TEXTS.stats.chance(getDoubleSpawnChance());
   doubleMoneyStat.textContent = TEXTS.stats.chance(getDoubleMoneyChance());
   goldenChanceStat.textContent = TEXTS.stats.chance(getGoldenChance());
   multiplierStat.textContent = TEXTS.stats.multiplier(getShardMultiplier());
   itemsStat.textContent = TEXTS.stats.items(items.length, GRID_SIZE);
   levelStat.textContent = playerLevel;
   playerLevelEl.textContent = playerLevel;
   levelProgressText.textContent = TEXTS.level.progress(
      mergeProgress,
      mergesNeeded,
   );
   levelProgressFill.style.width = `${Math.min(100, (mergeProgress / mergesNeeded) * 100)}%`;
   levelBonusText.innerHTML = TEXTS.level.shardMultiplier(getShardMultiplier());
   devAddPolygonsSmall.textContent =
      TEXTS.dev.addPolygonsSmall(DEV_ADD_SMALL_MONEY);
   devAddPolygonsBig.textContent = TEXTS.dev.addPolygonsBig(DEV_ADD_BIG_MONEY);
   devAddShardsSmall.textContent =
      TEXTS.dev.addShardsSmall(DEV_ADD_SMALL_SHARDS);
   devAddShardsBig.textContent = TEXTS.dev.addShardsBig(DEV_ADD_BIG_SHARDS);
   renderUpgrades();
}

function getUpgradeEffectText(key) {
   if (key === 'spawnSpeed') {
      return `${(getSpawnTime() / 1000).toFixed(1)}s/2.0s`;
   }

   if (key === 'startLevel') {
      return `Lv ${getStartLevel()}`;
   }

   if (key === 'doubleSpawn') {
      return `${Math.round(getDoubleSpawnChance() * 100)}%/50%`;
   }

   if (key === 'doubleMoney') {
      return `${Math.round(getDoubleMoneyChance() * 100)}%/50%`;
   }

   if (key === 'goldenChance') {
      return `${Math.round(getGoldenChance() * 100)}%/50%`;
   }

   return '';
}

function renderUpgrades() {
   upgradesEl.innerHTML = '';

   Object.entries(upgrades).forEach(([key, upgrade]) => {
      const cost = getUpgradeCost(key);
      const card = document.createElement('div');
      card.className = `upgrade ${upgrade.golden ? 'goldenUpgrade' : ''}`;

      card.innerHTML = `
                  <div class="upgradeTop">
                     <h3>${upgrade.name}</h3>

                     <div class="upgradeInfo">
                        <span class="upgradeEffectCompact">[${getUpgradeEffectText(key)}]</span>
                        <span class="upgradeLevel">${TEXTS.shop.level(upgrade.level)}</span>
                     </div>
                  </div>

                  <p>${upgrade.description}</p>

                  <button ${money < cost ? 'disabled' : ''}>
                     ${TEXTS.shop.buyButton(formatMoney(cost))}
                  </button>
               `;

      card
         .querySelector('button')
         .addEventListener('click', () => buyUpgrade(key));
      upgradesEl.appendChild(card);
   });
}

function buyUpgrade(key) {
   const cost = getUpgradeCost(key);
   if (money < cost) return;

   money -= cost;
   increaseUpgradeLevel(key);

   if (key === 'spawnSpeed') applySpawnSpeedUpgrade();
   if (key === 'startLevel') {
      const oldStartLevel = getStartLevel() - 1;

      upgradeOldItemsToStartLevel();

      showSpawnPopup(
         TEXTS.spawn.upgradedForms(oldStartLevel, getStartLevel()),
         'upgrade',
      );
   }
   updateUI();
   saveGame(true);
}

// ===============================
// 13. SALVAMENTO
// ===============================

function saveGame(showText = false) {
   const saveData = {
      money,
      shards,
      playerLevel,
      mergeProgress,
      mergesNeeded,
      items: items.map((item) => ({
         level: item.level,
         cellIndex: item.cellIndex,
         isGolden: item.isGolden,
      })),
      upgrades: Object.fromEntries(
         Object.entries(upgrades).map(([key, upgrade]) => [key, upgrade.level]),
      ),
   };

   localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

   if (showText) {
      clearTimeout(saveTextTimer);
      saveStatus.innerHTML = TEXTS.save.saved;
      saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = TEXTS.save.autoActive;
      }, 1200);
   }
}

function loadGame() {
   const rawSave = localStorage.getItem(SAVE_KEY);
   if (!rawSave) return false;

   try {
      const saveData = JSON.parse(rawSave);
      money = saveData.money ?? 0;
      shards = saveData.shards ?? 0;
      playerLevel = saveData.playerLevel ?? 1;
      mergeProgress = saveData.mergeProgress ?? 0;
      mergesNeeded = saveData.mergesNeeded ?? 5;

      if (saveData.upgrades) {
         Object.entries(saveData.upgrades).forEach(([key, level]) => {
            if (upgrades[key]) upgrades[key].level = level;
         });
      }

      if (Array.isArray(saveData.items)) {
         saveData.items.forEach((savedItem) => {
            createItem(
               savedItem.level,
               savedItem.cellIndex,
               savedItem.isGolden,
            );
         });
      }

      return true;
   } catch (error) {
      console.warn(TEXTS.save.loadError, error);
      return false;
   }
}

function resetGame() {
   money = 0;
   shards = 0;
   playerLevel = 1;
   mergeProgress = 0;
   mergesNeeded = 5;

   items.forEach((item) => item.element.remove());
   items = [];

   Object.values(upgrades).forEach((upgrade) => (upgrade.level = 0));
   localStorage.removeItem(SAVE_KEY);

   resetUpgrades();
   createItem(1, null, false);
   createItem(1, null, false);
   restartSpawnTimer();
   updateUI();
   saveGame(true);
}

// ===============================
// 14. DEV TOOLS
// ===============================

function resetUpgrades() {
   Object.values(upgrades).forEach((upgrade) => {
      upgrade.level = 0;
   });
}

function unlockDevTools() {
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

function devRefresh() {
   updateUI();
   updateSpawnBarVisual();
   saveGame(true);
}

function devSetSpawnToMinimum() {
   const neededLevel = Math.ceil((BASE_SPAWN_TIME - 2000) / 100);
   upgrades.spawnSpeed.level = Math.max(upgrades.spawnSpeed.level, neededLevel);
}

// ===============================
// 15. EVENTOS DEV TOOLS
// ===============================

devAddPolygonsSmall.addEventListener('click', () => {
   money += DEV_ADD_SMALL_MONEY;
   devRefresh();
});

devAddPolygonsBig.addEventListener('click', () => {
   money += DEV_ADD_BIG_MONEY;
   devRefresh();
});

devAddShardsSmall.addEventListener('click', () => {
   shards += DEV_ADD_SMALL_SHARDS;
   devRefresh();
});

devAddShardsBig.addEventListener('click', () => {
   shards += DEV_ADD_BIG_SHARDS;
   devRefresh();
});

devSpawnOne.addEventListener('click', () => {
   createItem();
   devRefresh();
});

devSpawnGolden.addEventListener('click', () => {
   createItem(getStartLevel(), null, true);
   devRefresh();
});

devFillGrid.addEventListener('click', () => {
   while (!isGridFull()) {
      createItem();
   }

   devRefresh();
});

devClearGrid.addEventListener('click', () => {
   clearAllItems();
   devRefresh();
});

devMaxSpawnSpeed.addEventListener('click', () => {
   devSetSpawnToMinimum();
   restartSpawnTimer();
   devRefresh();
});

devLevelUpForm.addEventListener('click', () => {
   increaseUpgradeLevel('startLevel');
   upgradeOldItemsToStartLevel();
   devRefresh();
});

devResetUpgrades.addEventListener('click', () => {
   resetUpgrades();
   restartSpawnTimer();
   devRefresh();
});

devAllUpgrades5.addEventListener('click', () => {
   Object.values(upgrades).forEach((upgrade) => {
      upgrade.level = 5;
   });

   upgradeOldItemsToStartLevel();
   restartSpawnTimer();
   devRefresh();
});

devAddMerge.addEventListener('click', () => {
   addMergeProgress();
   devRefresh();
});

devForceLevelUp.addEventListener('click', () => {
   mergeProgress = mergesNeeded - 1;
   addMergeProgress();
   devRefresh();
});

devLoginBtn.addEventListener('click', unlockDevTools);

devPasswordInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      unlockDevTools();
   }
});

// ===============================
// 16. EVENTOS DE INTERFACE
// ===============================

settingsTabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      const selectedTab = tab.dataset.tab;

      settingsTabs.forEach((item) => item.classList.remove('active'));
      settingsContents.forEach((content) => content.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${selectedTab}`).classList.add('active');
   });
});

document.addEventListener('pointermove', (event) => {
   if (!draggedItem) return;

   moveDraggedItem(event.clientX, event.clientY);
   clearHighlights();

   const cell = getCellUnderPointer(event.clientX, event.clientY);
   if (!cell) return;

   const targetItem = getItemByCellIndex(Number(cell.dataset.index));
   if (targetItem && targetItem.level === draggedItem.level) {
      cell.classList.add('highlight');
   }
});

document.addEventListener('pointerup', (event) => {
   if (!draggedItem) return;

   const cell = getCellUnderPointer(event.clientX, event.clientY);
   clearHighlights();

   if (!cell) {
      returnToOriginalCell();
      draggedItem = null;
      return;
   }

   const targetCellIndex = Number(cell.dataset.index);
   const targetItem = getItemByCellIndex(targetCellIndex);

   if (targetItem && targetItem.level === draggedItem.level) {
      mergeItems(targetItem);
      return;
   }

   if (targetItem && targetItem.level !== draggedItem.level) {
      flashError(targetItem, cell);
      returnToOriginalCell();
      draggedItem = null;
      return;
   }

   if (!targetItem) {
      cell.appendChild(draggedItem.element);
      draggedItem.cellIndex = targetCellIndex;
      resetDraggedStyles();
      draggedItem = null;
      updateUI();
      saveGame();
      return;
   }

   returnToOriginalCell();
   draggedItem = null;
});

resetInsideBtn.addEventListener('click', resetGame);

openSettingsBtn.addEventListener('click', () => {
   settingsPanel.classList.add('active');
   settingsOverlay.classList.add('active');
});

function closeSettings() {
   settingsPanel.classList.remove('active');
   settingsOverlay.classList.remove('active');
}

closeSettingsBtn.addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', closeSettings);

openShopBtn.addEventListener('click', () => {
   shop.classList.add('active');
   shopOverlay.classList.add('active');
});

function closeShop() {
   shop.classList.remove('active');
   shopOverlay.classList.remove('active');
}

closeShopBtn.addEventListener('click', closeShop);
shopOverlay.addEventListener('click', closeShop);

// ===============================
// 17. INICIALIZAÇÃO DO JOGO
// ===============================

setInterval(incomeTick, MONEY_TICK_INTERVAL);
setInterval(updateSpawnProgressBar, SPAWN_TICK_RATE);

createGrid();
const loaded = loadGame();

if (!loaded || items.length === 0) {
   createItem(1, null, false);
   createItem(1, null, false);
}

restartSpawnTimer();
updateUI();
updateSpawnProgressBar();
