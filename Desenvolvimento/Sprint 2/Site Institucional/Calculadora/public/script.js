//FUNÇÕES PARA EXIBIR CADA SEÇÃO DE PERGUNTA PERGUNTAS

function exibirOcultarPergunta(secao){
    const sectionInformacoes = document.getElementById(`${secao}`);
    if(sectionInformacoes.getBoundingClientRect().left > 0){
        sectionInformacoes.style.left = 0;
    }else{
        sectionInformacoes.style.left = '100%';
    }  
}


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
  
