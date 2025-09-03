let estudosInfo = [];

const nomeDisciplina = document.getElementById('disciplinaNome')
const horasMeta = document.getElementById('horas')
const adicionaBtn = document.getElementById('adicionar-btn')
const lista =  document.getElementById('listaDisciplina')


     
adicionaBtn.addEventListener('click', (e) =>{
    e.preventDefault()

    //cria um novo objeto a cada clique
    let plannerEstudo = {
        nome: nomeDisciplina.value,
        meta:parseInt(horasMeta.value),
        horasEstudadas: 0
    }

    if(plannerEstudo.nome && plannerEstudo.meta){
         // guarda no array
        estudosInfo.push(plannerEstudo)

        // passa o objeto pra função que mostra
        mostrarDisciplina(plannerEstudo)
    } else {
        window.alert('Prencha os campos!!!')
    }
})


function mostrarDisciplina (plannerEstudo) {
    const listDisciplina = document.createElement('li')

    const info = document.createElement('span')
    info.classList.add('info')

    // função para atualizar a exibição
    atualizarExibicao(info, plannerEstudo)
    
    
    listDisciplina.appendChild(info)
    lista.appendChild(listDisciplina)

    // limpa inputs
    nomeDisciplina.value = ''
    horasMeta.value = ''


    criarBotaoExcluir(listDisciplina, plannerEstudo)
    inputHorasEstudados(listDisciplina, plannerEstudo)
}



function atualizarExibicao (infoElement, plannerEstudo){
    const progresso = calcularProgreso(plannerEstudo)
    let texto = `Nome: ${plannerEstudo.nome} - Meta: ${plannerEstudo.meta} horas`

    if(plannerEstudo.horasEstudadas > 0){
        texto += ` - Horas estudadas: ${plannerEstudo.horasEstudadas} horas - Progresso: ${progresso.toFixed(1)}%`
    }

    infoElement.innerText = texto
}



function criarBotaoExcluir (listDisciplina, plannerEstudo) {
    const botaoDelete = document.createElement('button')
    botaoDelete.textContent = 'Excluir'
    listDisciplina.appendChild(botaoDelete)


    botaoDelete.addEventListener('click', () =>{
        // remove do DOM
        listDisciplina.remove()

        //remove do array
        const index = estudosInfo.indexOf(plannerEstudo)
        if(index > -1) estudosInfo.splice(index, 1)
        console.log(estudosInfo)
    })
}


function inputHorasEstudados (listDisciplina, plannerEstudo){
    const horaEstudado = document.createElement('input')

    horaEstudado.type = 'number'
    horaEstudado.placeholder = 'Horas estudados...'
    horaEstudado.id = 'horasEstudado'
    horaEstudado.min = '1'
    horaEstudado.max = '24'
    horaEstudado.step = '0.5'
    horaEstudado.required = true

    listDisciplina.appendChild(horaEstudado)


    const botaoAtualizarObjeto = document.createElement('button')
    botaoAtualizarObjeto.textContent = 'Atualizar'
    listDisciplina.appendChild(botaoAtualizarObjeto)


    botaoAtualizarObjeto.addEventListener( 'click', () =>{
        if (!horaEstudado.value || horaEstudado.value <=0){
            alert('Insira um valor válido para as horas estudadas!')
            return
        }


        // Atualiza o objeto
        plannerEstudo.horasEstudadas = parseFloat(horaEstudado.value)
        console.log('Objeto atualizado:', plannerEstudo)


        // Atualiza o Dom sem apagar os elementos
        const infoElement = listDisciplina.querySelector('.info')
        atualizarExibicao(infoElement, plannerEstudo)

        
        // limpa o input após atualizar
        horaEstudado.value = ''
    })

}


function calcularProgreso (plannerEstudo) {
    // verifica se tem horas estudados
    if (plannerEstudo.horasEstudadas === 0 || !plannerEstudo.horasEstudadas){
        console.log('Ainda não há estudadas')
        return 0
    }

    const tempoGastoEstudando = plannerEstudo.horasEstudadas
    const metaTempoEstudo = plannerEstudo.meta 

    const progresso = (tempoGastoEstudando / metaTempoEstudo) * 100

    console.log(`Progresso de ${plannerEstudo.nome}: ${progresso.toFixed(1)}%`)
    return progresso

}


