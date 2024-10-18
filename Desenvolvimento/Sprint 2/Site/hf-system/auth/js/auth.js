
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

document.getElementById('formulario_cadastro').addEventListener('submit', function(event) {
    // Evita o envio imediato do formulário
    event.preventDefault();
   
    var usuario = document.getElementById('input_usuario').value
    var campoMensagemErro = document.getElementById("campo_mensagem_erro")
    var formulario = document.getElementById("formulario_cadastro")
    var tamanhoMininoUsuario = 6;

    if(usuario.length < tamanhoMininoUsuario){
        campoMensagemErro.style.display = "block";
        campoMensagemErro.innerHTML = `* seu nome de usuário deve conter pelo menos 6 caracteres`;
        formulario.style.gridTemplateRows = "repeat(6, auto)"
        formulario.style.gridTemplateAreas = `
        "div_input_usuario div_input_email"
        "campo_mensagem_erro campo_mensagem_erro"
        "div_input_razao_social div_input_nome_fantasia"
        "div_input_cnpj div_input_representante_legal"
        "div_input_senha div_input_confirmacao_senha"
        "btn_cadastrar btn_cadastrar"`;

        
    }else{
        alert('Cadastrado com sucesso!')
        this.submit(); // Envia o formulário
    }

});



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