// SEÇAO DE CADASTRO

// ADICIONA UM EVENTO NO CAMPO "input_confirmacao_senha" PARA ATIVAR O BOTÃO DE CADASTRAR QUANDO A TECLA "ENTER" FOR PRECIONADA

document
  .getElementById("input_confirmacao_senha")
  .addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada é o "Enter"
    if (event.key === "Enter") {
      // Impede o comportamento padrão do "Enter"
      event.preventDefault();
      // Aciona o clique no botão
      document.getElementById("btn_cadastrar").click();
    }
  });

//

// FUNÇÃO PARA SÓ PERMITIR QUE O FORMULÁRIO DE CADASTRO SEJA ENVIADO SOMENTE SE AS CONDIÇÕES FOREM ATENDIDAS

document
  .getElementById("formulario_cadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // EVITA O ENVIO IMEDIATO DO FORMULÁRIO QUANDO APERTADO O BOTÃO DE SUBMIT

    let campoMensagemErro = document.getElementById("campo_mensagem_erro");
    campoMensagemErro.innerHTML = "";
    let mensagemErro = "";

    const formulario = document.getElementById("formulario_cadastro");
    
    if (
      input_codigo_fazenda.value == "" ||
      input_nome_completo.value == "" ||
      input_nome_usuario.value == "" ||
      input_email_cadastro.value == "" ||
      input_celular.value == "" ||
      input_confirmacao_email.value == "" ||
      input_senha_cadastro.value == "" ||
      input_confirmacao_senha.value == ""
    ) {
      alert("Por favor, preencha todos os campos.");
    } else {
      let userNameValido, emailValido;

      if (validarUserName("input_nome_usuario")) {
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
      if (!validarSenha(input_senha_cadastro.value)) {
        mensagemErro +=
          "<p>* A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial</p>";
      }

      if (
        userNameValido &&
        emailValido &&
        validarSenha(input_senha_cadastro.value)
      ) {
        if (cadastrar()) {
          this.submit(); // Envia o formulário

          // simulação depois do cadastro
          body.className = "login_js";
          habilitarDesabilitarNavegacaoTab(
            "input",
            ".main_container_login",
            "0"
          );
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
        }
      } else {
        campoMensagemErro.innerHTML = mensagemErro;
        campoMensagemErro.style.display = "block";
        formulario.style.gridTemplateRows = "repeat(6, auto)";
        formulario.style.gridTemplateAreas = `
            "div_input_codigo_fazenda div_input_celular"
      "div_input_nome_completo div_input_nome_usuario"
      "div_input_email div_input_confirmacao_email"
      "div_input_senha div_input_confirmacao_senha"
            "campo_mensagem_erro campo_mensagem_erro"
            "btn btn"`;
      }
    }
  });

//

function cadastrar() {
  // aguardar();

  const codigoAcesso = document.getElementById("input_codigo_fazenda").value;

  const nomeComplemento = document.getElementById("input_nome_completo").value;

  const userName = document.getElementById("input_nome_usuario").value;

  const email = document.getElementById("input_email_cadastro").value;

  const celular = document.getElementById("input_celular").value;

  const senha = document.getElementById("input_senha_cadastro").value;

  // função cadastrar - router - controller - modulo

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigoAcessoServer: codigoAcesso,
      nomeComplementoServer: nomeComplemento,
      userNameServer: userName,
      emailServer: email,
      celularServer: celular,
      senhaServer: senha,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(
          "Cadastro realizado com sucesso! Redirecionando para tela de Login..."
        );
        alert("Cadastrado com sucesso!");
        return true;
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}
