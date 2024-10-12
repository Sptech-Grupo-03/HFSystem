function sugestaoUsuario() {
    var usuario = document.getElementById('usuario').value
    var tamanhoMininoUsuario = 6;
    var randomuser = document.getElementById('randomuser');
    var mensagem = '';

    for (var i = usuario.length; i < tamanhoMininoUsuario; i++) {
        mensagem = `<p>Seu nome de usuário deve conter pelo menos 6 caracteres</p>`;
    }
        randomuser.innerHTML = mensagem;

}