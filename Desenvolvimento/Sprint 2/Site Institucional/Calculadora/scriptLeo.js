/*

- Plantações sem irrigação e sem reservatório: Muitas plantações, especialmente em regiões com chuvas regulares, 
não possuem nenhum tipo de sistema de irrigação ou reservatório. A água da chuva é suficiente para suprir as necessidades das plantas.
- Plantações com irrigação, mas sem reservatório: Algumas plantações utilizam água de rios ou poços para irrigação, sem a necessidade 
de um reservatório.
- Plantações com irrigação e reservatório: A combinação de um sistema de irrigação e um reservatório é comum em regiões com períodos de seca, 
permitindo um melhor controle da disponibilidade de água para as plantas.

*/

function exibirComoHFSystemPodeAjudar(){

// CRIAÇÃO DE VARIÁVEIS E ATRIBUIÇÃO DE VALORES

    const tipoPlantacao = document.getElementById("input_tipo_plantacao").value
    const qtdCicloAnualProducao = document.getElementById("input_qtd_ciclo_anual_producao").value
    
    if(document.getElementById("input_trabalha_com_sistema_irrigacao_true").checked){
        const trabalhaSistemas = true
    }else if(document.getElementById("input_trabalha_com_sistema_irrigacao_false").checked){
        const trabalhaSistemas = false
    }

    if(document.getElementById("input_possui_reservatorio_true").checked){
        const possuiReservatorio = true
        const capacidadeReservatorio = document.getElementById("input_capacidade_reservatorio").value
    }else if(document.getElementById("input_possui_reservatorio_false").checked){
        const possuiReservatorio = false
    }

    const consumoAguaMensal = document.getElementById("input_consumo_agua_mensal").value

    if(document.getElementById("input_possui_sistema_monitoramento_reservatorio_true").checked){
        const possuiMonitoramentoReservatorio = true
        
        if(document.getElementById("input_tipo_sistema_manual").checked){
            const tipoMonitoramentoReservatorio = 'manual'
        }else if(document.getElementById("input_tipo_sistema_automatico").checked){
            const tipoMonitoramentoReservatorio = 'automático'
        }

    }else if(document.getElementById("input_possui_sistema_monitoramento_reservatorio_false").checked){
        const possuiMonitoramentoReservatorio = false
    }

    // lÓGICA

    // SE POSSUÍ TRABALHA COM SISTEMA DE IRRIGAÇÃO

    if(possuiReservatorio){
        
    }




}