var climaModel = require("../models/ClimaModel");

function registrarClima(req, res) {
  // probChuvaServer: probChuva, // Probabilidade de Chuva
  // TemperaturaMaxServer: TemperaturaMax, // Temperatura Maxima
  // umidadeArServer: umidadeAr, // Umidade do ar
  // TemperaturaMinimaServer: TemperaturaMinima, // Temperatura Minima
  // // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var probChuva = req.body.probChuvaServer;
  var temperaturaMax = req.body.temperaturaMaxServer;
  var umidadeAr = req.body.umidadeArServer;
  var temperaturaMinima = req.body.temperaturaMinimaServer;

  // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
  climaModel
    .registrarClima(probChuva, temperaturaMax, umidadeAr, temperaturaMinima)
    .then(function (resultado) {
      res.json(resultado);
      console.log("já passei pelo model");
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function exibirClima(req, res) {
  console.log("Recebendo requisição para exibir clima");

  var idFazenda = req.body.idFazendaServer;
  var inicioConsulta = req.body.inicioConsultaServer;
  var fimConsulta = req.body.fimConsultaServer;

  console.log("Parâmetros recebidos:", {
    idFazenda,
    inicioConsulta,
    fimConsulta,
  });

  climaModel
    .exibirClima(idFazenda, inicioConsulta, fimConsulta)
    .then(function (resultado) {
      console.log("Resultado do modelo:", resultado);
      
      return res.json(resultado);
    })
    .catch(function (erro) {
      console.error(
        "Erro ao exibir clima! Detalhes do erro:",
        erro.sqlMessage || erro
      );
      res.status(500).json({
        mensagem: "Erro ao exibir clima.",
        detalhes: erro.sqlMessage || erro,
      });
    });
}

module.exports = {
  registrarClima,
  exibirClima,
};
