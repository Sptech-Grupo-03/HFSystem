// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    //valoresSensorAnalogico,
    valoresSensorDigital,
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'HFSystem',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorDigital = parseInt(valores[0]);
        valoresSensorDigital.push(sensorDigital);
    
        // Busca altura e raio da tabela reservatorio
        let altura, raio;
        try {
            const [resultado] = await poolBancoDados.execute(
                `SELECT altura, raio FROM reservatorio WHERE idReservatorio = ?`,
                [8] // ID do reservatório fixado como 8
            );
    
            if (resultado.length > 0) {
                altura = resultado[0].altura;
                raio = resultado[0].raio;
                console.log(`Altura: ${altura}, Raio: ${raio}`);
            } else {
                console.warn('Nenhum reservatório encontrado com o ID especificado.');
            }
        } catch (err) {
            console.error('Erro ao buscar altura e raio:', err);
            return;
        }
    
        if (HABILITAR_OPERACAO_INSERIR) {
            // Insere os dados na tabela sensor
            await poolBancoDados.execute(
                `
                INSERT INTO sensor (distanciaAgua, dtHrColeta, fkReservatorio) VALUES (?, CURDATE(), 8);
                `,
                [sensorDigital]
            );
            const [lastInsertId] = await poolBancoDados.execute('SELECT LAST_INSERT_ID() AS id;');
            const idSensor = lastInsertId[0].id; 

            await poolBancoDados.execute(
                `
                INSERT INTO reservatorio (idReservatorio, nivelAtual) 
                VALUES (8, ?)
                ON DUPLICATE KEY UPDATE nivelAtual = VALUES(nivelAtual);
                `,
                [sensorDigital]
            );

            const volumeReservatorio = 3.14 * Math.pow(raio, 2) * altura
    
            const volumeCalculado = 3.14 * Math.pow(raio, 2) * altura - sensorDigital;

            const volumePorcentagem = (volumeCalculado * 100) / volumeReservatorio
    
            let situacao;
            if (volumePorcentagem < 25) {
                situacao = 'Crítico';
            } else if (volumePorcentagem < 50) {
                situacao = 'Em atenção';
            } else {
                situacao = 'Ideal';
            }

            await poolBancoDados.execute(
                `
                INSERT INTO historico (fkSensor, nivelCalculado, situacaoAtual) 
                VALUES (?, ?, ?)
                `,
                [idSensor, volumePorcentagem, situacao] 
            );
    
            console.log("Valores inseridos no banco: " + sensorDigital);
        }
        await poolBancoDados.execute('COMMIT');
        console.log("Valores inseridos com sucesso em ambas as tabelas: " + sensorDigital);
    });
    
}

// função para criar e configurar o servidor web
const servidor = (
    //valoresSensorAnalogico,
    valoresSensorDigital
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor

    app.get('/sensores/digital', (_, response) => {
        return response.json(valoresSensorDigital);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorDigital = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorDigital
    );

    // inicia o servidor web
    servidor(
        valoresSensorDigital
    );
})();