function validacaoTamanhoUsuario() {
    var usuario = document.getElementById('input_usuario').value
    var tamanhoMininoUsuario = 6;
    var randomuser = document.getElementById('randomuser');
    var iconeLogin = document.getElementById('iconeLogin');
    var mensagem = '';
    

    iconeLogin.style.top = '50%';
    for (var i = usuario.length; i < tamanhoMininoUsuario; i++) {
        mensagem = `Seu nome de usuário deve conter pelo menos 6 caracteres`;
        iconeLogin.style.top = '33%';
    
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

function cadastrar(){
    var usuario = document.getElementById('input_usuario').value

    if(usuario.length < 6){
        alert('Revise seu nome de usuário')
    }else{
        alert('Cadastrado com sucesso!')
    }
}

function entrar(){
    const email = input_email.value
    const senha = input_senha.value

    if(email == 'hfsystem@sptech.school' && senha == 'admin123'){
        alert('Login realizado com sucesso')
        window.location.href = "../dashboard/dashboard.html";
    }else{
        alert('Email ou senha incorretos')
    }
}