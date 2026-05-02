// ===============================
// 3. ESTADO DO JOGO
// ===============================

export const state = {
   money: 0,
   shards: 0,

   playerLevel: 1,
   mergeProgress: 0,
   mergesNeeded: 5,

   cells: [],
   items: [],

   draggedItem: null,
   originalCellIndex: null,
   offsetX: 0,
   offsetY: 0,

   spawnProgress: 0,
   saveTextTimer: null,
};

export function resetState() {
   state.money = 0;
   state.shards = 0;

   state.playerLevel = 1;
   state.mergeProgress = 0;
   state.mergesNeeded = 5;

   state.cells = [];
   state.items = [];

   state.draggedItem = null;
   state.originalCellIndex = null;
   state.offsetX = 0;
   state.offsetY = 0;

   state.spawnProgress = 0;
   state.saveTextTimer = null;
}
