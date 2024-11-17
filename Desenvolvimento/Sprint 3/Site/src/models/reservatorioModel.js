var database = require("../database/config")

function buscarReservatoriosPorFazenda(fazendaId) {

    var instrucaoSql = `SELECT * FROM reservatorio WHERE fkFazenda = ${fazendaId}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function cadastrar(fazendaId, nome){
    
    var instrucaoSql = `INSERT INTO (nome, fkFazenda) reservatorio VALUES (${nome}, ${fazendaId})`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}


module.exports = {
    buscarReservatoriosPorFazenda,
    cadastrar
}