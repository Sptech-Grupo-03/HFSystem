var database = require("../database/config");

function listarReservatorioFazenda() {

  var instrucaoSql = `select distinct
                         fkFazenda as codFazenda,
                             fazenda.nomeFazenda 
                                from reservatorio
                                 join fazenda
                                    on reservatorio.fkFazenda = fazenda.codigoFazenda;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarReservatorioFazenda(nomeReservatorio,alturaReservatorio,raioReservatorio,codFazenda){

    if (isNaN(alturaReservatorio) || isNaN(raioReservatorio)) {
        throw new Error("Altura ou raio inválidos");
    }

    var instrucaoSql = 
    `
    insert into reservatorio (nome,altura,raio,fkFazenda) values ('${nomeReservatorio}', ${alturaReservatorio},${raioReservatorio},'${codFazenda}');
    `

    return database.executar(instrucaoSql);
}

module.exports = {
    listarReservatorioFazenda,
    cadastrarReservatorioFazenda
}
