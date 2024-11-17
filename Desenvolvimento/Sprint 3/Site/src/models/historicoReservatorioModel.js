var database = require("../database/config");

function exibirDadosReservatorio(idReservatorio) {

  console.log('Entrei no model')


  // nivel atual do reservatorio
  var instrucaoSql1 = `SELECT nivelCalculado AS "Nivel Atual"
                        FROM historico
                          JOIN sensor ON historico.fkSensor = sensor.idColeta
                            JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                              WHERE idReservatorio = ${idReservatorio}
                                ORDER BY historico.dtHrNivelCalculado DESC
                                  LIMIT 1
                      `
  //situcao atual do reservatorio (critico,atencao,ideal)
  var instrucaoSql2 = `select situacaoAtual from historico 
                        JOIN sensor ON historico.fkSensor = sensor.idColeta
                          JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                            WHERE idReservatorio = ${idReservatorio}
                              ORDER BY historico.dtHrNivelCalculado DESC
                                LIMIT 1;
                        `

  // contar aviso crítico
  var instrucaoSql3 = `SELECT COUNT(historico.situacaoAtual) AS AtingiuNivelCritico
                        FROM historico
                          JOIN sensor ON historico.fkSensor = sensor.idColeta
                            JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                              WHERE idReservatorio = ${idReservatorio} AND historico.situacaoAtual = 'Crítico';
                      `


  // Dados para o gráfico
  var instrucaoSql4 = `select nivelCalculado as Nivel, dtHrNivelCalculado as dtHrNivel from historico 
                        JOIN sensor ON historico.fkSensor = sensor.idColeta
                          JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                            WHERE idReservatorio = ${idReservatorio}
                              order by historico.dtHrNivelCalculado;
                      `

  var instrucaoSql5 = `SELECT AVG(nivelCalculado) AS "Media Nivel Calculado"
                        FROM historico
                          JOIN sensor ON historico.fkSensor = sensor.idColeta
                            JOIN reservatorio ON sensor.fkReservatorio = reservatorio.idReservatorio
                              WHERE idReservatorio = ${idReservatorio};
                          `


  var dadosRetornados = []


  console.log("Executando a instrução SQL 1:\n" + instrucaoSql1);
  dadosRetornados.push(database.executar(instrucaoSql1)).then(() => {
    console.log("Executando a instrução SQL 2:\n" + instrucaoSql2);
    dadosRetornados.push(database.executar(instrucaoSql2)).then(() => {
      console.log("Executando a instrução 3:\n" + instrucaoSql3);
      dadosRetornados.push(database.executar(instrucaoSql3)).then(() => {
        console.log("Executando a instrução 4:\n" + instrucaoSql4);
        dadosRetornados.push(database.executar(instrucaoSql4)).then(() => {
          console.log("Executando a instrução 5:\n" + instrucaoSql5);
          dadosRetornados.push(database.executar(instrucaoSql5))
          return dadosRetornados
        })
      });
    })
      .catch((error) => {
        console.error("Erro ao executar instruções SQL:", error);
      });


  })


  module.exports = {
    exibirDadosReservatorio
  }
}
