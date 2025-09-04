let informacoesEstudos = [];

const nomeDisciplina = document.getElementById('disciplinaNome')
const horasMeta = document.getElementById('horas')
const adicionarBotao = document.getElementById('adicionar-btn')
const lista = document.getElementById('listaDisciplina')


     
adicionarBotao.addEventListener('click', (e) => {
    e.preventDefault()

    //cria um novo objeto a cada clique
    let planejadorEstudo = {
        nome: nomeDisciplina.value,
        meta: parseInt(horasMeta.value),
        horasEstudadas: 0
    }

    if(planejadorEstudo.nome && planejadorEstudo.meta){
         // guarda no array
        informacoesEstudos.push(planejadorEstudo)

        // passa o objeto pra função que mostra
        mostrarDisciplina(planejadorEstudo)
    } else {
        window.alert('Preencha os campos!!!')
    }
})


function mostrarDisciplina(planejadorEstudo) {
    criarElementos()



    
    // chama função salvarDisciplina sempre que mostrar uma nova disciplina
    salvarDisciplina() 
}


function criarElementos(planejadorEstudo) {
    const listaDisciplina = document.createElement('li')
    const informacao = document.createElement('span')
    informacao.classList.add('informacao')

    listaDisciplina.appendChild(informacao)
    atualizarExibicao(informacao, planejadorEstudo)
    
    
    return listaDisciplina
}


function limparInputs() {
    nomeDisciplina.value = ''
    horasMeta.value = ''
}


function adicionarNaTela(listaDisciplina, planejadorEstudo) {
    lista.appendChild(listaDisciplina)

    criarBotaoExcluir(listaDisciplina, planejadorEstudo)
    
    entradaHorasEstudadas(listaDisciplina, planejadorEstudo)

}



function atualizarExibicao(elementoInformacao, planejadorEstudo){
    const progresso = calcularProgresso(planejadorEstudo)
    let texto = `Nome: ${planejadorEstudo.nome} - Meta: ${planejadorEstudo.meta} horas`

    if(planejadorEstudo.horasEstudadas > 0){
        texto += ` - Horas estudadas: ${planejadorEstudo.horasEstudadas} horas - Progresso: ${progresso.toFixed(1)}%`
    }

    elementoInformacao.innerText = texto
}



function criarBotaoExcluir(listaDisciplina, planejadorEstudo) {
    const botaoExcluir = document.createElement('button')
    botaoExcluir.textContent = 'Excluir'
    listaDisciplina.appendChild(botaoExcluir)


    botaoExcluir.addEventListener('click', () => {
        // remove do DOM
        listaDisciplina.remove()

        //remove do array
        const indice = informacoesEstudos.indexOf(planejadorEstudo)
        if(indice > -1) informacoesEstudos.splice(indice, 1)
    })
}


function entradaHorasEstudadas(listaDisciplina, planejadorEstudo){
    const horaEstudada = document.createElement('input')

    horaEstudada.type = 'number'
    horaEstudada.placeholder = 'Horas estudadas...'
    horaEstudada.id = 'horasEstudadas'
    horaEstudada.min = '1'
    horaEstudada.max = '24'
    horaEstudada.step = '0.5'
    horaEstudada.required = true

    listaDisciplina.appendChild(horaEstudada)


    const botaoAtualizarObjeto = document.createElement('button')
    botaoAtualizarObjeto.textContent = 'Atualizar'
    listaDisciplina.appendChild(botaoAtualizarObjeto)


    botaoAtualizarObjeto.addEventListener('click', () => {
        if (!horaEstudada.value || horaEstudada.value <= 0){
            alert('Insira um valor válido para as horas estudadas!')
            return
        }


        // Atualiza o objeto
        planejadorEstudo.horasEstudadas = parseFloat(horaEstudada.value)
        console.log('Objeto atualizado:', planejadorEstudo)

        
        // Atualiza o Dom sem apagar os elementos
        const elementoInformacao = listaDisciplina.querySelector('.informacao')
        atualizarExibicao(elementoInformacao, planejadorEstudo)
        
        
        // limpa o input após atualizar
        horaEstudada.value = ''
        
        // Chamar função salvar disciplinas
        salvarDisciplina()
    })

}


function calcularProgresso(planejadorEstudo) {
    // verifica se tem horas estudadas
    if (planejadorEstudo.horasEstudadas === 0 || !planejadorEstudo.horasEstudadas){
        console.log('Ainda não há horas estudadas')
        return 0
    }

    const tempoGastoEstudando = planejadorEstudo.horasEstudadas
    const metaTempoEstudo = planejadorEstudo.meta 

    const progresso = (tempoGastoEstudando / metaTempoEstudo) * 100

    return progresso

}


// Função para salvar disciplinas
function salvarDisciplina() {
    localStorage.setItem('informacoesEstudos', JSON.stringify(informacoesEstudos))
}


// Função para carregar do localStorage
function carregarDisciplinas() {
    const disciplinasSalvas = localStorage.getItem('informacoesEstudos')

    if(disciplinasSalvas) {
        informacoesEstudos = JSON.parse(disciplinasSalvas)
        console.log('Disciplinas carregadas')
    } else {
        informacoesEstudos = [] // array vazio se não houver dados
        console.log('Nenhuma disciplina salva encontrada')
    }
}

function carregarExibirDisciplinas() {
    carregarDisciplinas() // chama função carregar disciplinas do local storage


    // limpa a lista antes de mostrar
    lista.innerHTML = ''

    // exibe cada disciplina carregada
    informacoesEstudos.forEach(planejadorEstudo => {
        mostrarDisciplina(planejadorEstudo)
    })
}






document.addEventListener('DOMContentLoaded', function () {
    console.log('Página carregada, carregando disciplinas...')
    carregarExibirDisciplinas()
})