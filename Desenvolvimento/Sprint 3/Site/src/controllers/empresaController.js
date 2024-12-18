var empresaModel = require("../models/empresaModel");


function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {

      empresaModel.autenticar(email, senha)
          .then(
              function (resultadoAutenticar) {
                  console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                  if (resultadoAutenticar.length == 1) {
                      console.log(resultadoAutenticar);

                      aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                          .then((resultadoAquarios) => {
                              if (resultadoAquarios.length > 0) {
                                  res.json({
                                      id: resultadoAutenticar[0].id,
                                      email: resultadoAutenticar[0].email,
                                      nome: resultadoAutenticar[0].nome,
                                      senha: resultadoAutenticar[0].senha,
                                      cpf: resultadoAutenticar[0].cpf,
                                      aquarios: resultadoAquarios
                                  });
                              } else {
                                  res.status(204).json({ aquarios: [] });
                              }
                          })
                  } else if (resultadoAutenticar.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }

}

function cadastrar(req, res) {

  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeUsuario = req.body.nomeUsuarioServer;
  var email = req.body.emailServer;
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;
  var representanteLegal = req.body.representanteLegalServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (nomeUsuario == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (razaoSocial == undefined) {
      res.status(400).send("Sua razaoSocialServer está undefined!");
  } else if (nomeFantasia == undefined) {
      res.status(400).send("Seu nomeFantasia está undefined!");
  }else if (cnpj == undefined) {
      res.status(400).send("Seu cnpj está undefined!");
  }else if (representanteLegal == undefined) {
      res.status(400).send("Seu representanteLegal está undefined!");
  }else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
  } else {

      // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
      empresaModel.cadastrar(nomeUsuario, email, razaoSocial, nomeFantasia, cnpj, representanteLegal, senha)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

module.exports = {
  autenticar,
  cadastrar
}