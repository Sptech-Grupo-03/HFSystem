var historicoReservatorioModel = require("../models/historicoReservatorioModel");

function exibirDadosReservatorio(req, res) {
  var idReservatorio = req.body.idReservatorioServer;

  if (idReservatorio == undefined) {
    res.status(400).send("idReservatorio undefined");
  }

  console.log("Entrei no controller");
  historicoReservatorioModel
    .exibirDadosReservatorio(idReservatorio)
    .then(function (resultadoReservatorio) {
      if (resultadoReservatorio.length > 0) {
        res.json({
          reservatorio: resultadoReservatorio,
        });
        console.log(resultadoReservatorio);
      } else {
        res.status(204).json({ reservatorio: [] });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar a exibição dos dados do reservatório (HistoricoController.js)! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });

    console.log('Entrei no controller');
    historicoReservatorioModel.exibirDadosReservatorio(idReservatorio)
            .then(
                function (resultadoDadosReservatorio) {
                    if (resultadoDadosReservatorio.length > 0) {
                        res.json({
                            dadosReservatorio: resultadoDadosReservatorio,
                        });
                    console.log(resultadoDadosReservatorio)
                    } else {
                        res.status(204).json({ dadosReservatorio: [] });
                    }
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

