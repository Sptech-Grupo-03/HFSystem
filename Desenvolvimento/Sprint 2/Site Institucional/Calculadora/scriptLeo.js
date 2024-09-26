function exibirComoHFSystemPodeAjudar(){
    const tipoPlantacao = document.getElementById("input_tipo_plantacao").value
    const qtdCicloAnualProducao = document.getElementById("input_qtd_ciclo_anual_producao").value
    
    if(document.getElementById("input_trabalha_com_sistemas_true").checked){
        const trabalhaSistemas = true
    }else if(document.getElementById("input_trabalha_com_sistemas_false").checked){
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

    if()

}