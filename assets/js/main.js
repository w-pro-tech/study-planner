import { informacoesEstudos, carregarDisciplinas } from './data.js'
import { mostrarDisciplina } from './dom.js'
import { limparInputs } from './utils.js'

const nomeDisciplina = document.getElementById('disciplinaNome')
const horasMeta = document.getElementById('horas')
const adicionarBotao = document.getElementById('adicionar-btn')

adicionarBotao.addEventListener('click', (e) => {
  e.preventDefault()

  let planejadorEstudo = {
    nome: nomeDisciplina.value,
    meta: parseInt(horasMeta.value),
    horasEstudadas: 0
  }

  if (planejadorEstudo.nome && planejadorEstudo.meta) {
    informacoesEstudos.push(planejadorEstudo)
    mostrarDisciplina(planejadorEstudo)
    limparInputs()
  } else {
    window.alert('Preencha os campos!!!')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  carregarDisciplinas()
  informacoesEstudos.forEach(disciplina => mostrarDisciplina(disciplina))
})
