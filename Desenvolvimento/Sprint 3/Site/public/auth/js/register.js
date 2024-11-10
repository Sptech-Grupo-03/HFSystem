function cadastrar() {
  // Recupera o valor do input com o ID 'input_nome_usuario'
  const nomeUsuario = document.getElementById("input_nome_usuario").value;
  // Recupera o valor do input com o ID 'input_email_cadastro'
  const email = document.getElementById("input_email_cadastro").value;
  // Recupera o valor do input com o ID 'input_razao_social'
  const razaoSocial = document.getElementById("input_razao_social").value;
  // Recupera o valor do input com o ID 'input_nome_fantasia'
  const nomeFantasia = document.getElementById("input_nome_fantasia").value;
  // Recupera o valor do input com o ID 'input_cnpj'
  const cnpj = document.getElementById("input_cnpj").value;
  // Recupera o valor do input com o ID 'input_representante_legal'
  const representanteLegal = document.getElementById("input_representante_legal").value;
  // Recupera o valor do input com o ID 'input_senha_cadastro'
  const senha = document.getElementById("input_senha_cadastro").value;

  // Envia os dados para o servidor utilizando a função fetch
  fetch("/usuarios/cadastrar", {
    // Define o método HTTP que será usado para enviar os dados (POST, neste caso)
    method: "POST",
    // Define o tipo de conteúdo da requisição. O servidor entenderá que está recebendo dados no formato JSON
    headers: {
      "Content-Type": "application/json",
    },
    // Envia os dados como uma string JSON para o servidor. 'body' é o corpo da requisição.
    body: JSON.stringify({
      nomeUsuarioServer: nomeUsuario,      // Nome do usuário
      emailServer: email,                  // E-mail do usuário
      razaoSocialServer: razaoSocial,      // Razão social
      nomeFantasiaServer: nomeFantasia,    // Nome fantasia
      cnpjServer: cnpj,                   // CNPJ
      representanteLegalServer: representanteLegal, // Representante legal
      senhaServer: senha                  // Senha do usuário
    }),
  })
    // Aqui começamos a tratar a resposta da requisição
    .then(function (resposta) {
      console.log(resposta); 
      // Se a resposta for bem-sucedida (status 200-299), entra nesta parte
      if (resposta.ok) {
        console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
        // Após o cadastro, redireciona o usuário para a página de login
        window.location.href = "/login";  // Substitua "/login" pela URL correta de sua página de login
      } else {
        // Caso o status da resposta seja algo fora do intervalo 200-299 (ex: 400, 500), lança um erro
        throw new Error("Houve um erro ao tentar realizar o cadastro!");
      }
    })
    // Esta função é chamada em caso de erro (como problemas de rede ou resposta inválida do servidor)
    .catch(function (erro) {
      // Aqui, qualquer erro que aconteça durante a requisição ou no bloco 'then' será capturado
      console.error(`Erro: ${erro.message}`);  // Mostra o erro no console
      // Exibe uma mensagem de erro para o usuário
      alert("Erro ao realizar o cadastro. Tente novamente.");
    });

  // Retorna false para evitar que o formulário seja enviado da maneira tradicional (página recarregando)
  return false;
}

document.getElementById("formulario_cadastro").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  cadastrar(); // Chama a função de cadastro
});