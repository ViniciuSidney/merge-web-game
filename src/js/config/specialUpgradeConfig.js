export const SPECIAL_UPGRADES = {
   polygonBoost: {
      name: 'Polígonos lapidados',
      description: 'Aumenta o ganho geral de polígonos em 5% por nível.',
      baseCost: 5,
      costMultiplier: 1.5,
      currency: 'shards',
      effectPerLevel: 0.05,
      maxLevel: 40,
   },

   shardRewardBoost: {
      name: 'Coleta refinada',
      description: 'Aumenta em +1 a quantidade de estilhaços recebidos ao subir de level.',
      baseCost: 15,
      costMultiplier: 1.75,
      currency: 'shards',
      effectPerLevel: 1,
      maxLevel: 20,
   },

   goldenPower: {
      name: 'Núcleo dourado',
      description: 'Aumenta em +0.1x o multiplicador dos objetos dourados.',
      baseCost: 20,
      costMultiplier: 1.8,
      currency: 'shards',
      effectPerLevel: 0.1,
      maxLevel: 25,
   },
};