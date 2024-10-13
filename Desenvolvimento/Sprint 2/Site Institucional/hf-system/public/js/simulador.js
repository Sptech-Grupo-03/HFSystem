//FUNÇÕES PARA EXIBIR CADA SEÇÃO DE PERGUNTA PERGUNTAS

const inputs = document.querySelectorAll('input', 'button', 'select', 'textarea')

inputs.forEach((inputs) => {
  inputs.setAttribute('tabindex', '-1');
});

document.addEventListener('keydown', function(event) {
  // Detecta se a tecla pressionada é o TAB (keyCode 9)
  if (event.key === 'Tab') {
    event.preventDefault(); // Impede o comportamento padrão
  }
});

function exibirOcultarPergunta(secao, campoObrigatorio = "") {
  if (campoObrigatorio != "" && document.getElementById(`${campoObrigatorio}`).value == "") {
    document.getElementById(`${campoObrigatorio}`).placeholder =
      "| CAMPO OBRIGATÓRIO!";
    document.getElementById(`${campoObrigatorio}`).classList.add('campo_obrigatorio')
  } else {
    const sectionInformacoes = document.getElementById(`${secao}`);
    if (sectionInformacoes.getBoundingClientRect().left > 0) {
      sectionInformacoes.style.left = 0;
    } else {
      sectionInformacoes.style.left = "100%";
    }
  }
}

function exibirComoHFSystemPodeAjudar() {
  var exibicao = document.getElementById("p_resultado");
  var tipoPlantacao = document.getElementById("input_tipo_plantacao").value;
  var valorBruto = parseFloat(document.getElementById("input_faturamento_anual").value);
  var qtdCiclosAnualProducao = parseInt(document.getElementById("input_qtd_ciclos_anual_producao").value);
  var consumoAguaMensal = document.getElementById("nao_sei_consumo_agua_mensal").checked ? 10000000 : parseFloat(document.getElementById("input_consumo_agua_mensal").value);
  var trabalhaSistemasIrrigacao = document.getElementById("input_trabalha_com_sistema_irrigacao_true").checked;

  var possuiReservatorio = document.getElementById("input_possui_reservatorio_true").checked;
  var capacidadeReservatorio = possuiReservatorio ? parseFloat(document.getElementById("input_capacidade_reservatorio").value): 0;
  var capacidadeDiasAguaReservatorio = capacidadeReservatorio / (consumoAguaMensal / 30);

  var possuiMonitoramentoReservatorio =possuiReservatorio && document.getElementById("input_possui_sistema_monitoramento_reservatorio_true").checked;
  var tipoMonitoramentoReservatorio = possuiMonitoramentoReservatorio ? document.getElementById("input_tipo_sistema_automatico").checked ? "automático": "manual": null;
  var faturamentoCiclo = valorBruto / qtdCiclosAnualProducao;
  var faturamentoCicloFormatado = faturamentoCiclo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  var perdaCiclo = faturamentoCiclo * 0.5;
  var perdaCicloFormatado = perdaCiclo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  var aumentoProducao = faturamentoCiclo * 2.5;
  var aumentoProducaoFormatado = aumentoProducao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (
    trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    possuiMonitoramentoReservatorio &&
    tipoMonitoramentoReservatorio === "automático"
  ) {
    exibicao.innerHTML = `
        Parabéns! Você já possui um sistema de irrigação, reservatório e monitoramento automático. Isso garante a eficiência na produção, 
        minimizando riscos e otimizando os recursos hídricos. Com nosso sistema de monitoramento, você pode aumentar sua produtividade com 
        análises em tempo real, maximizando seus resultados!`;
  } else if (
    trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    tipoMonitoramentoReservatorio === "manual"
  ) {
    exibicao.innerHTML = `
        Seu sistema manual garante água por ${capacidadeDiasAguaReservatorio.toFixed(1)} dias para sua produção de ${tipoPlantacao}, mas a falta de automação pode resultar em 
        perdas de até 50% por ciclo, provenientes da falta de água em algum momento, podendo ocasionar o chamado estresse hídrico em sua plantação, resultando em um prejuízo de ${perdaCicloFormatado}. Automatize e proteja sua colheita com nossa solução!`;
  } else if (trabalhaSistemasIrrigacao &&
     !possuiReservatorio) {
        exibicao.innerHTML = `
        Sem um reservatório, sua produção de ${tipoPlantacao} está exposta a riscos! Implementar um reservatório inteligente com nosso sistema de monitoramento pode aumentar sua produção em até ${aumentoProducaoFormatado} por ciclo, garantindo um melhor controle da água. Além de evitar um perda de ${perdaCicloFormatado} por ciclo que poderia ser ocasionada com o estresse hídrico sofrido em sua plantação.`;
  } else if (
    trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    !possuiMonitoramentoReservatorio
  ) {
    exibicao.innerHTML = `
        Seu sistema de irrigação e reservatório funcionam sem monitoramento, o que pode causar desperdícios em sua plantação de ${tipoPlantacao}. Ao implementar nosso sistema de monitoramento, você pode prevenir perdas de até ${perdaCicloFormatado} por ciclo e aumentar a eficiência de sua produção! Fique ciente que a combinação de um sistema de irrigação e o monitoramento automatizado de seu reservatório pode agregar em cada ciclo de produção ${(faturamentoCiclo * 2.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  } else if (
    !trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    possuiMonitoramentoReservatorio === "manual"
  ) {
    exibicao.innerHTML = `
        Embora tenha um reservatório, sem um sistema de irrigação você não aproveita ao máximo seus recursos e não pode otimizar ao máximo seu cultivo de ${tipoPlantacao}. Com nosso monitoramento, você pode transitar para um sistema de irrigação eficiente, otimizando o uso da água e melhorando sua produção.
        Seu sistema manual garante água por ${capacidadeDiasAguaReservatorio.toFixed(1)} dias, mas a falta de automação pode resultar em perdas de até 50% por ciclo, resultando em um prejuízo de ${perdaCicloFormatado}. Automatize e proteja sua colheita de ${tipoPlantacao} com nossa solução!`;
  } else if (
    !trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    possuiMonitoramentoReservatorio === "automático"
  ) {
    exibicao.innerHTML = `
      Embora tenha um reservatório, sem um sistema de irrigação você não aproveita ao máximo seus recursos. Com nosso monitoramento do reservatório e um sistema de irrigação, você pode otimizar o uso da água, possibilitando um aumento de produção de 200%, chegando a ${(faturamentoCiclo * 2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} por ciclo.`;
  } else if (
    !trabalhaSistemasIrrigacao &&
    possuiReservatorio &&
    !possuiMonitoramentoReservatorio
  ) {
    exibicao.innerHTML = `
        Embora tenha um reservatório, sem um sistema de irrigação você não aproveita ao máximo seus recursos. Além disso, sua produção de ${tipoPlantacao} poderia ser ainda mais otimizada com nosso monitoramento de reservatório, tendo uma melhor gestão de seus recursos hídricos, possibilitando um aumento de produção de 250%, ou ${(faturamentoCiclo * 2.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. A falta de automação pode resultar em perdas de até 50% por cada ciclo, sendo um prejuízo de ${perdaCicloFormatado} .
        `;
  } else {
    exibicao.innerHTML = `
        Sem sistema de irrigação e reservatório, sua produção de ${tipoPlantacao} pode sofrer perdas por estresse hídrico. Ao adotar uma solução de irrigação juntamente ao nosso monitoramento de reservatório, sua produção anual pode aumentar em 250%, passando de ${qtdCiclosAnualProducao} ciclos para ${(
        qtdCiclosAnualProducao * 2.5).toFixed(0)},elevando seu faturamento bruto anual em até R$${(valorBruto * 2.5).toFixed(2)}.`;
  }
}
