
var climaModel = require("../models/climaModel");
function registrarClima(req, res) {

    // probChuvaServer: probChuva, // Probabilidade de Chuva
    // TemperaturaMaxServer: TemperaturaMax, // Temperatura Maxima 
    // umidadeArServer: umidadeAr, // Umidade do ar
    // TemperaturaMinimaServer: TemperaturaMinima, // Temperatura Minima
    // // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var probChuva = req.body.probChuvaServer;
    var TemperaturaMax = req.body.TemperaturaMaxServer;
    var umidadeAr = req.body.umidadeArServer;
    var TemperaturaMinima = req.body.TemperaturaMinimaServer;
  
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        climaModel.registrarClima(probChuva, TemperaturaMax, umidadeAr, TemperaturaMinima)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log("já passei pelo model")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
  
  
  module.exports = {
    registrarClima
  }