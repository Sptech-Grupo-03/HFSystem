var database = require("../database/config");

async function exibirDadosReservatorio(idReservatorio) {
  try {
    // SQL Queries
    var instrucaoSql1 = ` SELECT nivelAtual AS "Nivel Atual"
                         FROM reservatorio where idReservatorio = ${idReservatorio};`;

    var instrucaoSql2 = `SELECT situacaoAtual 
                         FROM historico 
                         JOIN sensor ON historico.fkSensor = sensor.idColeta
                         JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                         WHERE idReservatorio = ${idReservatorio}
                         ORDER BY historico.dtHrNivelCalculado DESC
                         LIMIT 1`;

    var instrucaoSql3 = `SELECT COUNT(historico.situacaoAtual) AS AtingiuNivelCritico
                         FROM historico
                         JOIN sensor ON historico.fkSensor = sensor.idColeta
                         JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                         WHERE idReservatorio = ${idReservatorio} AND historico.situacaoAtual = 'Crítico'`;

    var instrucaoSql4 = `SELECT nivelCalculado AS Nivel, dtHrNivelCalculado AS dtHrNivel 
                         FROM historico 
                         JOIN sensor ON historico.fkSensor = sensor.idColeta
                         JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                         WHERE idReservatorio = ${idReservatorio}
                         ORDER BY historico.dtHrNivelCalculado`;

    var instrucaoSql5 = `SELECT AVG(nivelCalculado) AS "Media Nivel Calculado"
                         FROM historico
                         JOIN sensor ON historico.fkSensor = sensor.idColeta
                         JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                         WHERE idReservatorio = ${idReservatorio}`;

    var instrucaoSql6 = `
                        SELECT 
                        FLOOR(historico.nivelCalculado / 
                        (SELECT AVG(historico.nivelCalculado)
                        FROM historico
                        JOIN sensor ON historico.fkSensor = sensor.idColeta
                        JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                        WHERE reservatorio.idReservatorio = ${idReservatorio})) AS ConsumoEstimado
                        FROM historico
                        JOIN sensor ON historico.fkSensor = sensor.idColeta
                        JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                        WHERE reservatorio.idReservatorio = ${idReservatorio} 
                        ORDER BY historico.dtHrNivelCalculado limit 1;
                        `

    // Executando as consultas com await
    console.log("Executando a instrução SQL 1:\n" + instrucaoSql1);
    const resultado1 = await database.executar(instrucaoSql1);

    console.log("Executando a instrução SQL 2:\n" + instrucaoSql2);
    const resultado2 = await database.executar(instrucaoSql2);

    console.log("Executando a instrução SQL 3:\n" + instrucaoSql3);
    const resultado3 = await database.executar(instrucaoSql3);

    console.log("Executando a instrução SQL 4:\n" + instrucaoSql4);
    const resultado4 = await database.executar(instrucaoSql4);

    console.log("Executando a instrução SQL 5:\n" + instrucaoSql5);
    const resultado5 = await database.executar(instrucaoSql5);


    console.log("Executando a instrução SQL 6:\n" + instrucaoSql6);
    const resultado6 = await database.executar(instrucaoSql6);


    console.log([resultado1, resultado2, resultado3, resultado4, resultado5, resultado6])
    return [resultado1, resultado2, resultado3, resultado4, resultado5, resultado6];
  } catch (error) {
    console.error("Erro ao executar instruções SQL:", error);
    throw error;

  }
}

module.exports = {
  exibirDadosReservatorio
};
