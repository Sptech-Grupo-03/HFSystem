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
  // CRIAÇÃO DE VARIÁVEIS E ATRIBUIÇÃO DE VALORES TIPO DE PLANTAÇÃO
  const tipoPlantacao = document
      .getElementById("input_tipo_plantacao")
      .value

  // QUANTIDADE DE CICLOS ANUAL
  const qtdCiclosAnualProducao = document
      .getElementById(
          "input_qtd_ciclos_anual_producao"
      )
      .value

  // SE SABE CONSUMO DE ÁGUA MENSAL

  if (document.getElementById("nao_sei_consumo_agua_mensal").checked) {
      const consumoAguaMensal = document
          .getElementById(
              "nao_sei_consumo_agua_mensal"
          )
          .value
  } else {
      // SE NÃO SABE CONSUMO DE ÁGUA MENSAL
      const consumoAguaMensal = document
          .getElementById("input_consumo_agua_mensal")
          .value
  }

  // SE TRABALHA COM SISTEMAS DE IRRIGAÇÃO
  if (document.getElementById("input_trabalha_com_sistema_irrigacao_true").checked) {
      const trabalhaSistemas = true

      // SE NÃO NÃO POSSUI SISTEMA DE IRRIGAÇÃO
  } else if (document.getElementById("input_trabalha_com_sistema_irrigacao_false").checked) {
      const trabalhaSistemas = false
  }

  // SE POSSUÍ RESERVATÓRIO
  if (document.getElementById("input_possui_reservatorio_true").checked) {
      const possuiReservatorio = true;
      const capacidadeReservatorio = document
          .getElementById(
              "input_capacidade_reservatorio"
          )
          .value

      // SE POSSUÍ SISTEMA DE MONITORAMENTO DE RESERVATÓRIO
      if (document.getElementById("input_possui_sistema_monitoramento_reservatorio_true").checked) {
          const possuiMonitoramentoReservatorio = true

          // SE TIPO DO SISTEMA DE MONITORAMENTO DO RESERVATÓRIO FOR MANUAL
          if (document.getElementById("input_tipo_sistema_manual").checked) {
              const tipoMonitoramentoReservatorio = "manual"

              // SE TIPO DO SISTEMA DE MONITORAMENTO DO RESERVATÓRIO FOR AUTOMÁTICO
          } else if (document.getElementById("input_tipo_sistema_automatico").checked) {
              const tipoMonitoramentoReservatorio = "automático"
          }

          // SE NÃO POSSUÍ SISTEMA DE MONITORAMENTO DE RESERVATÓRIO
      } else if (document.getElementById("input_possui_sistema_monitoramento_reservatorio_false").checked) {
          const possuiMonitoramentoReservatorio = false
          // fim do código
      }

      // SE NÃO POSSUÍ RESERVATÓRIO
  } else if (document.getElementById("input_possui_reservatorio_false").checked) {
      const possuiReservatorio = false

      //fim do código
  }

}
