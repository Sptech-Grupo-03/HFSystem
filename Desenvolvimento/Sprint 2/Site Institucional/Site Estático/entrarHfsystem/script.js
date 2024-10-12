function validacaoTamanhoUsuario() {
    var usuario = document.getElementById('usuario').value
    var tamanhoMininoUsuario = 6;
    var randomuser = document.getElementById('randomuser');
    var mensagem = '';

    for (var i = usuario.length; i < tamanhoMininoUsuario; i++) {
        mensagem = `<p>Seu nome de usuário deve conter pelo menos 6 caracteres</p>`;
    }
        randomuser.innerHTML = mensagem;

}

function toggleSenhaVisivel() {
    const senha = document.getElementById('senha');
    const toggleIcon = document.getElementById('toggleSenha');
    
    if (senha.type === 'password') {
        senha.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        senha.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function toggleConfirmacaoSenhaVisivel() {
    const confirmacaoSenha = document.getElementById('confirmacaoSenha');
    const toggleIcon = document.getElementById('toggleConfirmacaoSenha');
    
    if (confirmacaoSenha.type === 'password') {
        confirmacaoSenha.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        confirmacaoSenha.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}