var express = require("express");
var router = express.Router();

var gerenciarReservatorioController = require("../controllers/gerenciarReservatorioController.js");

router.get("/listarFazenda", function (req, res) {
    gerenciarReservatorioController.listarFazenda(req, res);
})

router.post("/cadastrarReservatorio", function (req, res) {
    gerenciarReservatorioController.cadastrarReservatorio(req, res);
})

router.get("/listarReservatorios", function (req, res) {
    gerenciarReservatorioController.listarReservatorios(req, res);
})

router.delete("/removerReservatorio", function (req, res) {
    gerenciarReservatorioController.removerReservatorio(req, res);
})

module.exports = router;