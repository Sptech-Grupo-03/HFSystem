var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
        SELECT senha, email, fkFazenda as fazendaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(
  codigoAcesso,
  nomeComplemento,
  userName,
  email,
  celular,
  senha
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    codigoAcesso,
    nomeComplemento,
    userName,
    email,
    celular,
    senha
  );

  var instrucaoSql = `
    INSERT INTO usuario (username, nome, tipo, telefone, email, senha, fkFazenda) 
    VALUES ('${userName}', '${nomeComplemento}', 'Cliente', '${celular}', '${email}', '${senha}', '${codigoAcesso}');
  `;

  console.log("Executando a instrução SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
};
