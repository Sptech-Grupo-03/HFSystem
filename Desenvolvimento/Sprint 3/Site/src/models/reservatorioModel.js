var database = require("../database/config")

function buscarReservatoriosPorFazenda(idFazenda) {

    var instrucaoSql = `SELECT * FROM reservatorio a WHERE fkFazenda = ${idFazenda}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function cadastrar(idFazenda, nome){
    
    var instrucaoSql = `INSERT INTO (nome, fkFazenda) reservatorio VALUES (${nome}, ${idFazenda})`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}


module.exports = {
    buscarReservatoriosPorFazenda,
    cadastrar
}