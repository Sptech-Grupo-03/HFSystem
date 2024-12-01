const { response } = require("express");
var gerenciarReservatorioModel = require("../models/gerenciarReservatorioModel");

function listarFazenda(req, res) {
    var idReservatorio = req.query.idReservatorio;

    gerenciarReservatorioModel.listarReservatorioFazenda(idReservatorio).then(
        function (infoFazenda) {
            res.json(infoFazenda);
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a exibição dos dados do reservatório (HistoricoController.js)! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarReservatorio(req, res) {
    var nomeReservatorio = req.body.nomeReservatorioServer;
    var alturaReservatorio = req.body.alturaReservatorioServer;
    var raioReservatorio = req.body.raioReservatorioServer;
    var codFazenda = req.body.codFazendaServer;

    gerenciarReservatorioModel.cadastrarReservatorioFazenda(nomeReservatorio,alturaReservatorio,raioReservatorio,codFazenda)
    .then(function(resultado){
        console.log('Cadastrando reservatório', resultado)
        res.json(resultado)
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro do reservatório! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    listarFazenda,
    cadastrarReservatorio
}

