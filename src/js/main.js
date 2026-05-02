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

import { TEXTS } from './texts.js';

// ===============================
// 3. ESTADO DO JOGO
// ===============================

import { state } from './state.js';

// ===============================
// 4. CONFIGURAÇÕES DE UPGRADES
// ===============================

import { UPGRADE_CONFIGS } from './upgradeConfig.js';

import {
   upgrades,
   resetUpgrades,
   increaseUpgradeLevel,
   setAllUpgradesLevel,
   getUpgradeCost,
   getSpawnTime,
   getStartLevel,
   getDoubleSpawnChance,
   getDoubleMoneyChance,
   getGoldenChance,
   setSpawnSpeedToMinimum,
} from './upgrades.js';

// ===============================
// 5. FUNÇÕES UTILITÁRIAS
// ===============================

import {
   formatNumber,
   formatMoney,
   formatShards,
   getCycleRoman,
} from './format.js';

// ===============================
// 6. FUNÇÕES DE CÁLCULO
// ===============================

import {
   getShardMultiplier,
   getShardsReward,
   getNextMergeRequirement,
   getBaseItemValue,
   getItemPotentialValue,
   getTotalIncomePreview,
} from './economy.js';

// ===============================
// 7. GRID E ITENS
// ===============================

function createGrid() {
   grid.innerHTML = '';
   state.cells = [];

   for (let i = 0; i < GRID_SIZE; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      grid.appendChild(cell);
      state.cells.push(cell);
   }
}

function getFreeCells() {
   const occupied = state.items.map((item) => item.cellIndex);
   return state.cells.filter((_, index) => !occupied.includes(index));
}

function isGridFull() {
   return state.items.length >= GRID_SIZE;
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
         ? state.cells[cellIndex]
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
   state.items.push(item);
   addDragEvents(item);
   updateUI();
   saveGame();
   return true;
}

function clearAllItems() {
   state.items.forEach((item) => item.element.remove());
   state.items = [];
}

function upgradeOldItemsToStartLevel() {
   const startLevel = getStartLevel();
   let changed = false;

   state.items.forEach((item) => {
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

   state.spawnProgress += SPAWN_TICK_RATE;

   if (state.spawnProgress >= total) {
      state.spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects();
         state.spawnProgress = 0;
      }
   }

   updateSpawnBarVisual();
}

function updateSpawnBarVisual() {
   const total = getSpawnTime();
   const remaining = Math.max(0, total - state.spawnProgress);
   const progress = Math.min(100, (state.spawnProgress / total) * 100);

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

   if (state.spawnProgress >= total) {
      state.spawnProgress = total;

      if (!isGridFull()) {
         spawnObjects();
         state.spawnProgress = 0;
      }
   }

   updateSpawnBarVisual();
}

function restartSpawnTimer() {
   state.spawnProgress = 0;
   updateSpawnBarVisual();
}

// ===============================
// 9. DRAG AND DROP
// ===============================

function addDragEvents(item) {
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

function moveDraggedItem(x, y) {
   if (!state.draggedItem) return;
   state.draggedItem.element.style.left = `${x - state.offsetX}px`;
   state.draggedItem.element.style.top = `${y - state.offsetY}px`;
}

function getCellUnderPointer(x, y) {
   return state.cells.find((cell) => {
      const rect = cell.getBoundingClientRect();
      return (
         x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
   });
}

function getItemByCellIndex(cellIndex) {
   return state.items.find(
      (item) => item.cellIndex === cellIndex && item !== state.draggedItem,
   );
}

function getItemByExactCell(cellIndex) {
   return state.items.find((item) => item.cellIndex === cellIndex);
}

function clearHighlights() {
   state.cells.forEach((cell) => cell.classList.remove('highlight'));
}

function returnToOriginalCell() {
   const originalCell = state.cells[state.originalCellIndex];
   originalCell.appendChild(state.draggedItem.element);
   state.draggedItem.cellIndex = state.originalCellIndex;
   resetDraggedStyles();
}

function resetDraggedStyles() {
   state.draggedItem.element.classList.remove('dragging');
   state.draggedItem.element.style.left = '';
   state.draggedItem.element.style.top = '';
   state.draggedItem.element.style.width = '';
   state.draggedItem.element.style.height = '';
}

// ===============================
// 10. EFEITOS VISUAIS
// ===============================

import {
   getElementCenter,
   createRing,
   flashError,
   showLevelUpPopup,
   shouldShowMoneyPopup,
   createMoneyPopup,
} from './effects.js';

// ===============================
// 11. MERGE, LEVEL E ECONOMIA
// ===============================

function mergeItems(targetItem) {
   const newLevel = state.draggedItem.level + 1;
   const targetCellIndex = targetItem.cellIndex;
   const newIsGolden = state.draggedItem.isGolden || targetItem.isGolden;
   const center = getElementCenter(targetItem.element);

   state.draggedItem.element.remove();
   targetItem.element.remove();
   state.items = state.items.filter((item) => item !== state.draggedItem && item !== targetItem);

   state.draggedItem = null;
   createItem(newLevel, targetCellIndex, newIsGolden);

   const newItem = getItemByExactCell(targetCellIndex);
   if (newItem) newItem.element.classList.add('mergeBurst');
   createRing(center.x, center.y, 'merge');

   state.money +=
      getBaseItemValue(newLevel) *
      (newIsGolden ? 2 : 1) *
      MERGE_REWARD_MULTIPLIER *
      getShardMultiplier();
   addMergeProgress();
   updateUI();
   saveGame();
}

function addMergeProgress() {
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
         saveStatus.innerHTML = 'Salvamento automático <strong>ativo</strong>';
      }, 1600);
   }

   updateUI();
   saveGame(true);
}

function incomeTick() {
   state.items.forEach((item) => {
      const base = getBaseItemValue(item.level);
      const goldenMultiplier = item.isGolden ? 2 : 1;
      const isDoubleTick = Math.random() < getDoubleMoneyChance();
      const tickMultiplier = isDoubleTick ? 2 : 1;
      const gained =
         base * goldenMultiplier * tickMultiplier * getShardMultiplier();

      state.money += gained;

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
   moneyEl.textContent = formatMoney(state.money);
   incomeEl.textContent = `${formatMoney(getTotalIncomePreview())}/s`;
   shardsEl.textContent = formatShards(state.shards);
   shopMoney.innerHTML = TEXTS.shop.balance(
      formatMoney(state.money),
      formatShards(state.shards),
   );
   spawnTimeStat.textContent = TEXTS.stats.spawnTime(getSpawnTime() / 1000);
   startLevelStat.textContent = TEXTS.stats.startLevel(getStartLevel());
   doubleSpawnStat.textContent = TEXTS.stats.chance(getDoubleSpawnChance());
   doubleMoneyStat.textContent = TEXTS.stats.chance(getDoubleMoneyChance());
   goldenChanceStat.textContent = TEXTS.stats.chance(getGoldenChance());
   multiplierStat.textContent = TEXTS.stats.multiplier(getShardMultiplier());
   itemsStat.textContent = TEXTS.stats.items(state.items.length, GRID_SIZE);
   levelStat.textContent = state.playerLevel;
   playerLevelEl.textContent = state.playerLevel;
   levelProgressText.textContent = TEXTS.level.progress(
      state.mergeProgress,
      state.mergesNeeded,
   );
   levelProgressFill.style.width = `${Math.min(100, (state.mergeProgress / state.mergesNeeded) * 100)}%`;
   levelBonusText.innerHTML = TEXTS.level.shardMultiplier(getShardMultiplier());
   devAddPolygonsSmall.textContent = TEXTS.dev.addPolygonsSmall(
      formatNumber(DEV_ADD_SMALL_MONEY),
   );

   devAddPolygonsBig.textContent = TEXTS.dev.addPolygonsBig(
      formatNumber(DEV_ADD_BIG_MONEY),
   );

   devAddShardsSmall.textContent = TEXTS.dev.addShardsSmall(
      formatNumber(DEV_ADD_SMALL_SHARDS),
   );

   devAddShardsBig.textContent = TEXTS.dev.addShardsBig(
      formatNumber(DEV_ADD_BIG_SHARDS),
   );
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

                  <button ${state.money < cost ? 'disabled' : ''}>
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
   if (state.money < cost) return;

   state.money -= cost;
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
      money: state.money,
      shards: state.shards,
      playerLevel: state.playerLevel,
      mergeProgress: state.mergeProgress,
      mergesNeeded: state.mergesNeeded,
      items: state.items.map((item) => ({
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
      clearTimeout(state.saveTextTimer);
      saveStatus.innerHTML = TEXTS.save.saved;
      state.saveTextTimer = setTimeout(() => {
         saveStatus.innerHTML = TEXTS.save.autoActive;
      }, 1200);
   }
}

function loadGame() {
   const rawSave = localStorage.getItem(SAVE_KEY);
   if (!rawSave) return false;

   try {
      const saveData = JSON.parse(rawSave);
      state.money = saveData.money ?? 0;
      state.shards = saveData.shards ?? 0;
      state.playerLevel = saveData.playerLevel ?? 1;
      state.mergeProgress = saveData.mergeProgress ?? 0;
      state.mergesNeeded = saveData.mergesNeeded ?? 5;

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
   state.money = 0;
   state.shards = 0;
   state.playerLevel = 1;
   state.mergeProgress = 0;
   state.mergesNeeded = 5;

   state.items.forEach((item) => item.element.remove());
   state.items = [];

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

// ===============================
// 15. EVENTOS DEV TOOLS
// ===============================

devAddPolygonsSmall.addEventListener('click', () => {
   state.money += DEV_ADD_SMALL_MONEY;
   devRefresh();
});

devAddPolygonsBig.addEventListener('click', () => {
   state.money += DEV_ADD_BIG_MONEY;
   devRefresh();
});

devAddShardsSmall.addEventListener('click', () => {
   state.shards += DEV_ADD_SMALL_SHARDS;
   devRefresh();
});

devAddShardsBig.addEventListener('click', () => {
   state.shards += DEV_ADD_BIG_SHARDS;
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
   setSpawnSpeedToMinimum();
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
   setAllUpgradesLevel(5);

   upgradeOldItemsToStartLevel();
   restartSpawnTimer();
   devRefresh();
});

devAddMerge.addEventListener('click', () => {
   addMergeProgress();
   devRefresh();
});

devForceLevelUp.addEventListener('click', () => {
   state.mergeProgress = state.mergesNeeded - 1;
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
   if (!state.draggedItem) return;

   moveDraggedItem(event.clientX, event.clientY);
   clearHighlights();

   const cell = getCellUnderPointer(event.clientX, event.clientY);
   if (!cell) return;

   const targetItem = getItemByCellIndex(Number(cell.dataset.index));
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
      state.draggedItem = null;
      return;
   }

   const targetCellIndex = Number(cell.dataset.index);
   const targetItem = getItemByCellIndex(targetCellIndex);

   if (targetItem && targetItem.level === state.draggedItem.level) {
      mergeItems(targetItem);
      return;
   }

   if (targetItem && targetItem.level !== state.draggedItem.level) {
      flashError(targetItem, cell, state.draggedItem);
      returnToOriginalCell();
      state.draggedItem = null;
      return;
   }

   if (!targetItem) {
      cell.appendChild(state.draggedItem.element);
      state.draggedItem.cellIndex = targetCellIndex;
      resetDraggedStyles();
      state.draggedItem = null;
      updateUI();
      saveGame();
      return;
   }

   returnToOriginalCell();
   state.draggedItem = null;
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

if (!loaded || state.items.length === 0) {
   createItem(1, null, false);
   createItem(1, null, false);
}

restartSpawnTimer();
updateUI();
updateSpawnProgressBar();
