let informacoesEstudos = [];

const nomeDisciplina = document.getElementById('disciplinaNome')
const horasMeta = document.getElementById('horas')
const adicionarBotao = document.getElementById('adicionar-btn')
const lista = document.getElementById('listaDisciplina')

adicionarBotao.addEventListener('click', (e) => {
    e.preventDefault()

    let planejadorEstudo = {
        nome: nomeDisciplina.value,
        meta: parseInt(horasMeta.value),
        horasEstudadas: 0
    }

    if(planejadorEstudo.nome && planejadorEstudo.meta){
        informacoesEstudos.push(planejadorEstudo)
        mostrarDisciplina(planejadorEstudo)
        limparInputs()
    } else {
        window.alert('Preencha os campos!!!')
    }
})

function mostrarDisciplina(planejadorEstudo) {
    const cardDisciplina = criarElementos(planejadorEstudo)
    lista.appendChild(cardDisciplina)
    salvarDisciplina() 
}

function criarElementos(planejadorEstudo) {
    // Criar o card principal
    const cardDisciplina = document.createElement('li')
    cardDisciplina.className = 'disciplina-card'
    
    // Header do card com o nome da disciplina
    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'
    
    const nomeDisciplinaEl = document.createElement('h3')
    nomeDisciplinaEl.className = 'disciplina-nome'
    nomeDisciplinaEl.textContent = planejadorEstudo.nome
    
    cardHeader.appendChild(nomeDisciplinaEl)
    
    // Informações da disciplina
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
    
    // Container de progresso
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
    
    // Input para adicionar horas
    const inputHoras = document.createElement('input')
    inputHoras.type = 'number'
    inputHoras.placeholder = 'Adicionar horas estudadas...'
    inputHoras.min = '0.5'
    inputHoras.max = '24'
    inputHoras.step = '0.5'
    inputHoras.className = 'input-horas'
    
    // Botões de ação
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
    
    // Event listeners
    botaoAtualizar.addEventListener('click', () => {
        const horasAdicionais = parseFloat(inputHoras.value)
        
        if (!horasAdicionais || horasAdicionais <= 0) {
            alert('Insira um valor válido para as horas estudadas!')
            return
        }
        
        // Atualiza o objeto
        planejadorEstudo.horasEstudadas += horasAdicionais
        
        // Atualiza a exibição
        atualizarCardExibicao(cardDisciplina, planejadorEstudo)
        
        // Limpa o input
        inputHoras.value = ''
        
        salvarDisciplina()
    })
    
    botaoExcluir.addEventListener('click', () => {
        // Remove do DOM
        cardDisciplina.remove()
        
        // Remove do array
        const indice = informacoesEstudos.indexOf(planejadorEstudo)
        if(indice > -1) informacoesEstudos.splice(indice, 1)
        
        salvarDisciplina()
    })
    
    // Montagem final do card
    cardDisciplina.appendChild(cardHeader)
    cardDisciplina.appendChild(cardInfo)
    cardDisciplina.appendChild(progressoContainer)
    cardDisciplina.appendChild(inputHoras)
    cardDisciplina.appendChild(cardActions)
    
    return cardDisciplina
}

function atualizarCardExibicao(cardElement, planejadorEstudo) {
    // Atualiza horas estudadas
    const horasEstudadasEl = cardElement.querySelector('.horas-estudadas')
    horasEstudadasEl.textContent = `${planejadorEstudo.horasEstudadas} horas`
    
    // Atualiza progresso
    const progresso = calcularProgresso(planejadorEstudo)
    const progressoPorcentagem = cardElement.querySelector('.progresso-porcentagem')
    const progressoFill = cardElement.querySelector('.progresso-fill')
    
    progressoPorcentagem.textContent = `${progresso.toFixed(1)}%`
    progressoFill.style.width = `${Math.min(progresso, 100)}%`
}

function limparInputs() {
    nomeDisciplina.value = ''
    horasMeta.value = ''
}

function calcularProgresso(planejadorEstudo) {
    if (planejadorEstudo.horasEstudadas === 0 || !planejadorEstudo.horasEstudadas){
        return 0
    }

    const tempoGastoEstudando = planejadorEstudo.horasEstudadas
    const metaTempoEstudo = planejadorEstudo.meta 
    const progresso = (tempoGastoEstudando / metaTempoEstudo) * 100

    return progresso
}

// Função para salvar disciplinas (usando variável em memória ao invés de localStorage)
function salvarDisciplina() {
    // Para demonstração, apenas mantém os dados em memória
    console.log('Dados salvos:', informacoesEstudos)
}

function carregarDisciplinas() {
    // Como não podemos usar localStorage, inicia com array vazio
    informacoesEstudos = []
    console.log('Disciplinas inicializadas')
}

function carregarExibirDisciplinas() {
    carregarDisciplinas()
    
    // Limpa a lista antes de mostrar
    lista.innerHTML = ''
    
    // Exibe cada disciplina carregada
    informacoesEstudos.forEach(planejadorEstudo => {
        mostrarDisciplina(planejadorEstudo)
    })
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Página carregada, carregando disciplinas...')
    carregarExibirDisciplinas()
})