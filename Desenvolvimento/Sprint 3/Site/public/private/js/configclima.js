const apiKey = "b36426fe6b7644949b540420241211";  // Substitua pela sua chave de API
const baseURL = "https://api.weatherapi.com/v1/forecast.json";

// Função para buscar a previsão de chuva e as temperaturas
    function fetchWeatherData(city) {
    fetch(`${baseURL}?key=${apiKey}&q=${city}&days=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.forecast && data.forecast.forecastday[0]) {
                const forecast = data.forecast.forecastday[0].day;

                // Exibindo a probabilidade de chuva
                const rainProbability = forecast.daily_chance_of_rain;
                document.getElementById('probChuva').innerText = `${rainProbability}%`;

                // Exibindo temperatura mínima e máxima
                document.getElementById('tempMinima').innerText = `${Math.round(forecast.mintemp_c)}°C`;
                document.getElementById('tempMaxima').innerText = `${Math.round(forecast.maxtemp_c)}°C`;
            } else {
                console.log("Dados de previsão não encontrados.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao carregar a previsão do tempo.");
        });
}

// Chamar a função de previsão ao carregar a página
window.addEventListener('load', () => {
    fetchWeatherData("São Paulo");  // Chama para obter dados de São Paulo, você pode mudar para outras cidades
});
        
        const api = {
            key: "64ed82577ced7f69cb1687f0ce536131",
            base: "https://api.openweathermap.org/data/2.5/",
            lang: "pt_br",
            units: "metric"
        }
  
        // Preencher temperatura mínima e máxima do Rio de Janeiro
        function getWeather() {
            fetch(`${api.base}weather?q=Rio de Janeiro&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro HTTP: status ${response.status}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    alert(error.message);
                })
                .then(response => {
                    displayResults(response);
                });
        }
  
        function displayResults(weather) {
            console.log(weather);
  
            // Atualiza temperatura mínima
            document.getElementById('tempMinima').innerText = `${Math.round(weather.main.temp_min)}°C`;
  
            // Atualiza temperatura máxima
            document.getElementById('tempMaxima').innerText = `${Math.round(weather.main.temp_max)}°C`;
        }
  
        // Quando a página carregar, pega os dados de clima do Rio de Janeiro
        window.addEventListener('load', getWeather);
        document.addEventListener("DOMContentLoaded", function() {
          HGWeather.initialize();
        });
