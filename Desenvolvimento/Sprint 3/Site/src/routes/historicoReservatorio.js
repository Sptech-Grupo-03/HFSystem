var express = require("express");
var router = express.Router();

var historicoReservatorioController = require("../controllers/historicoReservatorioController");

//Recebendo os dados do html e direcionando para a função exibirDadosReservatorio de historicoReservatorioController.js
router.post("/exibirDadosReservatorio", function (req, res) {
    historicoReservatorioController.exibirDadosReservatorio(req, res);
})


module.exports = router;