const botaoRegisto = document.getElementById('botaoRegisto')

botaoRegisto.addEventListener('click', () => {
    const nome = document.getElementById('nomeUsuario')
    const email = document.getElementById('usarioEmail')
    const senha = document.getElementById('usuarioPassword')

    // Envia par o PHP via fetch
    fetch("processo.php", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: "nome=" + encodeURIComponent(nome) +
        "&email=" + encodeURIComponent(email) +
        "&senha=" + encodeURIComponent(senha)
    }) 

    .then(resposta => resposta.json())
    .then(data => {
        document.getElementById('errorMessage').textContent = data.mensagem
    })

    .catch(erro => document.getElementById('errorMessage').textContent = erro)
})
