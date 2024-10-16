//FUNÇÕES PARA EXIBIR CADA SEÇÃO DE PERGUNTA PERGUNTAS

const inputs = document.querySelectorAll(
  "input",
  "button",
  "select",
  "textarea"
);

document.addEventListener("keydown", function (event) {
  // Detecta se a tecla pressionada é o TAB (keyCode 9)
  if (event.key === "Tab") {
    event.preventDefault(); // Impede o comportamento padrão
  }
});

function exibirOcultarPergunta(secao, campoObrigatorio = "") {
  if (
    campoObrigatorio != "" &&
    document.getElementById(`${campoObrigatorio}`).value == ""
  ) {
    document.getElementById(`${campoObrigatorio}`).placeholder =
      "| CAMPO OBRIGATÓRIO!";
    document
      .getElementById(`${campoObrigatorio}`)
      .classList.add("campo_obrigatorio");
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
  var exibicao = document.getElementById("div_resultado");
  var tipoPlantacao = document.getElementById("input_tipo_plantacao").value;
  var valorBruto = parseFloat(
    document.getElementById("input_faturamento_anual").value
  );
  var qtdCiclosAnualProducao = parseInt(
    document.getElementById("input_qtd_ciclos_anual_producao").value
  );
  var consumoAguaMensal = document.getElementById("nao_sei_consumo_agua_mensal")
    .checked
    ? 10000000
    : parseFloat(document.getElementById("input_consumo_agua_mensal").value);
  var trabalhaSistemasIrrigacao = document.getElementById(
    "input_trabalha_com_sistema_irrigacao_true"
  ).checked;

  var possuiReservatorio = document.getElementById(
    "input_possui_reservatorio_true"
  ).checked;
  var capacidadeReservatorio = possuiReservatorio
    ? parseFloat(document.getElementById("input_capacidade_reservatorio").value)
    : 0;
  var capacidadeDiasAguaReservatorio =
    capacidadeReservatorio / (consumoAguaMensal / 30);

  var possuiMonitoramentoReservatorio =
    possuiReservatorio &&
    document.getElementById(
      "input_possui_sistema_monitoramento_reservatorio_true"
    ).checked;
  var tipoMonitoramentoReservatorio = possuiMonitoramentoReservatorio
    ? document.getElementById("input_tipo_sistema_automatico").checked
      ? "automático"
      : "manual"
    : null;
  var faturamentoCiclo = valorBruto / qtdCiclosAnualProducao;
  var faturamentoCicloFormatado = faturamentoCiclo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  var perdaCiclo = faturamentoCiclo * 0.65;
  var perdaCicloFormatado = perdaCiclo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  var aumentoProducao = faturamentoCiclo * 2.5;
  var aumentoProducaoFormatado = aumentoProducao.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  var aumentoProducaoAnualFormatado = (valorBruto * 2.5).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  // MENSAGENS
  var mensagemPersonalizada = "";

  if (
    possuiReservatorio &&
    possuiMonitoramentoReservatorio &&
    tipoMonitoramentoReservatorio === "automático"
  ) {
    mensagemPersonalizada = `
    <h4><span>Você já deu um grande passo com seu sistema de irrigação e monitoramento automático do seu reservatório.</span></h4>
    <div id = "div_container_explicacao_2">
          <img src="./assets/simulador/reservatorio_icone.png" alt="">
          <p id= "div_container_explicacao_2_p1"><span>Mas o seu monitoramento atual é confiável?! E se o seu sistema falhar em um momento crítico</span> e causar estresse hídrico em suas plantação de ${tipoPlantacao}? Isso pode arriscar sua colheita e seus lucros.</p>
          <p id= "div_container_explicacao_2_p2">Com base nos seus dados, seu reservatório garante água para a sua produção de <span>${tipoPlantacao}</span> por em média
      <span>${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dia(s)</span> e um errinho no seu sistema atual, onde você não perceba à tempo a falta de àgua, pode custar <span>65% da sua colheita</span> segundo dados do Agrolink e da Embrapa.
      nesse caso, usando <span>1 ciclo</span> seu de produção, que faturou aproximadamente ${faturamentoCicloFormatado}, você teria um <span>prejuízo aproximável de ${perdaCicloFormatado}</span>.</p>
    </div>
        `;
  } else if (possuiReservatorio && tipoMonitoramentoReservatorio === "manual") {
    mensagemPersonalizada = `
    <h4><span>Você já deu um grande passo realizando o monitoramento manual do seu reservatório.</span></h4>
    <div id = "div_container_explicacao_2">
      <img src="./assets/simulador/reservatorio_icone.png" alt="">
      <p id= "div_container_explicacao_2_p1"><span>Mas o seu monitoramento atual é confiável?! E se um dia faltar água em um momento crítico e você perceber tarde demais</span> e isso causar estresse hídrico em suas plantação de ${tipoPlantacao}?!<span>As
        perdas causadas pelo estresse hídrico podem chegar a 65% da sua produção</span>, segundo dados do Agrolink e da Embrapa, o que pode arriscar sua colheita e seus lucros.</p>
      <p id= "div_container_explicacao_2_p2">Com base nos seus dados, seu reservatório garante água para a sua produção de <span>${tipoPlantacao}</span> por em média
      <span>${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dia(s)</span>, e um erro manual onde você não perceba à tempo a falta de àgua, pode custar <span>65% da sua colheita</span> segundo dados do Agrolink e da Embrapa, ou <span> ${perdaCicloFormatado}</span> em perdas financeiras.
      </p>
    </div>
    `;
  } else if (possuiReservatorio && !possuiMonitoramentoReservatorio) {
    mensagemPersonalizada = `
    <div id = "div_container_explicacao_1">
      <p>Sem um monitoramento automatizado do seu reservatório, <span>você não tem controle preciso sobre a quantidade de água disponível</span>.</p>
      <p>Com isso <span>você coloca sua produção de ${tipoPlantacao} em
          um estado vulnerável à escassez de água</span>, o que coloca toda sua colheita em risco.</p>
    </div>
    
    <h4>Então, imagine enfrentar uma situação como essa durante um período crítico no desenvolvimento da sua plantação ${tipoPlantacao}.</h4>
      
    <div id = "div_container_explicacao_2">
      <p id= "div_container_explicacao_2_p1" >Com base no seu consumo atual, seu reservatório garante água para a sua produção de <span>${tipoPlantacao}</span> por em média
      <span>${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dia(s)</span>. Contudo, a falta de controle do seu recurso hídrico abre brecha para que, em um momento crítico, <span>você não esteja preparado e enfrente o estresse 
      hídrico em sua produção de ${tipoPlantacao},</span> o que pode causar <span>perdas de até 65% por ciclo</span>, segundo dados da Embrapa e do Agrolink.
      </p>

      <p id = "div_container_explicacao_2_p2">Com o seu reservatório <span>e o nosso sistema monitorando constantemente</span>, você não estará mais sujeito a esse problema, garantindo a disponibilidade de água, inclusive em momentos críticos do desenvolvimento
          de sua plantação.</p>
      <img src="./assets/simulador/reservatorio_icone.png" alt="">
    </div>
    `;
  } else if (!possuiReservatorio) {
    mensagemPersonalizada = `
    <div id = "div_container_explicacao_1">
      <p><span>Sem um reservatório</span>, dependendo apenas de nascentes ou chuvas, <span>você coloca sua produção de ${tipoPlantacao} em
          um estado vulnerável à escassez de água</span>, o que coloca toda sua colheita em risco.</p>
      <p>Rios que nunca secavam estão secando, como é o caso do Rio Solimões, quem em setembro de 2024 teve a seca
          mais severa da região, onde o nível do rio chegou a 2,9 metros.</p>

    </div>
    <h4>Então, imagine enfrentar uma seca dessa durante um período crítico.</h4>

    <div id = "div_container_explicacao_2">
      <p id= "div_container_explicacao_2_p1" ><span>Sem um sistema de reserva de água</span>, você deixa sua plantação vulnerável ao
          estresse hídrico, o que pode levar a <span> perdas de até 65% da sua produção</span>, segundo dados da Embrapa e
          do Agrolink. Nesse caso,<span> o seu faturamento em 1 ciclo que foi de ${faturamentoCicloFormatado},
          teria uma redução de aproximadamente ${perdaCicloFormatado}.
      </p>

      <p id = "div_container_explicacao_2_p2">Com um reservatório <span>e o nosso sistema monitorando constantemente</span>, você não estará sujeito as sazonalidades de chuvas ou
          rios, garantindo a disponibilidade de água, inclusive em momentos críticos do desenvolvimento
          de sua plantação, conseguindo assim produzir o ano todo.</p>
      <img src="./assets/simulador/reservatorio_icone.png" alt="">
    </div>    `;
  }

  exibicao.innerHTML = `
  <h4>Com a <span>HF System</span> monitorando o seu reservatório, você terá:</h4>
  <div id = "div_card_container_beneficios">
    <div class = "div_cards"> 
      <h4>Aumento na sua produção em até 250%</h4>
      <p>Isso significa poder passar de
        <span>${qtdCiclosAnualProducao}</span> ciclos de produção de <span>${tipoPlantacao}</span> para até <span>${(
        qtdCiclosAnualProducao * 2.5
        ).toFixed(0)}</span> ciclos anuais.
      </p>
    </div>
    <div class = "div_cards"> 
        <h4>Maximização do seu faturamento em até 250%</h4>
        <p>Seu faturamento bruto anual pode
        atingir até <span>${aumentoProducaoAnualFormatado}</span>.
        </p>
    </div>
    <div class = "div_cards">
        <h4>Redução de perdas em até 65%</h4>
        <p><span>Previna perdas de até 65%</span> devido ao estresse hídrico, garantindo
        a disponibilidade de água à todo momento.
        </p>
    </div>
    <div class = "div_cards">
        <h4>Economia dos seus recursos hídricos</h4>
        <p>Você será capaz de adotar as práticas necessárias para <span>otimizar o uso da água e reduzir desperdícios</span>.
        </p>
    </div>
  </div>

  <h4><span>Nosso monitoramento</span> constante oferece também:</h4>
    
  <div id = "div_card_container_funcionalidades">
      <div class = "div_cards"> 
          <h4>Análise preditiva</h4>
          <p>Saiba exatamente quantos dias de água restam e planeje sua
          irrigação com precisão.
          </p>
      </div>
      <div class = "div_cards"> 
          <h4>Monitoramento em tempo real</h4>
          <p>Receba alertas sobre o nível do reservatório conforme
          necessário.
          </p>
      </div>
      <div class = "div_cards">
          <h4>Dashboard intuitivo</h4>
          <p>Todas as informações em um só lugar para uma gestão eficiente
          dos seus recursos.
          </p>
      </div>
  </div>

  <h4>Mas como a <span>HF System</span> vai de fato te ajudar?</h4>
    
  ${mensagemPersonalizada}
  <h4>Não deixe seu sucesso ao acaso, transforme sua colheita e<span> se cadastre agora mesmo</span> para ver seus lucros crescerem!</h4>

  <button class="btns">CADASTRE-SE</button>

  <div id = "div_referencias">
    <p>Para saber mais sobre os riscos do estresse hídrico e os benefícios de um sistema de irrigação bem
      monitorado entre em contato conosco ou acesse os links abaixo:</p>
    <ul>
        <li><a href="https://www.agrolink.com.br/noticias/tecnologia-ajuda-a-mitigar-estresse-hidrico_495547.html"
                target="_blank">Estresse hídrico durante os períodos críticos de desenvolvimento das plantas
                pode reduzir a produtividade em até 65%.</a></li>
        <li><a href="https://ainfo.cnptia.embrapa.br/digital/bitstream/item/33089/1/Caracterizacao-estresse.pdf"
                target="_blank">Caracterização de Estresse Hídrico de Duas Linhagens de Milho</a></li>
        <li><a href="https://www.embrapa.br/busca-de-publicacoes/-/publicacao/748148/estresse-por-deficit-hidrico-em-plantas-forrageiras"
                target="_blank">Estresse por déficit hídrico em plantas forrageiras.</a></li>
        <li><a href="https://ainfo.cnptia.embrapa.br/digital/bitstream/item/219098/1/SOLANGE-RESUMO-Efeito-do-Estresse-Hidrico.pdf"
                target="_blank">Efeito do Estresse Hídrico em Cultivo de Soja</a></li>
        <li><a href="https://portal1.snirh.gov.br/ana/apps/storymaps/stories/a874e62f27544c6a986da1702a911c6b"
                target="_blank">Atlas Irrigação: uso da água na agricultura irrigada</a></li>
        <li><a href="https://www.redeagro.agr.br/medidas-e-acoes-para-otimizar-o-consumo-de-agua-no-campo/"
                target="_blank">Medidas e ações para otimizar o consumo de água no campo</a></li>
        <li><a href="https://g1.globo.com/am/amazonas/noticia/2024/09/30/seca-baixo-solimoes-atinge-290-metros-e-registra-nivel-mais-baixo-da-historia-em-manacapuru.ghtml"
                target="_blank">Seca: Baixo Solimões atinge 2,90 metros e registra nível mais baixo da história em Manacapuru</a></li>
                
    </ul>
  </div>
            
`;
}

// SE TRABALHA COM SISTEMA DE IRRIGAÇÃO
// if (trabalhaSistemasIrrigacao) {
//   // SE NÃO TRABALHA COM SISTEMA DE IRRIGAÇÃO
// } else {
//   if (possuiReservatorio && tipoMonitoramentoReservatorio === "automático") {
//     mensagemPersonalizada = `
//     <p>Parabéns! Você já deu um grande passo realizando o monitoramento automático do seu reservatório.</p>
//     <p><span>Mas o seu monitoramento atual é confiável?! E se o seu sistema falhar em um dia crítico</span> e causar estresse hídrico em suas plantação de ${tipoPlantacao}?<span>As
//             perdas causadas pelo estresse hídrico podem chegar a 65% da sua produção</span>, segundo dados do Agrolink e da Embrapa, o que pode arriscar sua colheita e seus lucros.</p>
//     <p>Você, que teve um faturamento por ciclo de aproximadamente ${faturamentoCicloFormatado}, teria uma <span>perda de aproximável de ${perdaCicloFormatado}</span>.</p>
//     `;
//   } else if (
//     possuiReservatorio &&
//     tipoMonitoramentoReservatorio === "manual"
//   ) {
//     mensagemPersonalizada = `
//     <p>Parabéns! Você já deu um grande passo realizando o monitoramento manual do seu reservatório, mas <span>e se um dia faltar água em um dia crítico e você perceber tarde de mais?</p>
//     <p>Com base nos seus dados, seu reservatório garante água para a sua produção de <span>${tipoPlantacao}</span> por em média
//     <span>${capacidadeDiasAguaReservatorio.toFixed(
//       1
//     )} dia(s)</span>, e um erro manual onde você não perce à tempo a falta de àgua, pode custar <span>65% da sua colheita</span> segundo dados do Agrolink e da Embrapa, ou <span> ${perdaCicloFormatado}</span> em perdas financeiras.
//     </p>
//   `;
//   } else if (possuiReservatorio && !possuiMonitoramentoReservatorio) {
//     mensagemPersonalizada = `<p>
//     Você possui um reservatório, mas sem um sistema de irrigação e monitoramento automatizado, sua produção de ${tipoPlantacao} está exposta a riscos.
//     Imagine a situação em que, em um momento crítico, o seu reservatório, que hoje tem apenas ${capacidadeDiasAguaReservatorio.toFixed(
//       1
//     )} dias de autonomia de água, não será suficiente para suprir a demanda da semana. Isso pode levar a perdas significativas e comprometer sua colheita.

//     Na HF System, oferecemos uma solução integrada que transforma a gestão hídrica em um processo eficiente. Aqui estão alguns benefícios que você pode ter:</p>

//     <ul>
//         <li><span>Análise preditiva:</span> Conheça em tempo real quantos dias de água você tem e planeje a irrigação adequadamente.</li>
//         <li><span>Monitoramento automatizado:</span> Evite surpresas desagradáveis e garanta que sua produção esteja sempre protegida.</li>
//         <li><span>Aumento de produção:</span> A combinação de monitoramento e irrigação pode aumentar sua produção em até 250%, conforme destacado pelo Sebrae.</li>
//         <li><span>Gestão inteligente da água:</span> Evite desperdícios e utilize seus recursos de forma mais eficiente.</li>
//         <li><span>Cultivo sustentável:</span> Melhore sua rentabilidade e garanta um uso responsável da água.</li>
//         <li><span>Dashboard intuitivo:</span> Tenha todas as informações em um só lugar para uma gestão eficiente dos seus recursos hídricos.</li>
//     </ul>
//       `;
//   } else {
//     mensagemPersonalizada = `
//     Sem um sistema de irrigação e reservatório, sua produção de ${tipoPlantacao} está exposta a perdas significativas por estresse hídrico.
//     Ao adotar nossa solução de irrigação e monitoramento de reservatório, você não apenas terá um controle preciso da água disponível, mas também poderá:

//     <ul>
//         <li><span>Aumentar sua produção em até 250%:</span> Isso significa passar de ${qtdCiclosAnualProducao} ciclos de produção para ${(
//       qtdCiclosAnualProducao * 2.5
//     ).toFixed(0)} ciclos anuais.</li>
//         <li><span>Maximizar seu faturamento:</span> Seu faturamento bruto anual pode atingir até R$${(
//           valorBruto * 2.5
//         ).toFixed(2)}.</li>
//         <li><span>Evitar estresse hídrico:</span> Mantenha sua colheita saudável e garanta produção estável.</li>
//         <li><span>Gerir recursos de forma eficiente:</span> Use a água com inteligência, evitando desperdícios.</li>
//         <li><span>Dashboard intuitivo:</span> Tenha acesso a todas as informações necessárias em um só lugar.</li>
//     </ul>`;
//   }
// }

const button = document.querySelector("#btn_index");
const imageX = document.querySelector("#img_1_estresse_hidrico");

button.addEventListener("mouseover", () => {
  imageX.style.animation = "slideOut 1s linear forwards"; // Executa a animação ao passar o mouse
});

button.addEventListener("mouseover", () => {
  imageY.style.transform = "translateX(0)"; // Move a imagem Y para dentro da tela
});

button.addEventListener("mouseout", () => {
  imageX.style.animation = "";
  imageY.style.transform = "translateX(-100%)"; // Move a imagem Y para fora da tela à esquerda
});
