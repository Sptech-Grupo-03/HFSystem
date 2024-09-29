let currentSlide = 0;
const slides = document.querySelectorAll('.item');
const totalSlides = slides.length;
const carousel = document.querySelector('.carousel');

document.getElementById('next').addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= totalSlides) {
    currentSlide = 0; // Volta para o início
  }
  const offset = -currentSlide * 300; // Move 300px para o lado
  carousel.style.transform = `translateX(${offset}px)`;
});

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
  // CRIAÇÃO DE VARIÁVEIS E ATRIBUIÇÃO DE VALORES

  var exibicao = document.getElementById("p_resultado").value

  //TIPO DE PLANTAÇÃO
  const tipoPlantacao = document.getElementById("input_tipo_plantacao").value

  //VALOR BRUTO ANUAL
  const valorBruto = document.getElementById("input_faturamento_anual").value

  // QUANTIDADE DE CICLOS ANUAL
  const qtdCiclosAnualProducao = document.getElementById("input_qtd_ciclos_anual_producao").value

  // SE NÃO SABE CONSUMO DE ÁGUA MENSAL
  if (document.getElementById("nao_sei_consumo_agua_mensal").checked) {
      const consumoAguaMensal = document.getElementById("nao_sei_consumo_agua_mensal").value
  } else {
      // SE SABE CONSUMO DE ÁGUA MENSAL
      const consumoAguaMensal = document.getElementById("input_consumo_agua_mensal").value // ESTIPULAR UM VALOR PARA CÁLCULO
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

      
      // calculo de quando o reservatório deve ser reabastecido 
      const capacidadeDiasAguaReservatorio = capacidadeReservatorio/(consumoAguaMensal/30)

      const capacidadeDiasAguaReservatorioSaldo1Dia = duracaoDiasAguaReservatorio- 1


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
      exibicao = `Parabéns! Você já possui um sistema de irrigação, um reservatório e monitoramento automático. Isso é fundamental para garantir a eficiência na sua produção. Com essa configuração, você minimiza riscos e maximiza a utilização dos recursos hídricos. No entanto, com o nosso sistema de monitoramento, você pode levar sua gestão a um novo patamar. Nossa tecnologia proporciona análises em tempo real, otimizando o uso da água e aumentando a produtividade ainda mais. Proteja seu investimento e maximize seus resultados!`

  }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == true && possuiMonitoramentoReservatorio == 'true' && tipoMonitoramentoReservatorio == 'manual'){

          faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
          perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo

          exibicao = `Seu sistema de irrigação com monitoramento manual consegue garantir água por ${capacidadeDiasAguaReservatorio.toFixed(1)} dias, mas a falta de automação pode resultar em perdas de até <span>50%</span> por ciclo, pois monitoramento manuais são imprecisos, e caso ocorra algum erro na checagem do nível do reservatório, você poderá expor sua plantação ao chamado <span>ESTRESSE HÍDRICO</span>, com um possível prejuízo de R$${perda_ciclo.toFixed(2)} por ciclo. Imagine como seria mais seguro e eficiente ter um sistema de monitoramento automático que elimina essas falhas. Nossa solução não apenas proporciona maior precisão, mas também análises em tempo real que permitem que você realize ajustes imediatos, garantindo que suas plantas recebam a água necessária na hora certa. Invista em tecnologia e proteja seu cultivo!. Considerar a automatização pode otimizar o uso de água e melhorar o controle da produção.
          `;


  }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == false){
          faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
          perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo
          aumento_producao = faturamento_ciclo * 2.5 // aumento de producao por ciclo


          exibicao = `Seu sistema de irrigação depende de fontes externas, mas a falta de um reservatório pode expor sua produção a riscos, especialmente em períodos de seca, não ter um reservatório impede que você armazene água para períodos críticos, comprometendo sua colheita. Nossa solução oferece não apenas um sistema de monitoramento avançado, mas também a possibilidade de integrar reservatórios inteligentes que garantem a disponibilidade de água quando mais precisa. Não deixe sua produção à mercê da variabilidade climática! Implementar um reservatório com o nosso sistema de monitoramento pode aumentar sua produção em até R$${aumento_producao.toFixed(2)} por ciclo, garantindo um melhor controle sobre a água disponível.`;
           
  }else if(trabalhaSistemasIrrigacao == true && possuiReservatorio == true && possuiMonitoramentoReservatorio == false){
          
          faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
          perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo
          aumento_producao = faturamento_ciclo * 2.5 // aumento de producao por ciclo

          exibicao = `Seu sistema de irrigação e reservatório, que pode sustentar a plantação por aproximadamente ${capacidadeDiasAguaReservatorio.toFixed(1)} dias, está funcionando sem monitoramento. Sem um sistema de controle do reservatório, é difícil garantir o uso eficiente da água, o que pode resultar em desperdício ou falta de água em momentos críticos. Ao integrar nosso sistema de monitoramento, você terá acesso a dados cruciais que permitirão um gerenciamento mais eficiente de sua água no reservatório, que pode prevenir problemas, como o <span>ESTRESSE HÍDRICO</span>, aumentar a eficiência de produção e reduzir perdas de até R$${perda_ciclo.toFixed(2)} por ciclo. Faça essa transição e veja sua rentabilidade crescer!`


  }else if(trabalhaSistemasIrrigacao == false && possuiReservatorio == true){
          faturamento_ciclo = valorBruto / qtdCiclosAnualProducao 
          perda_ciclo = faturamento_ciclo * .5 // prejuízo que pode atingir a cada ciclo
          aumento_producao = faturamento_ciclo * 2.5 // aumento de producao por ciclo

          exibicao = "Você possui um reservatório, mas não tem um sistema de irrigação. Isso significa que, embora tenha a capacidade de armazenar água, não está aproveitando ao máximo esse recurso. Sem um sistema de irrigação, suas plantas não estão recebendo a hidratação necessária de forma eficiente, o que pode comprometer sua produção. Com nosso monitoramento de reservatório seria o primeiro passo para você fazer esta transição e adquirir um sistema de irrigação inteligente, que permitirá a utilização do reservatório de maneira eficaz, garantindo que suas plantas recebam a água necessária na quantidade certa e no momento certo, evitando desperdícios de seus recursos hídricos. Não perca essa oportunidade de otimizar sua colheita!"


  }else if(trabalhaSistemasIrrigacao == false && possuiReservatorio == false){
          exibicao = `Você não possui um sistema de irrigação nem um reservatório, o que pode levar a uma redução drástica na sua produção e a perdas por estresse hídrico. A boa notícia é que há soluções disponíveis para transformar sua gestão hídrica. Implementar um sistema de irrigação eficiente e um reservatório pode ser o primeiro passo para garantir que suas plantas recebam a água necessária. Além disso, ao integrar nosso sistema de monitoramento, você poderá maximizar a eficiência do uso da água e aumentar sua produtividade de forma significativa. Onde sua produção anual poderia ter um aumento de até 250%, passando de${qtdCiclosAnualProducao} para ${qtdCiclosAnualProducao * 2.5}, aumentando o seu faturamento bruto anual em até R$${valorBruto * 2.5.toFixed(2)}`
  }

}