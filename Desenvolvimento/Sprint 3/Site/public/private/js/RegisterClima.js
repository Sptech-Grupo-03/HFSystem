function registrarClima() {
    const probChuva = document.getElementById("probChuva").textContent;
    const TemperaturaMax = document.getElementById("tempMaxima").textContent;
    const umidadeAr = document.getElementById("umidadeAr").textContent;
    const TemperaturaMinima = document.getElementById("tempMinima").textContent;
  
    fetch("/clima/registrarClima", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        probChuvaServer: probChuva,
        TemperaturaMaxServer: TemperaturaMax,
        umidadeArServer: umidadeAr,
        TemperaturaMinimaServer: TemperaturaMinima,
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
  
  // // Adicione este código ao final do arquivo
  // document.addEventListener('DOMContentLoaded', function() {
  //   setInterval(function() {
  //     console.log('chamando a função de inserção dos dados do clima...');
  //     registrarClima(); 
  //   }, 10000); // 10000ms = 10 segundos
  // });
  