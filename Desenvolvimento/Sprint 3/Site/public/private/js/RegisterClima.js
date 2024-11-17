function registerWeather() {
  
    fetch("/clima/registrarClima", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        probChuvaServer: weatherProbability[0],
        umidadeArServer: weatherProbability[1],
        temperaturaMaxServer: weatherProbability[2],
        temperaturaMinimaServer: weatherProbability[3],
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          console.log("Dados do clima inseridos no banco com sucesso!");
        } else {
          throw "Houve um erro ao tentar realizar a inserção dos dados do clima no banco!";
        }
      })
      .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
      });
  }
  
