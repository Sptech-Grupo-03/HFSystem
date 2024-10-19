// AO CARREGAR A PÁGINA, RESGATA A CLASSE ARMAZENADA NO LOCALSTORAGE PARA SETAR A CLASSE DO BODY E ATIVA A ANIMACAO
// ESSA CLASSE É ENVIADA QUANDO O USUÁRIO CLICA OU EM SE CADASTRAR OU EM LOGIN FORA DO AUTH.HTML

const bodyClass = localStorage.getItem('bodyClass');

if (bodyClass) {
    document.body.classList.add(bodyClass);
}

// TROCAR CLASSE DO BODY PARA A ANIMAÇÃO FUNCIONAR

const body = document.querySelector("body");
const btnCadastro = document.getElementById('btn_cadastro_toggle');
const btnLogin = document.getElementById('btn_login_toggle');

btnCadastro.addEventListener('click', () => {
    body.className = "cadastro_js";
});

btnLogin.addEventListener('click', () => {
    body.className = "login_js";
});

// FUNÇÃO PARA OCULTAR E EXIBIR A SENHA

function ocultarExibirSenha(button, campo) {
    const campoSenha = document.getElementById(campo);
    const buttonOcultarExibir = document.getElementById(button);
    
    if (campoSenha.type === 'password') {
        campoSenha.type = 'text';
        buttonOcultarExibir.classList.remove('fa-eye');
        buttonOcultarExibir.classList.add('fa-eye-slash');
    } else {
        campoSenha.type = 'password';
        buttonOcultarExibir.classList.remove('fa-eye-slash');
        buttonOcultarExibir.classList.add('fa-eye');
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
        "btn btn"`;
        
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
