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
        meta:horasMeta.value + ' horas' ,
        horasEstudadas: null
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
    info.innerText = `Nome: ${plannerEstudo.nome} - Meta: ${plannerEstudo.meta}`
    listDisciplina.appendChild(info)


    lista.appendChild(listDisciplina)

    // limpa inputs
    nomeDisciplina.value = ''
    horasMeta.value = ''


    criarBoatoExcluir(listDisciplina, plannerEstudo)
    inputHorasEstudados(listDisciplina, plannerEstudo)
}


function criarBoatoExcluir (listDisciplina, plannerEstudo) {
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
    
    listDisciplina.appendChild(botaoDelete)
}


function inputHorasEstudados (listDisciplina, plannerEstudo){
    const horaEstudado = document.createElement('input')

    horaEstudado.type = 'number'
    horaEstudado.placeholder = 'Horas estudados...'
    horaEstudado.id = 'horasEstudado'
    horaEstudado.min = '1'
    horaEstudado.max = '24'
    horaEstudado.step = '0.5'
    horaEstudado.required

    listDisciplina.appendChild(horaEstudado)

    horaEstudado.value = ''

    const botaoAtualizarObjeto = document.createElement('button')
    botaoAtualizarObjeto.textContent = 'Atualizar'

    listDisciplina.appendChild(botaoAtualizarObjeto)

    botaoAtualizarObjeto.addEventListener( 'click', () =>{
        if (!horaEstudado.value){
            alert('Insira as horas estudadas!')
            return
        }


        // Atualiza o objeto
        plannerEstudo.horasEstudadas = horaEstudado.value

        // Atualiza o Dom sem apagar os elementos
        listDisciplina.querySelector('.info').innerText = `Nome: ${plannerEstudo.nome} - Meta: ${plannerEstudo.meta} - Horas estudadas: ${plannerEstudo.horasEstudadas}`

        
    })
}

