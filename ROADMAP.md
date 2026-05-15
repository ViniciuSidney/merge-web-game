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
- Loja com melhorias especiais usando Estilhaços.
- Objetos dourados com multiplicador dinâmico.
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

## ✅ v0.1 até v0.5 — Base inicial do jogo

### Objetivo

Construir a base funcional do Merge Web Game.

### Implementações principais

- [x] Criar estrutura inicial em HTML, CSS e JavaScript.
- [x] Criar grid 4x4.
- [x] Criar objetos combináveis.
- [x] Implementar sistema de merge.
- [x] Implementar geração automática de objetos.
- [x] Implementar geração automática de Polígonos.
- [x] Criar sistema de upgrades básicos.
- [x] Criar objetos dourados.
- [x] Criar sistema de Level Up.
- [x] Criar moeda especial: Estilhaços.
- [x] Criar sistema de salvamento automático.
- [x] Criar ferramentas de desenvolvimento.
- [x] Melhorar responsividade inicial.
- [x] Modularizar o código em arquivos separados.
- [x] Criar footer simplificado.
- [x] Criar tela de configurações com abas.

### Status

Base funcional concluída.

---

## 💠 v0.6 — Melhorias Especiais com Estilhaços

### Objetivo

Dar uma função mais estratégica para os Estilhaços, transformando-os em uma moeda usada em melhorias especiais.

### Implementações e ajustes

- [x] Criar configuração própria para melhorias especiais.
- [x] Criar níveis de melhorias especiais no estado do jogo.
- [x] Criar cálculo de custo para melhorias especiais.
- [x] Criar função de compra usando Estilhaços.
- [x] Salvar melhorias especiais no LocalStorage.
- [x] Carregar melhorias especiais ao iniciar o jogo.
- [x] Aplicar bônus de ganho geral de Polígonos.
- [x] Aplicar bônus de recompensa de Estilhaços.
- [x] Aplicar multiplicador especial para objetos dourados.
- [x] Criar aba de melhorias especiais na loja.
- [x] Separar melhorias básicas e especiais.
- [x] Criar cards próprios para melhorias especiais.
- [x] Mostrar efeito atual e próximo efeito.
- [x] Mostrar nível atual e nível máximo.
- [x] Atualizar estatísticas com bônus especiais.
- [x] Atualizar ajuda com explicação das melhorias especiais.
- [x] Atualizar texto dos objetos dourados com multiplicador dinâmico.
- [x] Atualizar visual dos objetos dourados ao carregar o jogo.
- [x] Fazer balanceamento inicial dos custos e efeitos.

### Melhorias especiais atuais

- **Polígonos lapidados**  
  Aumenta o ganho geral de Polígonos.

- **Coleta refinada**  
  Aumenta a quantidade de Estilhaços recebidos ao subir de level.

- **Núcleo dourado**  
  Aumenta o multiplicador dos objetos dourados.

### Critério para fechar a versão

A versão pode ser fechada quando:

- As melhorias especiais puderem ser compradas corretamente.
- Os Estilhaços forem gastos corretamente.
- Os efeitos forem aplicados na economia.
- O save carregar os upgrades especiais sem erros.
- Os objetos dourados exibirem o multiplicador correto.
- A loja, estatísticas e ajuda estiverem atualizadas.

### Status

Em fase final de teste e documentação.

---

## 🧹 Manutenção contínua — Organização e estabilidade

### Objetivo

Manter o projeto limpo, estável e fácil de evoluir durante o desenvolvimento das próximas versões.

Essa etapa não será tratada como uma versão isolada, mas sim como uma prática contínua aplicada junto das novas implementações.

### Ajustes contínuos

- [ ] Corrigir erros no console sempre que aparecerem.
- [ ] Revisar imports entre arquivos JavaScript.
- [ ] Conferir dependências entre módulos.
- [ ] Remover funções duplicadas ou pouco utilizadas.
- [ ] Verificar imports não utilizados.
- [ ] Padronizar nomes de funções e arquivos quando necessário.
- [ ] Manter cada arquivo com responsabilidade clara.
- [ ] Evitar que arquivos de interface executem lógica pesada de jogo.
- [ ] Evitar que arquivos de sistema manipulem DOM sem necessidade.
- [ ] Atualizar README e Roadmap quando houver mudanças importantes.
- [ ] Testar fluxo principal após alterações relevantes.

### Checklist de estabilidade

- [ ] Spawn de objetos funcionando.
- [ ] Merge funcionando.
- [ ] Ganho automático funcionando.
- [ ] Level Up funcionando.
- [ ] Upgrades básicos funcionando.
- [ ] Melhorias especiais funcionando.
- [ ] Salvamento funcionando.
- [ ] Carregamento do save funcionando.
- [ ] Loja funcionando.
- [ ] Configurações funcionando.
- [ ] Console sem erros críticos.

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
- [ ] Adicionar opção para ativar/desativar sons futuramente.
- [ ] Salvar preferências no LocalStorage.
- [ ] Aplicar preferências automaticamente ao carregar o jogo.
- [ ] Melhorar organização visual das abas.
- [ ] Criar textos curtos explicando cada opção.
- [ ] Revisar responsividade da tela de configurações.

### Critério para fechar a versão

A versão pode ser fechada quando o jogador conseguir alterar preferências visuais e essas escolhas forem salvas corretamente.

---

## 🧬 v0.8 — Sistema de Tier

### Objetivo

Criar uma nova camada de progressão acima dos níveis normais dos objetos.

### Implementações e ajustes

- [ ] Criar sistema de Tier.
- [ ] Definir regra para subida de Tier.
- [ ] Relacionar Tier com ciclos visuais dos objetos.
- [ ] Criar selo visual de Tier.
- [ ] Diferenciar nível, ciclo visual e Tier.
- [ ] Criar bônus ou multiplicador por Tier.
- [ ] Atualizar textos do jogo para explicar o sistema.
- [ ] Atualizar popups para indicar avanços importantes.
- [ ] Atualizar tela de ajuda.
- [ ] Atualizar README se necessário.

### Critério para fechar a versão

A versão pode ser fechada quando os objetos possuírem nível, ciclo visual e Tier funcionando juntos.

---

## 🧪 v0.9 — Refinamento geral e preparação para v1.0

### Objetivo

Revisar o jogo como um todo antes da primeira versão completa jogável.

### Implementações e ajustes

- [ ] Revisar balanceamento dos upgrades básicos.
- [ ] Revisar balanceamento das melhorias especiais.
- [ ] Ajustar ritmo de ganho de Polígonos.
- [ ] Ajustar ritmo de ganho de Estilhaços.
- [ ] Revisar progressão de Level Up.
- [ ] Melhorar feedback visual dos merges.
- [ ] Revisar popups e efeitos visuais.
- [ ] Ajustar responsividade em telas pequenas e grandes.
- [ ] Revisar textos da interface.
- [ ] Revisar aba de ajuda.
- [ ] Testar o jogo com save limpo.
- [ ] Testar o jogo com save avançado.
- [ ] Corrigir bugs encontrados durante os testes.

### Critério para fechar a versão

A versão pode ser fechada quando o jogo estiver estável, equilibrado e pronto para receber uma revisão final antes da v1.0.

---

## 🏁 v1.0 — Primeira versão completa jogável

### Objetivo

Fechar uma versão sólida, jogável e apresentável para testes externos.

### Implementações e ajustes

- [ ] Revisar toda a economia.
- [ ] Ajustar custos dos upgrades básicos.
- [ ] Ajustar custos dos upgrades especiais.
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

### Possibilidades

- [ ] Fazer certa quantidade de merges.
- [ ] Chegar a determinado nível de objeto.
- [ ] Comprar certa quantidade de upgrades.
- [ ] Comprar certa quantidade de melhorias especiais.
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
- [ ] Os upgrades básicos funcionam.
- [ ] As melhorias especiais funcionam.
- [ ] O Level Up funciona.
- [ ] Os Estilhaços são recebidos corretamente.
- [ ] O save funciona.
- [ ] O carregamento do save funciona.
- [ ] As telas laterais abrem e fecham corretamente.
- [ ] As abas da loja funcionam corretamente.
- [ ] As abas de configurações funcionam corretamente.
- [ ] A responsividade foi testada em tamanhos diferentes.
- [ ] O README foi atualizado, se necessário.
- [ ] O Roadmap foi atualizado, se necessário.

---

# 🧭 Ordem recomendada de desenvolvimento

1. **v0.6 — Melhorias Especiais com Estilhaços**
2. **v0.7 — Configurações funcionais**
3. **v0.8 — Sistema de Tier**
4. **v0.9 — Refinamento geral e preparação para v1.0**
5. **v1.0 — Primeira versão completa jogável**

---

## 📌 Observação

A manutenção do código será feita de forma contínua durante todas as versões.

Sempre que uma nova funcionalidade for criada, também poderão ser feitos ajustes de organização, limpeza, correção de bugs e melhorias internas.