// ===============================
// PANELS — LOJA E CONFIGURAÇÕES
// ===============================

// ===============================
// 1. FUNÇÕES GENÉRICAS
// ===============================

function openPanel(panel, overlay) {
   panel.classList.add('active');
   overlay.classList.add('active');
}

function closePanel(panel, overlay) {
   panel.classList.remove('active');
   overlay.classList.remove('active');
}

// ===============================
// 2. ABAS DE CONFIGURAÇÕES
// ===============================

export function setupSettingsTabs({ settingsTabs, settingsContents }) {
   settingsTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
         const selectedTab = tab.dataset.tab;

         settingsTabs.forEach((item) => {
            item.classList.remove('active');
         });

         settingsContents.forEach((content) => {
            content.classList.remove('active');
         });

         tab.classList.add('active');

         const selectedContent = document.getElementById(`tab-${selectedTab}`);

         if (selectedContent) {
            selectedContent.classList.add('active');
         }
      });
   });
}

// ===============================
// 3. PAINEL DE CONFIGURAÇÕES
// ===============================

export function setupSettingsPanel({
   openSettingsBtn,
   closeSettingsBtn,
   settingsPanel,
   settingsOverlay,
}) {
   openSettingsBtn.addEventListener('click', () => {
      openPanel(settingsPanel, settingsOverlay);
   });

   closeSettingsBtn.addEventListener('click', () => {
      closePanel(settingsPanel, settingsOverlay);
   });

   settingsOverlay.addEventListener('click', () => {
      closePanel(settingsPanel, settingsOverlay);
   });
}

// ===============================
// 4. PAINEL DA LOJA
// ===============================

export function setupShopPanel({
   openShopBtn,
   closeShopBtn,
   shop,
   shopOverlay,
}) {
   openShopBtn.addEventListener('click', () => {
      openPanel(shop, shopOverlay);
   });

   closeShopBtn.addEventListener('click', () => {
      closePanel(shop, shopOverlay);
   });

   shopOverlay.addEventListener('click', () => {
      closePanel(shop, shopOverlay);
   });
}

// ===============================
// 5. SETUP GERAL
// ===============================

export function setupPanels({
   settingsTabs,
   settingsContents,

   openSettingsBtn,
   closeSettingsBtn,
   settingsPanel,
   settingsOverlay,

   openShopBtn,
   closeShopBtn,
   shop,
   shopOverlay,
}) {
   setupSettingsTabs({
      settingsTabs,
      settingsContents,
   });

   setupSettingsPanel({
      openSettingsBtn,
      closeSettingsBtn,
      settingsPanel,
      settingsOverlay,
   });

   setupShopPanel({
      openShopBtn,
      closeShopBtn,
      shop,
      shopOverlay,
   });
}
