var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
      SELECT id, nome, email, fk_empresa as empresaId, cpf FROM usuario WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(
  nomeUsuario,
  email,
  razaoSocial,
  nomeFantasia,
  cnpj,
  representanteLegal,
  senha
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nomeUsuario,
    email,
    razaoSocial,
    nomeFantasia,
    cnpj,
    representanteLegal,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql1 = `
  INSERT INTO usuario (email, senha) VALUES ('${email}', '${senha}');
`;

  var instrucaoSql2 = `
  INSERT INTO empresa (usernameEmpresa, cnpj, email, razaoSocial, nomeFantasia, representanteLegal, senha) 
  VALUES ('${nomeUsuario}', '${cnpj}', '${email}', '${razaoSocial}', '${nomeFantasia}', '${representanteLegal}', '${senha}');
`;

  console.log("Executando a instrução SQL 1:\n" + instrucaoSql1);
  database
    .executar(instrucaoSql1)
    .then(() => {
      console.log("Executando a instrução SQL 2:\n" + instrucaoSql2);
      return database.executar(instrucaoSql2);
    })
    .catch((error) => {
      console.error("Erro ao executar instruções SQL:", error);
    });
}

module.exports = {
  autenticar,
  cadastrar,
};
