import dotenv from "dotenv";
import express from "express";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definindo __filename e __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregando as variáveis de ambiente
dotenv.config({ path: '.env' });

const app = express();
const PORTA_SERVIDOR = 3001;

console.log(PORTA_SERVIDOR);

// Configurando o gemini (IA)
const chatIA = new GoogleGenerativeAI("AIzaSyAX0JcYgRESEp_6-lMjTfmsklSQVkDQCPA");

// Configurando o servidor Express
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Iniciando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(`Servidor iniciado em http://localhost:${PORTA_SERVIDOR}`);
});

// Rota para perguntas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {
    const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

    try {
        const resultado = await modeloIA.generateContent(`Em um parágrafo, responda: ${mensagem}`);
        const resposta = await resultado.response.text();
        console.log(resposta);
        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
