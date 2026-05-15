export const SPECIAL_UPGRADES = {
   polygonBoost: {
      name: 'Polígonos lapidados',
      description: 'Aumenta o ganho geral de polígonos.',
      baseCost: 10,
      costMultiplier: 2,
      currency: 'shards',
      effectPerLevel: 0.05,
      maxLevel: 50,
   },

   shardRewardBoost: {
      name: 'Coleta refinada',
      description: 'Aumenta a quantidade de estilhaços recebidos ao subir de level.',
      baseCost: 25,
      costMultiplier: 2,
      currency: 'shards',
      effectPerLevel: 1,
      maxLevel: 25,
   },

   goldenPower: {
      name: 'Núcleo dourado',
      description: 'Aumenta o multiplicador dos objetos dourados.',
      baseCost: 50,
      costMultiplier: 2,
      currency: 'shards',
      effectPerLevel: 0.1,
      maxLevel: 30,
   },
};