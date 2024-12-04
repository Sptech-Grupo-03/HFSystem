const reservatorioModel = require("../models/reservatorioModel");
var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);

          reservatorioModel.buscarReservatoriosPorFazenda(resultadoAutenticar[0].fazendaId)
            .then((resultadoReservatorio) => {
              if (resultadoReservatorio.length > 0) {
                res.json({
                  email: resultadoAutenticar[0].email,
                  nome: resultadoAutenticar[0].nome,
                  reservatorio: resultadoReservatorio,
                });

                console.log(resultadoAutenticar[0].email);
                console.log(resultadoAutenticar[0].nome);
                console.log(resultadoReservatorio);
              } else {
                res.status(204).json({ reservatorio: [] });
              }
            });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  var codigoAcesso = req.body.codigoAcessoServer;
  var nomeComplemento = req.body.nomeComplementoServer;
  var userName = req.body.userNameServer;
  var email = req.body.emailServer;
  var celular = req.body.celularServer;
  var senha = req.body.senhaServer;

  if (codigoAcesso == undefined) {
    res.status(400).send("codigoAcesso está undefined!");
  } else if (nomeComplemento == undefined) {
    res.status(400).send("nomeComplemento está undefined!");
  } else if (userName == undefined) {
    res.status(400).send("userName está undefined!");
  } else if (email == undefined) {
    res.status(400).send("email está undefined!");
  } else if (celular == undefined) {
    res.status(400).send("celular está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("senha está undefined!");
  } else {
    usuarioModel.cadastrar(codigoAcesso, nomeComplemento, userName, email, celular, senha)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(err.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
};
