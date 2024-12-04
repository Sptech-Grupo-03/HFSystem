var express = require("express");
var router = express.Router();

var climaController = require("../controllers/ClimaController");

console.log("entrei no routes");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/registrarClima", function (req, res) {
    climaController.registrarClima(req, res);
})

router.post("/exibirClima", function (req, res) {
    climaController.exibirClima(req, res);
})

module.exports = router;


