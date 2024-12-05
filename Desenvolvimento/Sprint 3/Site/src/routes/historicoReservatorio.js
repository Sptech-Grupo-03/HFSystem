var express = require("express");
var router = express.Router();

var historicoReservatorioController = require("../controllers/historicoReservatorioController");
var historicoReservatorioController = require("../controllers/reservatorioController");

//Recebendo os dados do html e direcionando para a função exibirDadosReservatorio de historicoReservatorioController.js
router.post("/exibirDadosReservatorio", function (req, res) {
    historicoReservatorioController.exibirDadosReservatorio(req, res);
})

router.get("/enviar", function (req, res) {
    reservatorioController.enviar(req, res)
});

module.exports = router;