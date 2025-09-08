import { informacoesEstudos, salvarDisciplina, calcularProgresso } from './data.js'

const lista = document.getElementById('listaDisciplina')

export function mostrarDisciplina(planejadorEstudo) {
  const cardDisciplina = criarElementos(planejadorEstudo)
  lista.appendChild(cardDisciplina)
  salvarDisciplina()
}

function criarElementos(planejadorEstudo) {
  const cardDisciplina = document.createElement('li')
  cardDisciplina.className = 'disciplina-card'

  const cardHeader = document.createElement('div')
  cardHeader.className = 'card-header'

  const nomeDisciplinaEl = document.createElement('h3')
  nomeDisciplinaEl.className = 'disciplina-nome'
  nomeDisciplinaEl.textContent = planejadorEstudo.nome
  cardHeader.appendChild(nomeDisciplinaEl)

  const cardInfo = document.createElement('div')
  cardInfo.className = 'card-info'

  const metaHoras = document.createElement('div')
  metaHoras.className = 'info-item'
  metaHoras.innerHTML = `
      <span class="info-label">Meta de hora de estudo:</span>
      <span class="info-value">${planejadorEstudo.meta} horas</span>
  `

  const horasEstudadasEl = document.createElement('div')
  horasEstudadasEl.className = 'info-item'
  horasEstudadasEl.innerHTML = `
      <span class="info-label">Horas estudando:</span>
      <span class="info-value horas-estudadas">${planejadorEstudo.horasEstudadas} horas</span>
  `

  cardInfo.appendChild(metaHoras)
  cardInfo.appendChild(horasEstudadasEl)

  const progressoContainer = document.createElement('div')
  progressoContainer.className = 'progresso-container'

  const progressoLabel = document.createElement('div')
  progressoLabel.className = 'progresso-label'

  const progresso = calcularProgresso(planejadorEstudo)
  progressoLabel.innerHTML = `
      <span>Progresso:</span>
      <span class="progresso-porcentagem">${progresso.toFixed(1)}%</span>
  `

  const progressoBar = document.createElement('div')
  progressoBar.className = 'progresso-bar'

  const progressoFill = document.createElement('div')
  progressoFill.className = 'progresso-fill'
  progressoFill.style.width = `${Math.min(progresso, 100)}%`

  progressoBar.appendChild(progressoFill)
  progressoContainer.appendChild(progressoLabel)
  progressoContainer.appendChild(progressoBar)

  const inputHoras = document.createElement('input')
  inputHoras.type = 'number'
  inputHoras.placeholder = 'Adicionar horas estudadas...'
  inputHoras.min = '0.5'
  inputHoras.max = '24'
  inputHoras.step = '0.5'
  inputHoras.className = 'input-horas'

  const cardActions = document.createElement('div')
  cardActions.className = 'card-actions'

  const botaoAtualizar = document.createElement('button')
  botaoAtualizar.textContent = 'Atualizar'
  botaoAtualizar.className = 'btn-atualizar'

  const botaoExcluir = document.createElement('button')
  botaoExcluir.textContent = 'Excluir'
  botaoExcluir.className = 'btn-excluir'

  cardActions.appendChild(botaoAtualizar)
  cardActions.appendChild(botaoExcluir)

  botaoAtualizar.addEventListener('click', () => {
    const horasAdicionais = parseFloat(inputHoras.value)

    if (!horasAdicionais || horasAdicionais <= 0) {
      alert('Insira um valor válido para as horas estudadas!')
      return
    }

    planejadorEstudo.horasEstudadas += horasAdicionais
    atualizarCardExibicao(cardDisciplina, planejadorEstudo)
    inputHoras.value = ''
    salvarDisciplina()
  })

  botaoExcluir.addEventListener('click', () => {
    cardDisciplina.remove()
    const indice = informacoesEstudos.indexOf(planejadorEstudo)
    if (indice > -1) informacoesEstudos.splice(indice, 1)
    salvarDisciplina()
  })

  cardDisciplina.appendChild(cardHeader)
  cardDisciplina.appendChild(cardInfo)
  cardDisciplina.appendChild(progressoContainer)
  cardDisciplina.appendChild(inputHoras)
  cardDisciplina.appendChild(cardActions)

  return cardDisciplina
}

export function atualizarCardExibicao(cardElement, planejadorEstudo) {
  const horasEstudadasEl = cardElement.querySelector('.horas-estudadas')
  horasEstudadasEl.textContent = `${planejadorEstudo.horasEstudadas} horas`

  const progresso = calcularProgresso(planejadorEstudo)
  const progressoPorcentagem = cardElement.querySelector('.progresso-porcentagem')
  const progressoFill = cardElement.querySelector('.progresso-fill')

  progressoPorcentagem.textContent = `${progresso.toFixed(1)}%`
  progressoFill.style.width = `${Math.min(progresso, 100)}%`
}
