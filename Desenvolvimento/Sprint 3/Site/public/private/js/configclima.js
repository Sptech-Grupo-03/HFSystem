const forecastApiKeyInformations = {
  key: "b36426fe6b7644949b540420241211",
  base: "https://api.weatherapi.com/v1/forecast.json",
};

const weatherProbability = []

// Função para buscar a previsão de chuva e as temperaturas

function fetchWeatherData(city) {
  console.log("Iniciando o processo de captura dos dados do clima...");
  fetch(
    `${forecastApiKeyInformations.base}?key=${forecastApiKeyInformations.key}&q=${city}&days=1`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.forecast && data.forecast.forecastday[0]) {
        
        const forecast = data.forecast.forecastday[0].day;

        weatherProbability.push(forecast.daily_chance_of_rain);
        weatherProbability.push(forecast.avghumidity);
        weatherProbability.push(Math.round(forecast.maxtemp_c));
        weatherProbability.push(Math.round(forecast.mintemp_c));

        console.log(weatherProbability[0])
        console.log(weatherProbability[1])
        console.log(weatherProbability[2])
        console.log(weatherProbability[3])

        registerWeather(weatherProbability)

        setWheaterProbability(weatherProbability)

      } else {
        console.log("Dados de previsão não encontrados.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao carregar a previsão do tempo.");
    });
}

function setWheaterProbability(weatherProbability = []) {

  document.getElementById("probChuva").innerHTML = `${weatherProbability[0]}%`;
  document.getElementById("tempMinima").innerHTML = `${weatherProbability[3]}°C`;
  document.getElementById("tempMaxima").innerHTML = `${weatherProbability[2]}°C`;
  document.getElementById("umidadeAr").innerHTML = `${weatherProbability[1]}`;
}

// Chamar a função de previsão ao carregar a página

// s
