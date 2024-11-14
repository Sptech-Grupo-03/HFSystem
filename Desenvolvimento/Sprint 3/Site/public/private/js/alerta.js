var alertas = [];

function obterdados(idReservatorio) {
    fetch(`/historicoMedicao/tempo-real/${idReservatorio}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAquario);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idReservatorio} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do reservatório p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idReservatorio) {
    var nivel = resposta[0].nivel;

    var grauDeAviso = '';

    var limites = {
        ideal: 51,
        abaixoIdeal: 50,
        risco: 25
    };

    var classe_nivel = 'cor-alerta';

    // if (temp >= limites.muito_quente) {
    //     classe_temperatura = 'cor-alerta perigo-quente';
    //     grauDeAviso = 'perigo quente'
    //     grauDeAvisoCor = 'cor-alerta perigo-quente'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.muito_quente && temp >= limites.quente) {
    //     classe_temperatura = 'cor-alerta alerta-quente';
    //     grauDeAviso = 'alerta quente'
    //     grauDeAvisoCor = 'cor-alerta alerta-quente'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.quente && temp > limites.frio) {
    //     classe_temperatura = 'cor-alerta ideal';
    //     removerAlerta(idAquario);
    // }
    // else if (temp <= limites.frio && temp > limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta alerta-frio';
    //     grauDeAviso = 'alerta frio'
    //     grauDeAvisoCor = 'cor-alerta alerta-frio'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp <= limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta perigo-frio';
    //     grauDeAviso = 'perigo frio'
    //     grauDeAvisoCor = 'cor-alerta perigo-frio'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }

    var card;

    if (document.getElementById(`nivel_atual_${idReservatorio}`) != null) {
        document.getElementById(`nivel_atual_${idReservatorio}`).innerHTML = nivel + "%";
    }

    // if (document.getElementById(`porcentagemAtual_${idReservatorio}`)) {
    //     card = document.getElementById(`porcentagemAtual_${idReservatorio}`)
    //     card.className = classe_temperatura;
    // }
}

function exibirAlerta(nivel, idReservatorio, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idReservatorio == idReservatorio);

    if (indice >= 0) {
        alertas[indice] = { idReservatorio, nivel, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idReservatorio, nivel, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idReservatorio != idReservatorio);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idReservatorio, nivel, grauDeAviso, grauDeAvisoCor }) {

    var nome = JSON.parse(sessionStorage.RESERVATORIOS).find(item => item.id == idReservatorio).nome;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${nome} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${nivel}%.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.RESERVATORIOS).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}
