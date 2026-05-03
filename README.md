# Merge Clicker

Um protótipo de jogo incremental web baseado em mecânicas de **merge**, evolução de objetos e geração automática de recursos.

O jogador combina formas iguais para criar formas de nível superior, aumentar sua produção de polígonos, desbloquear melhorias e evoluir seu progresso com uma moeda especial chamada **Estilhaços**.

> Projeto inspirado em **Scrap Clicker 2**.

---

## 🎮 Sobre o jogo

Merge Clicker é um jogo simples feito com **HTML, CSS e JavaScript**, criado como protótipo para testar mecânicas de progressão incremental.

A principal mecânica consiste em arrastar objetos dentro de uma grade e combinar dois objetos do mesmo nível. Ao fazer isso, eles se transformam em um novo objeto de nível maior, gerando mais recursos por segundo.

---

## 🧩 Mecânicas principais

- Sistema de **merge** por arrastar e soltar
- Grade de jogo em formato **4x4**
- Objetos gerados automaticamente com base em uma barra de spawn
- Geração automática de **Polígonos**
- Sistema de **Level Up** baseado na quantidade de combinações
- Moeda especial: **Estilhaços**
- Multiplicador de ganho baseado na quantidade de Estilhaços
- Objetos dourados com bônus permanente de ganho
- Sistema de upgrades para melhorar a progressão

---

## 💠 Recursos do jogo

### Polígonos

Os **Polígonos** são a moeda principal do jogo.  
Eles são gerados automaticamente pelos objetos presentes na grade.

Quanto maior o nível do objeto, maior será sua geração de polígonos.

### Estilhaços

Os **Estilhaços** são uma moeda especial recebida ao subir de nível.  
Eles aumentam o multiplicador geral de ganho de polígonos.

### Objetos dourados

Objetos dourados geram mais polígonos de forma permanente.  
Ao serem combinados, o bônus dourado continua no novo objeto gerado.

---

## ⬆️ Melhorias disponíveis

O jogo possui uma loja com melhorias básicas, como:

- Redução do tempo de spawn
- Aumento do nível inicial dos objetos
- Chance de gerar dois objetos ao mesmo tempo
- Chance de ativar bônus de ganho 2x
- Chance de gerar objetos dourados

---

## ⚙️ Configurações e ferramentas

O jogo possui uma tela de configurações com abas para:

- Estatísticas gerais
- Ajuda/tutorial
- Reset do progresso
- Ferramentas de desenvolvimento

As ferramentas de desenvolvimento foram adicionadas para facilitar testes de balanceamento, geração de recursos e validação de novas funcionalidades.

---

## 💾 Salvamento automático

O progresso do jogador é salvo automaticamente no navegador usando `localStorage`.

São salvos dados como:

- Polígonos
- Estilhaços
- Level atual
- Objetos na grade
- Melhorias compradas
- Progresso de combinações

---

## 📱 Responsividade

O jogo foi pensado para funcionar em diferentes tamanhos de tela, com foco em:

- Telas de computador
- Simulações mobile no navegador
- Dispositivos menores
- Footer flutuante
- Interface compacta para telas reduzidas

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura principal da página.
- **CSS3** — estilos visuais, animações e responsividade.
- **JavaScript** — lógica do jogo, sistemas internos e interações.
- **LocalStorage** — salvamento automático do progresso no navegador.
- **Git/GitHub** — versionamento, branches, commits e organização do desenvolvimento.

---

## 📁 Estrutura do projeto

```txt
MERGE-WEB-GAME/
├── src/
│   ├── css/
│   │   ├── animations.css
│   │   ├── responsive.css
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── actions/
│   │   │   ├── gameActions.js
│   │   │   └── shopActions.js
│   │   │
│   │   ├── config/
│   │   │   └── upgradeConfig.js
│   │   │
│   │   ├── core/
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── state.js
│   │   │   └── texts.js
│   │   │
│   │   ├── dev/
│   │   │   └── devTools.js
│   │   │
│   │   ├── persistence/
│   │   │   └── save.js
│   │   │
│   │   ├── systems/
│   │   │   ├── boardInput.js
│   │   │   ├── drag.js
│   │   │   ├── economy.js
│   │   │   ├── grid.js
│   │   │   ├── income.js
│   │   │   ├── level.js
│   │   │   ├── merge.js
│   │   │   ├── spawn.js
│   │   │   └── upgrades.js
│   │   │
│   │   ├── ui/
│   │   │   ├── effects.js
│   │   │   ├── panels.js
│   │   │   └── ui.js
│   │   │
│   │   ├── utils/
│   │   │   └── format.js
│   │   │
│   │   └── main.js
│
├── index.html
└── README.md
```

A estrutura foi organizada em módulos para separar responsabilidades, facilitando manutenção, testes e expansão do jogo.

---

## 🚧 Status do projeto

O projeto está em desenvolvimento ativo.

Atualmente, o jogo já possui uma base funcional com:

- Sistema de merge por arrastar e soltar.
- Geração automática de objetos.
- Economia baseada em Polígonos.
- Sistema de Level Up.
- Moeda especial chamada Estilhaços.
- Loja com melhorias básicas.
- Tela de configurações com abas.
- Sistema de salvamento automático.
- Interface responsiva.
- Ferramentas de desenvolvimento para testes.
- Código modularizado em arquivos separados por responsabilidade.

O foco atual do projeto está em melhorar a organização interna, ajustar a responsividade, balancear a economia e preparar a base para novas camadas de progressão.

---

## 📌 Próximas ideias

Algumas ideias planejadas ou consideradas:

- Upgrades especiais usando Estilhaços.
- Sistema de tiers.
- Novas formas, ciclos visuais e efeitos de progressão.
- Configurações para ativar ou desativar popups.
- Melhorias no sistema de balanceamento.
- Mais ferramentas de teste para desenvolvimento.
- Melhorias na experiência mobile.
- Possível versão instalável como PWA.
- Separação ainda maior entre lógica, interface e configuração.

---

## 🧠 Objetivo do projeto

Este projeto foi criado com o objetivo de praticar desenvolvimento web, lógica de jogos incrementais, organização de código e construção gradual de sistemas interativos.

Além de funcionar como um jogo simples, ele também serve como laboratório para testar ideias de design, progressão, economia, responsividade, modularização e experiência do usuário.

---