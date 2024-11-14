// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresasRouter = require("./src/routes/empresas");
var reservatoriosRouter = require("./src/routes/reservatorio");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/reservatorios", reservatoriosRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});

// <<<<<<< HEAD
// // importando os bibliotecas necessárias GEMINI.IA
// const { GoogleGenerativeAI } = require("@google/generative-ai");


// // configurando o servidor express
// const PORTA_SERVIDOR = process.env.PORTA;

// // configurando o gemini (IA)
// const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);

// // configurando o servidor para receber requisições JSON
// app.use(express.json());

// // configurando o servidor para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, "public")));

// // configurando CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
//     next();
// });

// // inicializando o servidor
// app.listen(PORTA_SERVIDOR, () => {
//     console.info(
//         `
//         ######                ###    #    
//         #     #  ####  #####   #    # #   
//         #     # #    # #    #  #   #   #  
//         ######  #    # #####   #  #     # 
//         #     # #    # #    #  #  ####### 
//         #     # #    # #    #  #  #     # 
//         ######   ####  #####  ### #     # 
//         `
//     );
//     console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
// });

// // rota para receber perguntas e gerar respostas
// app.post("/perguntar", async (req, res) => {
//     const pergunta = req.body.pergunta;

//     try {
//         const resultado = await gerarResposta(pergunta);
//         res.json( { resultado } );
//     } catch (error) {
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }

// });

// =======
// >>>>>>> 04f06488bd228c658fc98f16c890dc6b1450e849
