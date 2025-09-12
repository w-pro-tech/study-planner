# 📚 Planner de Estudos Inteligente

Um projeto em JavaScript para praticar **fundamentos** enquanto crias uma ferramenta útil para organizar e acompanhar os teus estudos.

---

## 🎯 Objetivo
Construir uma aplicação web que permita adicionar disciplinas, definir metas de estudo em horas, registrar progresso e visualizar estatísticas.

---

## 🛠️ Etapas do Projeto

### 1. Estrutura Básica (Setup)
- [x] Criar a pasta do projeto com os arquivos `index.html`, `style.css`, `script.js`.
- [x] Montar o HTML inicial com:
  - Formulário para adicionar disciplina (nome + horas meta).
  - Lista vazia onde as disciplinas aparecerão.
  - Espaço reservado para estatísticas.

---

### 2. Funcionalidades Fundamentais
- [x] Adicionar disciplina:
  - Capturar dados do formulário (nome, horas meta).
  - Criar um objeto `{ nome, meta, horasEstudadas }`.
  - Guardar no array principal.
  - Mostrar no DOM.
- [x] Remover disciplina:
  - Botão "Excluir" ao lado de cada item.
  - Atualizar array e DOM.

---

### 3. Progresso Individual
- [x] Adicionar botão ou input para registrar horas estudadas em cada disciplina.
- [x] Atualizar `horasEstudadas` no objeto correspondente.
- [x] Calcular progresso em % → `(horasEstudadas / meta) * 100`.
- [x] Mostrar barra ou texto de progresso. 

---

### 4. Persistência de Dados
- [x] Usar `localStorage` para salvar o array de disciplinas.
- [x] Carregar dados ao iniciar a aplicação.
- [ ] Atualizar sempre que algo for adicionado/removido/editado.

---

### 5. Funcionalidades Intermediárias
- [ ] Editar disciplina (alterar meta de horas).
- [ ] Filtrar lista:
  - Mostrar só **pendentes** (progresso < 100%).
  - Mostrar só **concluídas** (progresso = 100%).
- [ ] Ordenar disciplinas:
  - Por mais estudadas.
  - Por ordem alfabética.

---

### 6. Estatísticas Gerais
- [ ] Calcular total de horas já estudadas.
- [ ] Calcular total de horas que faltam.
- [ ] Exibir percentual geral de progresso.

---

### 7. Funcionalidades Avançadas (Extras)
- [ ] Sistema de **Ranking**:
  - Exibir disciplinas em ordem decrescente de horas estudadas.
- [ ] “Desafio do Dia”:
  - Mostrar mensagem aleatória motivacional ou sugestão de disciplina para focar.
- [ ] Dark Mode.
- [ ] Exportar/importar dados em JSON.

---

## 🔑 Conceitos de JS a Praticar
- Variáveis e tipos de dados.
- Objetos e arrays.
- Funções (organizar em funções pequenas e reutilizáveis).
- Condições (`if/else`, operadores ternários).
- Loops (`for`, `forEach`, `map`, `filter`, `reduce`, `sort`).
- DOM (selecionar, criar e remover elementos).
- EventListeners.
-  .

---

## 🚀 Estratégia de Desenvolvimento
1. **Começa simples** → adiciona e mostra disciplinas na tela.
2. **Incrementa aos poucos** → adicionar progresso, editar, filtrar.
3. **Depois evolui** → estatísticas, ranking, extras criativos.
4. **Sempre testa** cada parte antes de avançar.


https://github.com/w-pro-tech/study-planner



## Melhorias do design
**Input de adicionar Horas estudadas**
1. Colocar ***inputHoras***, ***botaoAtualizar*** e ***botaoExcluir*** na mesma linha em telas grandes e deixar separados em telas menores;



## TAREFA 1: Configuração Inicial
    - Aguardar carregamento da página (DOMContentLoaded)
    - Obter referências dos elementos: form, botões, inputs, mensagens
    - Criar variáveis para armazenar os elementos principais

##  TAREFA 2: Função de Mostrar/Ocultar Senha
    - Adicionar event listener no botão "showPassword"
    - Alternar tipo do input entre "password" e "text"
    - Alterar texto do botão entre "Mostrar" e "Ocultar"

##  TAREFA 3: Sistema de Mensagens
    - Criar função showMessage(elemento, mensagem, éErro)
    - Criar função hideMessages() para limpar todas as mensagens
    - Implementar timeout para mensagens de sucesso (3 segundos)

##  TAREFA 4: Validações
    - Criar função isValidEmail() usando regex
    - Validar campos obrigatórios (não vazios)
    - Validar formato de email
    - Validar senha mínima (6 caracteres)

##  TAREFA 5: Submissão do Formulário
    - Interceptar evento submit (preventDefault)
    - Coletar dados do FormData
    - Executar todas as validações
    - Mostrar estado de loading (botão disabled, texto "Entrando...")
    - Simular processo de login com setTimeout
    - Restaurar estado normal do botão

##  TAREFA 6: Navegação e Links
    - Event listeners para links de registro e recuperação de senha
    - Event listeners para botões de login social
    - Implementar redirecionamentos (ou simulações)

##    TAREFA 7: UX Melhorias
    - Limpar mensagens automaticamente quando usuário digitar
    - Adicionar event listeners nos inputs para esconder mensagens
    -->