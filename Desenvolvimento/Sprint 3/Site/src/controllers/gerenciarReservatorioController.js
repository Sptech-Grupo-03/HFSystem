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

function listarReservatorios(req, res) {
    const codigoFazenda = req.query.codFazenda;

    if (!codigoFazenda) {
        return res.status(400).send("Código da fazenda não informado.");
    }

    gerenciarReservatorioModel.listarReservatorioDelete(codigoFazenda)
        .then(reservatorios => {
            res.status(200).json(reservatorios);
        })
        .catch(erro => {
            console.error("Erro ao listar reservatórios para exclusão:", erro);
            res.status(500).send("Erro ao listar reservatórios.");
        });
}

function removerReservatorio(req, res){
    const idReservatorio = req.query.idReservatorio

    if (!idReservatorio) {
        return res.status(400).send("Código do reservatório não fornecido.");
    }

    gerenciarReservatorioModel.removerReservatorio(idReservatorio).then(
        () => res.status(200).send("Reservatório removido com sucesso.")
    ).catch(erro => {
        console.error("Erro ao remover reservatório:", erro);
        res.status(500).send("Erro ao remover reservatório.");
    });
}

module.exports = {
    listarFazenda,
    cadastrarReservatorio,
    listarReservatorios,
    removerReservatorio
}

