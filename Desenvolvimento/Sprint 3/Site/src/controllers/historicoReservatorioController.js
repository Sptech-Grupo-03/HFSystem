var historicoReservatorioModel = require("../models/historicoReservatorioModel");

function exibirDadosReservatorio(req, res) {

    var idReservatorio = req.body.idReservatorioServer;
  

    if (idReservatorio == undefined) {
        res.status(400).send("idReservatorio undefined");
    }

    console.log('Entrei no controller');
    historicoReservatorioModel.exibirDadosReservatorio(idReservatorio)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a exibição dos dados do reservatório (HistoricoController.js)! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );

    }
  
  module.exports = {
    exibirDadosReservatorio
  }