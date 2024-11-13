var express = require("express");
var router = express.Router();

var ClimaController = require("../controllers/ClimaController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    ClimaController.cadastrar(req, res);
})

module.exports = router;