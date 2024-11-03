// AO CARREGAR A PÁGINA, RESGATA A CLASSE ARMAZENADA NO LOCALSTORAGE PARA SETAR A CLASSE DO BODY E ATIVA A ANIMAÇÃO E DESABILITA E HABILITA A NAVEÇÃO DO TAB DE SERTOS CAMPOS
// ESSA CLASSE É ENVIADA QUANDO O USUÁRIO CLICA OU EM SE CADASTRAR OU EM LOGIN FORA DO AUTH.HTML

const bodyClass = localStorage.getItem("bodyClass");

if (bodyClass) {
  document.body.classList.add(bodyClass);

  if (bodyClass == "cadastro_js") {
    habilitarDesabilitarNavegacaoTab("input", ".main_container_login", "-1");
    habilitarDesabilitarNavegacaoTab("button", ".main_container_login", "-1");
    habilitarDesabilitarNavegacaoTab("input", ".main_container_cadastro", "0");
    habilitarDesabilitarNavegacaoTab("button", ".main_container_cadastro", "0");
  }

  if (bodyClass == "login_js") {
    habilitarDesabilitarNavegacaoTab("input", ".main_container_login", "0");
    habilitarDesabilitarNavegacaoTab("button", ".main_container_login", "0");
    habilitarDesabilitarNavegacaoTab("input", ".main_container_cadastro", "-1");
    habilitarDesabilitarNavegacaoTab(
      "button",
      ".main_container_cadastro",
      "-1"
    );
  }
}

//

// ADICIONA UM EVENTO EM CERTOS CAMPOS PARA ATIVAR OS BOTÕES QUANDO A TECLA "ENTER" FOR PRECIONADA

// SEÇÃO DE LOGIN
document.getElementById("input_senha_login").addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada é o "Enter"
    if (event.key === "Enter") {
      // Impede o comportamento padrão do "Enter"
      event.preventDefault();
      // Aciona o clique no botão
      document.getElementById("btn_entrar").click();
    }
  });

// SEÇAO DE CADASTRO

document.getElementById("confirmacao_senha").addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada é o "Enter"
    if (event.key === "Enter") {
      // Impede o comportamento padrão do "Enter"
      event.preventDefault();
      // Aciona o clique no botão
      document.getElementById("btn_cadastrar").click();
    }
  });

//

// FUNÇÕES PARA TROCAR CLASSE DO BODY PARA ATIVAR A ANIMAÇÃO E CONFIGURA A NAVEGAÇÃO POR TAB SEMPRE QUE O BOTÃO CORRESPONDENTE É ACIONADO

const body = document.querySelector("body");
const btnCadastro = document.getElementById("btn_cadastro_toggle");
const btnLogin = document.getElementById("btn_login_toggle");

btnCadastro.addEventListener("click", () => {
  body.className = "cadastro_js";
  habilitarDesabilitarNavegacaoTab("input", ".main_container_login", "-1");
  habilitarDesabilitarNavegacaoTab("button", ".main_container_login", "-1");
  habilitarDesabilitarNavegacaoTab("input", ".main_container_cadastro", "0");
  habilitarDesabilitarNavegacaoTab("button", ".main_container_cadastro", "0");
});

btnLogin.addEventListener("click", () => {
  body.className = "login_js";
  habilitarDesabilitarNavegacaoTab("input", ".main_container_login", "0");
  habilitarDesabilitarNavegacaoTab("button", ".main_container_login", "0");
  habilitarDesabilitarNavegacaoTab("input", ".main_container_cadastro", "-1");
  habilitarDesabilitarNavegacaoTab("button", ".main_container_cadastro", "-1");
});

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

//

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

//

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


function validarSenha(senha) {
  const possuiNumero = /[0-9]/.test(senha); // Verifica se contém pelo menos um número
  const possuiMaiuscula = /[A-Z]/.test(senha); // Verifica se contém pelo menos uma letra maiúscula
  const possuiCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha); // Verifica se contém pelo menos um caractere especial

  if (possuiNumero && possuiMaiuscula && possuiCaractereEspecial) {
    return true; // A senha atende aos requisitos
  } else {
    return false; // A senha não atende aos requisitos
  }
}


//

// FUNÇÃO PARA SÓ PERMITIR QUE O FORMULÁRIO DE CADASTRO SEJA ENVIADO SOMENTE SE AS CONDIÇÕES FOREM ATENDIDAS

document.getElementById("formulario_cadastro").addEventListener("submit", function (event) {
    event.preventDefault(); // EVITA O ENVIO IMEDIATO DO FORMULÁRIO QUANDO APERTADO O BOTÃO DE SUBMIT

    let campoMensagemErro = document.getElementById("campo_mensagem_erro");
    campoMensagemErro.innerHTML = "";
    let mensagemErro = "";

    const formulario = document.getElementById("formulario_cadastro");

    if (
      input_usuario.value == "" ||
      input_email_cadastro.value == "" ||
      razaoSocial.value == "" ||
      nomeFantasia.value == "" ||
      cnpj.value == "" ||
      representanteLegal.value == "" ||
      senha_cadastro.value == "" ||
      confirmacao_senha.value == ""
    ) {
      alert("Por favor, preencha todos os campos.");
    } else {
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
        mensagemErro += "<p>* e-mail inválido</p>";
        emailValido = false;
      }
      if (!validarSenha(senha_cadastro.value)) {
        mensagemErro += "<p>* A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial</p>";
      }

      if (userNameValido && emailValido && validarSenha(senha_cadastro.value)) {
        alert("Cadastrado com sucesso!");
        // this.submit(); // Envia o formulário

        // simulação depois do cadastro
        body.className = "login_js";
        habilitarDesabilitarNavegacaoTab("input", ".main_container_login", "0");
        habilitarDesabilitarNavegacaoTab(
          "button",
          ".main_container_login",
          "0"
        );
        habilitarDesabilitarNavegacaoTab(
          "input",
          ".main_container_cadastro",
          "-1"
        );
        habilitarDesabilitarNavegacaoTab(
          "button",
          ".main_container_cadastro",
          "-1"
        );
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
    }
  });

//

// FUNÇÃO PARA SÓ PERMITIR ACESSO AO DASHBOARD SE SENHA E E-MAIL FOREM VÁLIDOS

function entrar() {
  document.getElementById("formulario_login").addEventListener("submit", function (event) {
      event.preventDefault();

      emailValue = document.getElementById("input_email_login").value;
      senhaValue = document.getElementById("input_senha_login").value;

      if (emailValue == "hfsystem@sptech.school" && senhaValue == "admin123") {
        alert("Login realizado com sucesso");
        window.location.href = "./../private/dashboard.html";
      } else {
        alert("Email ou senha incorretos");
      }
    });
}

//

// FUNÇÃO DE FORMATAÇÃO DO CAMPO CNPJ
function formatarCNPJ(campo) {

  // Remove todos os caracteres que não são dígitos (números) do valor do campo.
  let cnpj = campo.value.replace(/\D/g, "");
  // Adiciona um ponto após os primeiros dois dígitos do CNPJ.
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  // Adiciona um segundo ponto após os próximos três dígitos.
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  // Adiciona uma barra após os próximos três dígitos.
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
  // Adiciona um hífen após os próximos quatro dígitos.
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");

  // Atualiza o valor do campo com o CNPJ formatado.
  campo.value = cnpj;
}