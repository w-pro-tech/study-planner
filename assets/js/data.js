export let informacoesEstudos = []

export function salvarDisciplina() {
  console.log('Dados salvos:', informacoesEstudos)
}

export function carregarDisciplinas() {
  informacoesEstudos = []
  console.log('Disciplinas inicializadas')
}

export function calcularProgresso(planejadorEstudo) {
  if (!planejadorEstudo.horasEstudadas) return 0
  return (planejadorEstudo.horasEstudadas / planejadorEstudo.meta) * 100
}
