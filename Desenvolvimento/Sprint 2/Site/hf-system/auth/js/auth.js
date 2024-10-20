// AO CARREGAR A PÁGINA, RESGATA A CLASSE ARMAZENADA NO LOCALSTORAGE PARA SETAR A CLASSE DO BODY E ATIVA A ANIMACAO
// ESSA CLASSE É ENVIADA QUANDO O USUÁRIO CLICA OU EM SE CADASTRAR OU EM LOGIN FORA DO AUTH.HTML

const bodyClass = localStorage.getItem("bodyClass");

if (bodyClass) {
  document.body.classList.add(bodyClass);
}

// TROCA CLASSE DO BODY PARA ATIVAR A ANIMAÇÃO

const body = document.querySelector("body");
const btnCadastro = document.getElementById("btn_cadastro_toggle");
const btnLogin = document.getElementById("btn_login_toggle");

btnCadastro.addEventListener("click", () => {
  body.className = "cadastro_js";
});

btnLogin.addEventListener("click", () => {
  body.className = "login_js";
});

// / TROCA CLASSE DO BODY PARA ATIVAR A ANIMAÇÃO

//

// FUNÇÃO PARA OCULTAR E EXIBIR A SENHA

function ocultarExibirSenha(button, campo) {
  const campoSenha = document.getElementById(campo);
  const buttonOcultarExibir = document.getElementById(button);

  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    buttonOcultarExibir.classList.remove("fa-eye");
    buttonOcultarExibir.classList.add("fa-eye-slash");
  } else {
    campoSenha.type = "password";
    buttonOcultarExibir.classList.remove("fa-eye-slash");
    buttonOcultarExibir.classList.add("fa-eye");
  }
}

// /FUNÇÃO PARA OCULTAR E EXIBIR A SENHA


//   FUNÇÃO PARA VALIDAR NOME DO USUÁRIO

function validarUserName(inputUserName) {
  let usuarioValido = false;
  const userName = document.getElementById(inputUserName.toString()).value;
  const tamanhoMininoUsuario = 6;

  if (userName.length >= tamanhoMininoUsuario) {
    usuarioValido = true;
  }

  return usuarioValido;
}

//  / FUNÇÃO PARA VALIDAR NOME DO USUÁRIO

//   FUNÇÃO PARA VALIDAR E-MAIL

function validarEmail(idImputEmail) {
  let containsAt = false,
    containsDotAfterAt = false;

  const inputEmail = document.getElementById(`${idImputEmail}`).value;

  for (let i = 0, qtdAt = 0, qtdDot = 0; i < inputEmail.length; i++) {
    const char = inputEmail[i];

    // VERIFICA SE TEM UM ÚNICO "@" NO E-MAIL DEPOIS DO PRIMEIRO CARACTER

    if (char === "@" && inputEmail[0] != "@") {
      qtdAt++;
      if (qtdAt == 1) {
        containsAt = true;
      } else {
        containsAt = false;
        break; // SAI DO LOOP SE ENCONTRAR MAIS DE 1 '@'
      }
    }

    // VERIFICA SE TEM UM ÚNICO "." NO E-MAIL DEPOIS DO "@"

    if (containsAt && char === ".") {
      qtdDot++;
      if (qtdDot == 1) {
        containsDotAfterAt = true;
      } else {
        containsDotAfterAt = false;
        break; // SAI DO LOOP SE ENCONTRAR MAIS DE 1 '.'
      }
    }
  }

  if (containsAt && containsDotAfterAt) {
    return true;
  } else {
    return false;
  }
}

//  / FUNÇÃO PARA VALIDAR E-MAIL

// FUNÇÃO PARA SÓ PERMITIR QUE O FORMULÁRIO DE CADASTRO SEJA ENVIADO SOMENTE SE AS CONDIÇÕES FOREM ATENDIDAS

document
  .getElementById("formulario_cadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // EVITA O ENVIO IMEDIATO DO FORMULÁRIO QUANDO APERTADO O BOTÃO DE SUBMIT

    let campoMensagemErro = document.getElementById("campo_mensagem_erro");
    campoMensagemErro.innerHTML = "";
    let mensagemErro = "";

    const formulario = document.getElementById("formulario_cadastro");

    let userNameValido, emailValido;

    if (validarUserName("input_usuario")) {
      userNameValido = true;
    } else {
      mensagemErro += `<p>* seu nome de usuário deve conter pelo menos 6 caracteres</p>`;
      userNameValido = false;
    }

    if (validarEmail("input_email_cadastro")) {
      emailValido = true;
    } else {
      mensagemErro += "<p>*e-mail inválido</p>";
      emailValido = false;
    }

    if (userNameValido && emailValido) {
      alert("Cadastrado com sucesso!");
      this.submit(); // Envia o formulário
    } else {
      campoMensagemErro.innerHTML = mensagemErro;
      campoMensagemErro.style.display = "block";
      formulario.style.gridTemplateRows = "repeat(6, auto)";
      formulario.style.gridTemplateAreas = `
          "div_input_usuario div_input_email"
          "div_input_razao_social div_input_nome_fantasia"
          "div_input_cnpj div_input_representante_legal"
          "div_input_senha div_input_confirmacao_senha"
          "campo_mensagem_erro campo_mensagem_erro"
          "btn btn"`;
    }
  });

// / FUNÇÃO PARA SÓ PERMITIR QUE O FORMULÁRIO DE CADASTRO SEJA ENVIADO SOMENTE SE AS CONDIÇÕES FOREM ATENDIDAS

// FUNÇÃO PARA SÓ PERMITIR ACESSO AO DASHBOARD SE SENHA E E-MAIL FOREM VÁLIDOS

function entrar() {
  document
    .getElementById("formulario_login")
    .addEventListener("submit", function (event) {
     
      event.preventDefault();

      if (email == "hfsystem@sptech.school" && senha == "admin123") {
        alert("Login realizado com sucesso");
        window.location.href = "../../private/dashboard.html";
       
      } else {
        alert("Email ou senha incorretos");
      }
    });
}

// / FUNÇÃO PARA SÓ PERMITIR ACESSO AO DASHBOARD SE SENHA E E-MAIL FOREM VÁLIDOS
