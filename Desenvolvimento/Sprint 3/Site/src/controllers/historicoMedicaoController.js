var historicoMedicaoModel = require("../models/historicoMedicaoModel");

function buscarUltimosNiveis(req, res) {

    const limite_linhas = 7;

    var idReservatorio = req.params.idReservatorio;

    console.log(`Recuperando os ultimos ${limite_linhas} níveis`);

    historicoMedicaoModel.buscarUltimosNiveis(idReservatorio, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos níveis.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarNiveisEmTempoReal(req, res) {

    var idReservatorio = req.params.idReservatorio;

    console.log(`Recuperando níveis em tempo real`);

    historicoMedicaoModel.buscarNiveisEmTempoReal(idReservatorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos níveis.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimosNiveis,
    buscarNivee

}