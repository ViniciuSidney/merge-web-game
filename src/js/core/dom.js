// ===============================
// 1. ELEMENTOS DO DOM
// ===============================

export const DOM = {
   game: {
      grid: document.getElementById('grid'),
      saveStatus: document.getElementById('saveStatus'),
   },

   top: {
      money: document.getElementById('money'),
      income: document.getElementById('income'),
      shards: document.getElementById('shards'),
   },

   shop: {
      openBtn: document.getElementById('openShopBtn'),
      closeBtn: document.getElementById('closeShopBtn'),
      panel: document.getElementById('shop'),
      overlay: document.getElementById('shopOverlay'),
      money: document.getElementById('shopMoney'),
      upgrades: document.getElementById('upgrades'),
   },

   spawn: {
      progressText: document.getElementById('spawnProgressText'),
      progressFill: document.getElementById('spawnProgressFill'),
      popup: document.getElementById('spawnPopup'),
   },

   level: {
      playerLevel: document.getElementById('playerLevel'),
      progressText: document.getElementById('levelProgressText'),
      progressFill: document.getElementById('levelProgressFill'),
      bonusText: document.getElementById('levelBonusText'),
      popup: document.getElementById('levelUpPopup'),
   },

   settings: {
      openBtn: document.getElementById('openSettingsBtn'),
      closeBtn: document.getElementById('closeSettingsBtn'),
      panel: document.getElementById('settingsPanel'),
      overlay: document.getElementById('settingsOverlay'),
      tabs: document.querySelectorAll('.settingsTab'),
      contents: document.querySelectorAll('.settingsContent'),
      resetBtn: document.getElementById('resetInsideBtn'),
   },

   stats: {
      spawnTime: document.getElementById('spawnTimeStat'),
      startLevel: document.getElementById('startLevelStat'),
      doubleSpawn: document.getElementById('doubleSpawnStat'),
      doubleMoney: document.getElementById('doubleMoneyStat'),
      goldenChance: document.getElementById('goldenChanceStat'),
      multiplier: document.getElementById('multiplierStat'),
      items: document.getElementById('itemsStat'),
      level: document.getElementById('levelStat'),
   },

   dev: {
      addPolygonsSmall: document.getElementById('devAddPolygonsSmall'),
      addPolygonsBig: document.getElementById('devAddPolygonsBig'),
      addShardsSmall: document.getElementById('devAddShardsSmall'),
      addShardsBig: document.getElementById('devAddShardsBig'),
      spawnOne: document.getElementById('devSpawnOne'),
      spawnGolden: document.getElementById('devSpawnGolden'),
      fillGrid: document.getElementById('devFillGrid'),
      clearGrid: document.getElementById('devClearGrid'),
      maxSpawnSpeed: document.getElementById('devMaxSpawnSpeed'),
      levelUpForm: document.getElementById('devLevelUpForm'),
      resetUpgrades: document.getElementById('devResetUpgrades'),
      allUpgrades5: document.getElementById('devAllUpgrades5'),
      addMerge: document.getElementById('devAddMerge'),
      forceLevelUp: document.getElementById('devForceLevelUp'),
      passwordInput: document.getElementById('devPasswordInput'),
      loginBtn: document.getElementById('devLoginBtn'),
      errorText: document.getElementById('devErrorText'),
      loginSection: document.getElementById('devLoginSection'),
      content: document.getElementById('devContent'),
   },
};
