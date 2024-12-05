var database = require("../database/config");

function buscarReservatoriosPorFazenda(idFazenda) {

  var instrucaoSql = `SELECT * FROM reservatorio WHERE fkFazenda = '${idFazenda}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idFazenda, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function enviarIdReservatorio(idsReservatorios){

  const idsString = idsReservatorios.join(',');

  var instrucaoSql = `
    SELECT nivelCalculado 
    FROM historico
    JOIN sensor ON historico.fkSensor = sensor.idColeta
    JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
    WHERE fkReservatorio IN (${idsString}) 
    ORDER BY historico.dtHrNivelCalculado DESC
    LIMIT 1
  `
  return database.executar(instrucaoSql)
}


module.exports = {
  buscarReservatoriosPorFazenda,
  cadastrar,
  enviarIdReservatorio
}
