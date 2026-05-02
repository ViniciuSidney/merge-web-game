// ===============================
// 4. CONFIGURAÇÕES DE UPGRADES
// ===============================

export const UPGRADE_CONFIGS = {
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
