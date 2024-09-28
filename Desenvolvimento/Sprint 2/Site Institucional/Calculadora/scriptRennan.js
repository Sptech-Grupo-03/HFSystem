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
    var exibicao = document.getElementById("p_resultado").value

    //Informe o tipo da plantação
    const tipoPlantacao = document.getElementById("input_tipo_plantacao").value

    //INFORME O VALOR BRUTO ANUAL
    var valorBruto = document.getElementById("input_faturamento_anual").value

    // QUANTIDADE DE CICLOS ANUAL
    const qtdCiclosAnualProducao = document.getElementById("input_qtd_ciclos_anual_producao").value

    // SE SABE CONSUMO DE ÁGUA MENSAL
    if (document.getElementById("nao_sei_consumo_agua_mensal").checked) {
        const consumoAguaMensal = document.getElementById("nao_sei_consumo_agua_mensal").value
    } else {
        // SE NÃO SABE CONSUMO DE ÁGUA MENSAL
        const consumoAguaMensal = document.getElementById("input_consumo_agua_mensal").value
    }

    // SE TRABALHA COM SISTEMAS DE IRRIGAÇÃO
    if (document.getElementById("input_trabalha_com_sistema_irrigacao_true").checked) {
        const trabalhaSistemasIrrigacao = true

    // SE NÃO NÃO POSSUI SISTEMA DE IRRIGAÇÃO
    } else if (document.getElementById("input_trabalha_com_sistema_irrigacao_false").checked) {
        const trabalhaSistemasIrrigacao = false
    }

    // SE POSSUÍ RESERVATÓRIO
    if (document.getElementById("input_possui_reservatorio_true").checked) {
        const possuiReservatorio = true;
        const capacidadeReservatorio = document.getElementById("input_capacidade_reservatorio").value

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
        }

        // SE NÃO POSSUÍ RESERVATÓRIO
    } else if (document.getElementById("input_possui_reservatorio_false").checked) {
        const possuiReservatorio = false
    }

    var  faturamento_ciclo = 0
    var perda_ciclo = 0
    var aumento_producao = 0

    if(trabalhaSistemasIrrigacao == true && possuiReservatorio == true && possuiMonitoramentoReservatorio == 'true' && tipoMonitoramentoReservatorio == 'automático'){
        //// SE APROFUNDAR EM ALGUM CÁLCULO PARA ATENDER ESSE TIPO DE CLIENTE
    }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == true && possuiMonitoramentoReservatorio == 'true' && tipoMonitoramentoReservatorio == 'manual'){
        // Qualidades abaixo de um sistema automático + 50% perda
        // 1.	Precisão: O controle automático permite ajustes precisos dos parâmetros do processo, garantindo a qualidade e eficiência do produto ou uso de recursos.
        // 2.	Rapidez: O controle automático é mais rápido do que o controle manual, permitindo a resposta imediata a mudanças nas condições do processo.
        // 3.	Consistência: O controle automático elimina erros e inconsistências causados pela intervenção humana, garantindo a uniformidade do processo.
        // 4.	Otimização: O controle automático permite a otimização de processos complexos, melhorando a eficiência e reduzindo custos.
        // 5.	Segurança: O controle automático pode ser utilizado em processos perigosos ou de difícil acesso para os operadores, garantindo a segurança no ambiente de trabalho.
        // 6.	Verificação: Um sistema de monitoramento automático permite validar com maior precisão a eficiência de técnicas para auxiliar na redução de custos e permite identificar cenários adversos.

            faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
            perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo

    }else if(trabalhaSistemasIrrigacao == false){
            faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
            perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo
            aumento_producao = faturamento_ciclo * 2.5 // aumento de producao por ciclo
            
    }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == false){
            faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
            perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo
            aumento_producao = faturamento_ciclo * 2.5 // aumento de producao por ciclo

    }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == true && possuiMonitoramentoReservatorio == false){
        ////
    }

}
