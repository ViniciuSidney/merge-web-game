# 🗺️ Roadmap — Merge Web Game

Este arquivo organiza as próximas etapas de desenvolvimento do **Merge Web Game**, separando o projeto por versões, objetivos e listas de implementação.

A ideia é evoluir o jogo em blocos claros, mantendo cada versão com um foco principal.

---

## ✅ Estado atual do projeto

O jogo já possui uma base funcional com:

- Sistema de merge por arrastar e soltar.
- Grid 4x4.
- Geração automática de objetos.
- Economia principal com Polígonos.
- Sistema de Level Up por combinações.
- Moeda especial chamada Estilhaços.
- Multiplicador baseado em Estilhaços.
- Loja com melhorias básicas.
- Objetos dourados.
- Popups e efeitos visuais.
- Salvamento automático via LocalStorage.
- Footer reorganizado.
- Tela de configurações com abas.
- Estatísticas, ajuda, reset e ferramentas de dev dentro das configurações.
- Responsividade inicial para diferentes tamanhos de tela.
- Código modularizado em pastas e arquivos separados por responsabilidade.

---

# 📌 Versões planejadas

---

## 🧱 v0.6 — Consolidação da base modular

### Objetivo

Garantir que a base atual do jogo esteja limpa, funcional e sem sobras antigas após as refatorações recentes.

### Implementações e ajustes

- [ ] Remover referências antigas da lixeira, caso ela tenha sido retirada definitivamente.
- [ ] Corrigir erros restantes no console.
- [ ] Revisar imports entre arquivos JavaScript.
- [ ] Conferir dependências entre módulos.
- [ ] Revisar separação de responsabilidades entre:
  - `core/`
  - `systems/`
  - `ui/`
  - `actions/`
  - `dev/`
  - `persistence/`
  - `utils/`
- [ ] Padronizar nomes de funções.
- [ ] Padronizar nomes de arquivos.
- [ ] Revisar funções duplicadas ou pouco utilizadas.
- [ ] Testar fluxo principal do jogo:
  - Spawn de objetos.
  - Merge.
  - Ganho automático.
  - Level Up.
  - Compra de upgrades.
  - Salvamento automático.
  - Carregamento do save.
- [ ] Atualizar documentação se necessário.

### Critério para fechar a versão

A versão pode ser fechada quando o jogo rodar sem erros no console e a estrutura modular estiver coerente.

---

## ⚙️ v0.7 — Configurações funcionais

### Objetivo

Transformar a tela de configurações em uma área útil para o jogador controlar preferências visuais e comportamentos do jogo.

### Implementações e ajustes

- [ ] Criar aba de Preferências ou Visual.
- [ ] Adicionar opção para ativar/desativar popups de dinheiro.
- [ ] Adicionar opção para ativar/desativar animações.
- [ ] Adicionar opção para reduzir efeitos visuais.
- [ ] Adicionar opção para modo compacto/manual.
- [ ] Salvar preferências no LocalStorage.
- [ ] Aplicar preferências automaticamente ao carregar o jogo.
- [ ] Melhorar organização visual das abas.
- [ ] Criar textos curtos explicando cada opção.
- [ ] Revisar responsividade da tela de configurações.

### Critério para fechar a versão

A versão pode ser fechada quando o jogador conseguir alterar preferências visuais e essas escolhas forem salvas corretamente.

---

## 💠 v0.8 — Upgrades especiais com Estilhaços

### Objetivo

Dar uma função mais estratégica para os Estilhaços, transformando-os em uma moeda usada em melhorias especiais.

### Implementações e ajustes

- [ ] Criar aba de Melhorias Especiais na loja.
- [ ] Separar melhorias básicas e especiais.
- [ ] Criar upgrades comprados com Estilhaços.
- [ ] Criar sistema de custo próprio para upgrades especiais.
- [ ] Adicionar upgrades especiais iniciais, como:
  - [ ] Aumentar multiplicador de Polígonos.
  - [ ] Aumentar recompensa de Level Up.
  - [ ] Reduzir requisito de combinações para Level Up.
  - [ ] Melhorar chance de Objeto Dourado.
  - [ ] Aumentar bônus recebido ao combinar objetos.
- [ ] Atualizar a interface da loja.
- [ ] Atualizar o save para incluir upgrades especiais.
- [ ] Ajustar balanceamento inicial dos Estilhaços.

### Critério para fechar a versão

A versão pode ser fechada quando os Estilhaços deixarem de ser apenas multiplicador passivo e passarem a ser usados em decisões de melhoria.

---

## 🧬 v0.9 — Sistema de Tier

### Objetivo

Criar uma nova camada de progressão acima dos níveis normais dos objetos.

### Implementações e ajustes

- [ ] Criar sistema de Tier.
- [ ] Definir regra para subida de Tier.
- [ ] Relacionar Tier com ciclos visuais dos objetos.
- [ ] Criar selo visual de Tier.
- [ ] Diferenciar ciclo e Tier.
- [ ] Criar bônus ou multiplicador por Tier.
- [ ] Atualizar textos do jogo para explicar o sistema.
- [ ] Atualizar popups para indicar avanços importantes.
- [ ] Atualizar tela de ajuda.
- [ ] Atualizar README se necessário.

### Critério para fechar a versão

A versão pode ser fechada quando os objetos possuírem nível, ciclo visual e Tier funcionando juntos.

---

## 🏁 v1.0 — Primeira versão completa jogável

### Objetivo

Fechar uma versão sólida, jogável e apresentável para testes externos.

### Implementações e ajustes

- [ ] Revisar toda a economia.
- [ ] Ajustar custos dos upgrades.
- [ ] Ajustar velocidade de progressão.
- [ ] Revisar responsividade geral.
- [ ] Melhorar tela de ajuda.
- [ ] Melhorar feedback visual dos merges.
- [ ] Revisar popups e efeitos visuais.
- [ ] Revisar salvamento automático.
- [ ] Testar o jogo do zero até níveis mais altos.
- [ ] Criar changelog da versão.
- [ ] Criar tag no GitHub.
- [ ] Publicar versão online, se desejado.

### Critério para fechar a versão

A versão pode ser fechada quando o jogo puder ser enviado para outra pessoa testar sem precisar de explicações externas.

---

# 🔮 Ideias para versões futuras

---

## 🎯 v1.1 — Sistema de missões

### Ideia geral

Adicionar objetivos para guiar o jogador e dar pequenas recompensas.

### Possíveis missões

- [ ] Fazer certa quantidade de merges.
- [ ] Chegar a determinado nível de objeto.
- [ ] Comprar certa quantidade de upgrades.
- [ ] Gerar determinada quantidade de Polígonos.
- [ ] Subir de Level algumas vezes.
- [ ] Conseguir um Objeto Dourado.

---

## 📚 v1.2 — Coleção de formas

### Ideia geral

Criar uma galeria com os objetos já desbloqueados.

### Possibilidades

- [ ] Registrar maior nível já alcançado.
- [ ] Exibir formas desbloqueadas.
- [ ] Criar nomes para ciclos ou grupos de níveis.
- [ ] Adicionar recompensas por descoberta.
- [ ] Criar progresso de coleção.

---

## 🔁 v1.3 — Prestígio

### Ideia geral

Adicionar uma mecânica de reinício avançado com recompensas permanentes.

### Possibilidades

- [ ] Criar reset voluntário.
- [ ] Criar nova moeda de prestígio.
- [ ] Criar upgrades permanentes.
- [ ] Aumentar profundidade incremental.
- [ ] Criar novas metas de longo prazo.

---

## 🔊 v1.4 — Sons e feedback sensorial

### Ideia geral

Adicionar sons e feedbacks para melhorar a sensação de jogo.

### Possibilidades

- [ ] Som de merge.
- [ ] Som de compra.
- [ ] Som de Level Up.
- [ ] Som de erro.
- [ ] Som de Objeto Dourado.
- [ ] Opção para ativar/desativar sons nas configurações.

---

## 📱 v1.5 — PWA / versão instalável

### Ideia geral

Transformar o jogo em uma aplicação instalável.

### Possibilidades

- [ ] Criar `manifest.json`.
- [ ] Adicionar ícones.
- [ ] Criar Service Worker.
- [ ] Permitir funcionamento offline.
- [ ] Permitir instalação como app no celular ou computador.

---

# 🧪 Checklist de testes gerais

Use esta lista antes de fechar cada versão:

- [ ] O jogo abre sem erros no console.
- [ ] O spawn automático funciona.
- [ ] O merge funciona.
- [ ] O ganho automático funciona.
- [ ] Os upgrades funcionam.
- [ ] O Level Up funciona.
- [ ] Os Estilhaços são recebidos corretamente.
- [ ] O save funciona.
- [ ] O carregamento do save funciona.
- [ ] As telas laterais abrem e fecham corretamente.
- [ ] A responsividade foi testada em tamanhos diferentes.
- [ ] O README foi atualizado, se necessário.
- [ ] O Roadmap foi atualizado, se necessário.

---

# 🧭 Ordem recomendada de desenvolvimento

1. **v0.6 — Consolidação da base modular**
2. **v0.7 — Configurações funcionais**
3. **v0.8 — Upgrades especiais com Estilhaços**
4. **v0.9 — Sistema de Tier**
5. **v1.0 — Primeira versão completa jogável**

---

## 📌 Observação

Este Roadmap pode ser ajustado conforme o projeto evoluir.  
A prioridade é manter o desenvolvimento organizado, incremental e fácil de acompanhar.