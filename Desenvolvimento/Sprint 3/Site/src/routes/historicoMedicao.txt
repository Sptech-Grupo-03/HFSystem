var express = require("express");
var router = express.Router();

var historicoMedicaoController = require("../controllers/historicoMedicaoController");

router.get("/ultimas/:idReservatorio", function (req, res) {
    historicoMedicaoController.buscarUltimosNiveis(req, res);
});

router.get("/tempo-real/:idReservatorio", function (req, res) {
    medidaController.buscarNiveisEmTempoReal(req, res);
})

module.exports = router;