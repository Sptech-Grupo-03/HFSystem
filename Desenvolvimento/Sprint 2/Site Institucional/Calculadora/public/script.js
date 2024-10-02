function setarDisplayNoneSections(){ 
    document.getElementById('section_index').style.display = 'none';
    document.getElementById('section_informacoes').style.display = 'none';
    document.getElementById('section_perguntas_plantacao').style.display = 'none';
    document.getElementById('section_perguntas_ciclo').style.display = 'none';
    document.getElementById('section_valor_bruto').style.display = 'none';
    document.getElementById('section_consumo_mensal').style.display = 'none';
    document.getElementById('section_trabalha_sistema_irrigacao').style.display = 'none';
    document.getElementById('section_possui_reservatorio').style.display = 'none';
    document.getElementById('section_capacidade_reservatorio').style.display = 'none';
    document.getElementById('section_monitoramento_reservatorio').style.display = 'none';
    document.getElementById('section_tipo_monitoramento').style.display = 'none';
    document.getElementById('section_tudo_pronto').style.display = 'none';
    document.getElementById('section_mensagem_final').style.display = 'none';    
}

//FUNÇÕES PARA EXIBIR CADA SEÇÃO DE PERGUNTA PERGUNTAS

function mostrarIndex(){
    setarDisplayNoneSections(); 
    document.getElementById('section_index').style.display = 'flex';
}

function mostrarInformacoes() {
    setarDisplayNoneSections();
    document.getElementById('section_informacoes').style.display = 'flex';
}

function mostrarPerguntasPlantacao() {
    setarDisplayNoneSections(); 
    document.getElementById('section_perguntas_plantacao').style.display = 'flex';
}

function mostrarPerguntasCiclo(){
    setarDisplayNoneSections(); 
    document.getElementById('section_perguntas_ciclo').style.display = 'flex';
}

function mostrarPerguntasValorBruto(){
    setarDisplayNoneSections(); 
    document.getElementById('section_valor_bruto').style.display = 'flex';
}

function mostrarConsumoMensal(){
    setarDisplayNoneSections(); 
    document.getElementById('section_consumo_mensal').style.display = 'flex';
}

function trabalhaSistemaIrrigacao(){
    setarDisplayNoneSections(); 
    document.getElementById('section_trabalha_sistema_irrigacao').style.display = 'flex';

}

function mostrarPossuiReservatorio(){
    setarDisplayNoneSections(); 
    document.getElementById('section_possui_reservatorio').style.display = 'flex';
}

function mostrarCapacidadeReservatorio(){
    setarDisplayNoneSections(); 
    document.getElementById('section_capacidade_reservatorio').style.display = 'flex';
}

function mostrarMonitoramentoReservatorio(){
    setarDisplayNoneSections(); 
    document.getElementById('section_monitoramento_reservatorio').style.display = 'flex';

}

function mostrarTipoMonitoramento(){
    setarDisplayNoneSections(); 
    document.getElementById('section_tipo_monitoramento').style.display = 'flex';
    }

function mostrarTudoPronto(){
    setarDisplayNoneSections(); 
    document.getElementById('section_tudo_pronto').style.display = 'flex';
}

function mostrarMensagemFinal(){
    setarDisplayNoneSections(); 
    document.getElementById('section_mensagem_final').style.display = 'flex';
    exibirComoHFSystemPodeAjudar();
}

/* - Plantações sem irrigação e sem reservatório: Muitas plantações,
 * especialmente em regiões com chuvas regulares,
não possuem nenhum tipo de
 * sistema de irrigação ou reservatório. A água da chuva é suficiente para
 * suprir as necessidades das plantas.
- Plantações com irrigação, mas sem
 * reservatório: Algumas plantações utilizam água de rios ou poços para
 * irrigação, sem a necessidade de um reservatório.
- Plantações com irrigação e
 * reservatório: A combinação de um sistema de irrigação e um reservatório é
 * comum em regiões com períodos de seca, permitindo um melhor controle da
 * disponibilidade de água para as plantas.
 */

function exibirComoHFSystemPodeAjudar() {
    var exibicao = document.getElementById("p_resultado");
    var tipoPlantacao = document.getElementById("input_tipo_plantacao").value;
    var valorBruto = parseFloat(document.getElementById("input_faturamento_anual").value);
    var qtdCiclosAnualProducao = parseInt(document.getElementById("input_qtd_ciclos_anual_producao").value);
    var consumoAguaMensal = document.getElementById("nao_sei_consumo_agua_mensal").checked ? 10000 : parseFloat(document.getElementById("input_consumo_agua_mensal").value);
    var trabalhaSistemasIrrigacao = document.getElementById("input_trabalha_com_sistema_irrigacao_true").checked;
  
    var possuiReservatorio = document.getElementById("input_possui_reservatorio_true").checked;
    var capacidadeReservatorio = possuiReservatorio ? parseFloat(document.getElementById("input_capacidade_reservatorio").value) : 0;
    var capacidadeDiasAguaReservatorio = capacidadeReservatorio / (consumoAguaMensal / 30);
    
    var possuiMonitoramentoReservatorio = possuiReservatorio && document.getElementById("input_possui_sistema_monitoramento_reservatorio_true").checked;
    var tipoMonitoramentoReservatorio = possuiMonitoramentoReservatorio ? (document.getElementById("input_tipo_sistema_automatico").checked ? "automático" : "manual"): null;
  
    var faturamentoCiclo = valorBruto / qtdCiclosAnualProducao;
    var perdaCiclo = faturamentoCiclo * 0.5;
    var aumentoProducao = faturamentoCiclo * 2.5;
  
    if (trabalhaSistemasIrrigacao && possuiReservatorio && possuiMonitoramentoReservatorio && tipoMonitoramentoReservatorio === "automático") {
      exibicao.innerHTML = `
        Parabéns! Você já possui um sistema de irrigação, reservatório e monitoramento automático. Isso garante a eficiência na produção, 
        minimizando riscos e otimizando os recursos hídricos. Com nosso sistema de monitoramento, você pode aumentar sua produtividade com 
        análises em tempo real, maximizando seus resultados!`;
    } else if (trabalhaSistemasIrrigacao && possuiReservatorio && tipoMonitoramentoReservatorio === "manual") {
      exibicao.innerHTML = `
        Seu sistema manual garante água por ${capacidadeDiasAguaReservatorio.toFixed(1)} dias, mas a falta de automação pode resultar em 
        perdas de até 50% por ciclo, resultando em um prejuízo de R$${perdaCiclo.toFixed(2)}. Automatize e proteja sua colheita com nossa solução!`;
    } else if (trabalhaSistemasIrrigacao && !possuiReservatorio) {
      exibicao.innerHTML = `
        Sem um reservatório, sua produção está exposta a riscos. Implementar um reservatório inteligente com nosso sistema pode aumentar sua 
        produção em até R$${aumentoProducao.toFixed(2)} por ciclo, garantindo um melhor controle da água.`;
    } else if (trabalhaSistemasIrrigacao && possuiReservatorio && !possuiMonitoramentoReservatorio) {
      exibicao.innerHTML = `
        Seu sistema de irrigação e reservatório funcionam sem monitoramento, o que pode causar desperdícios. Ao implementar nosso sistema de 
        monitoramento, você pode prevenir perdas de até R$${perdaCiclo.toFixed(2)} por ciclo e aumentar a eficiência de sua produção!`;
    } else if (!trabalhaSistemasIrrigacao && possuiReservatorio) {
      exibicao.innerHTML = `
        Embora tenha um reservatório, sem um sistema de irrigação você não aproveita ao máximo seus recursos. Com nosso monitoramento, 
        você pode transitar para um sistema de irrigação eficiente, otimizando o uso da água e melhorando sua produção.`;
    } else {
      exibicao.innerHTML = `
        Sem sistema de irrigação e reservatório, sua produção pode sofrer perdas por estresse hídrico. Ao adotar nossa solução de irrigação e 
        monitoramento, sua produção anual pode aumentar até 250%, passando de ${qtdCiclosAnualProducao} para ${(qtdCiclosAnualProducao * 2.5).toFixed(0)}, 
        elevando seu faturamento bruto anual em até R$${(valorBruto * 2.5).toFixed(2)}.`;
    }
  }
  
