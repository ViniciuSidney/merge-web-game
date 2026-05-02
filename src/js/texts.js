// ===============================
// 2.1 TEXTOS DO JOGO
// ===============================

export const TEXTS = {
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
      addPolygonsSmall: (amount) => `+${amount} Polígonos`,
      addPolygonsBig: (amount) => `+${amount} Polígonos`,
      addShardsSmall: (amount) => `+${amount} Estilhaços`,
      addShardsBig: (amount) => `+${amount} Estilhaços`,
   },
};
