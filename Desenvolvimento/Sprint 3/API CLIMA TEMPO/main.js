// var ambiente_processo = 'producao';
var ambiente_processo = "desenvolvimento";

var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso
import dotenv from "dotenv";

dotenv.config({ path: caminho_env });

import mysql from "mysql2/promise";
import cron from "node-cron"; // Para agendamento

// Configuração do banco de dados
// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
  // Configurações da conexão com o banco de dados
  host: process.env.DB_HOST, // Endereço do servidor de banco de dados (definido em uma variável de ambiente).
  database: process.env.DB_DATABASE, // Nome do banco de dados.
  user: process.env.DB_USER, // Nome de usuário para acessar o banco.
  password: process.env.DB_PASSWORD, // Senha do usuário.
  port: process.env.DB_PORT, // Porta do servidor MySQL.
};

const poolBancoDados = mysql.createPool(mySqlConfig);

// Informações da API de previsão do tempo
const forecastApiKeyInformations = {
  key: "b36426fe6b7644949b540420241211",
  base: "https://api.weatherapi.com/v1/forecast.json",
};

const weatherProbability = [];

// Função para buscar dados do clima da API
async function fetchWeatherData(city) {
  console.log("Iniciando o processo de captura dos dados do clima...");
  try {
    const response = await fetch(
      `${forecastApiKeyInformations.base}?key=${forecastApiKeyInformations.key}&q=${city}&days=1`
    );
    const data = await response.json();

    if (data && data.forecast && data.forecast.forecastday[0]) {
      const forecast = data.forecast.forecastday[0].day;

      weatherProbability[0] = forecast.daily_chance_of_rain;
      weatherProbability[1] = forecast.avghumidity;
      weatherProbability[2] = Math.round(forecast.maxtemp_c);
      weatherProbability[3] = Math.round(forecast.mintemp_c);

      console.log("Previsão do tempo obtida com sucesso:", weatherProbability);
    } else {
      console.log("Dados de previsão não encontrados.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

// Função principal
async function main(idUsuario) {
  try {
    
    const [rows] = await poolBancoDados.execute(
      `SELECT cidade, fkFazenda 
   FROM endereco 
   JOIN fazenda ON fkEndereco = idEndereco 
   JOIN usuario ON fkFazenda = codigoFazenda 
   WHERE idUsuario = ?`,
      [idUsuario]
    );

    const cidade = rows[0]?.cidade;
    const fkFazenda = rows[0]?.fkFazenda;

    if (!cidade) {
      console.error("Cidade não encontrada no banco de dados.");
      return;
    }

    // Aguarde a captura de dados
    await fetchWeatherData(cidade);

    // Verifique se todos os dados necessários estão completos
    if (weatherProbability.some((value) => value === undefined)) {
      console.error(
        "Dados incompletos ou indefinidos, não foi possível inserir no banco."
      );
      return;
    }

    // Substituindo valores undefined por null
    const [
      probabilidadeDeChuva,
      temperaturaMaxima,
      umidadeDoAr,
      temperaturaMinima,
    ] = weatherProbability.map((val) => (val === undefined ? null : val));

    // Inserir os dados de clima no banco de dados
    const [result] = await poolBancoDados.execute(
      "INSERT INTO clima (probabilidadeDeChuva, temperaturaMaxima, UmidadeDoAr, temperaturaMinima, dtHrColeta, fkFazenda) VALUES (?, ?, ?, ?, NOW(), ?)",
      [
        probabilidadeDeChuva,
        temperaturaMaxima,
        umidadeDoAr,
        temperaturaMinima,
        fkFazenda,
      ]
    );

    console.log("Valores inseridos no banco com sucesso:", result);
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
  }
}

console.log("API CLIMA TEMPO - HFSYSTEM");


// Agendamento do cron job para executar diariamente às 00:00
cron.schedule("00 00 * * *", () => {
  console.log("Executando tarefa agendada às 00:00");
  main(process.env.ID_USUARIO_BD);
});

main(process.env.ID_USUARIO_BD)