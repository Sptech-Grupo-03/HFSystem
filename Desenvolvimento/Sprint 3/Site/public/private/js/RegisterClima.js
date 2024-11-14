function registrarClima() {
    const probChuva = document.getElementById("probChuva").textContent;
    const TemperaturaMax = document.getElementById("tempMaxima").textContent;
    const umidadeAr = document.getElementById("umidadeAr").textContent;
    const TemperaturaMinima = document.getElementById("tempMinima").textContent;
  
    fetch("/clima/cadastrar", {
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
          console.log("Cadastro realizado com sucesso!");
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
      });
  }
  
  // Adicione este código ao final do arquivo
  document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
      console.log('Enviando dados para registro...');
      cadastrar(); // Chama a função de cadastro
    }, 10000); // 10000ms = 10 segundos
  });
  