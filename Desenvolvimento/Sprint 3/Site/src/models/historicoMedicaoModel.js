var database = require("../database/config");

function buscarUltimosNiveis(idReservatorio, limite_linhas) {

    var instrucaoSql = `SELECT 
        nivelCalculado as nivelAtual, 
                        dtHrNivelCalculado as momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM historicoMedicao
                    WHERE fkReservatorio = ${idReservatorio}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNiveisEmTempoReal(idReservatorio) {

    var instrucaoSql = `SELECT 
       nivelCalculado as nivelAtual,
       dtHrNivelCalculado as momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fkReservatorio
                        FROM historicoMedicao WHERE fkReservatorio = ${idReservatorio} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosNiveis,
    buscarNiveisEmTempoReal
}
