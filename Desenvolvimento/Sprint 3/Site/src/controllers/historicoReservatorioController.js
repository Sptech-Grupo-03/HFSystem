var historicoReservatorioModel = require("../models/historicoReservatorioModel");

function exibirDadosReservatorio(req, res) {
  var idReservatorio = req.body.idReservatorioServer;
  var inicioConsulta = req.body.inicioConsultaServer;
  var fimConsulta = req.body.fimConsultaServer;

  if (idReservatorio == undefined) {
    console.log(idReservatorio);
    res.status(400).send("idReservatorio undefined");
  }
  if (inicioConsulta == undefined) {
    console.log(inicioConsulta);
    res.status(400).send("inicioConsulta undefined");
    
  }

  if (fimConsulta == undefined) {
    console.log(fimConsulta);
    res.status(400).send("fimConsulta undefined");
  }

  console.log("Entrei no controller");
  historicoReservatorioModel
    .exibirDadosReservatorio(idReservatorio, inicioConsulta, fimConsulta)
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
}

module.exports = {
  exibirDadosReservatorio,
};
