var express = require("express");
var router = express.Router();

var ClimaController = require("../controllers/ClimaController");

console.log("entrei no routes");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/registrarClima", function (req, res) {
    ClimaController.registrarClima(req, res);
})

module.exports = router;