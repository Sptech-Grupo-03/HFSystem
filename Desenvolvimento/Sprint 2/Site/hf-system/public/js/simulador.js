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

  // MENSAGENS
  var mensagem = "";

  if (trabalhaSistemasIrrigacao) {
    if (
      possuiReservatorio &&
      possuiMonitoramentoReservatorio &&
      tipoMonitoramentoReservatorio === "automático"
    ) {
      mensagem = `
      <p>Parabéns! Você já deu um grande passo com seu sistema de irrigação e monitoramento automático do seu reservatório.</p>
      <p><span>Mas o seu monitoramento atual é confiável?! E se o seu sistema falhar em um dia crítico</span> e causar estresse hídrico em suas plantação de ${tipoPlantacao}?<span>As
              perdas podem chegar a 65% da sua produção</span>, segundo dados do Agrolink, o que pode arriscar sua colheita e seus lucros.</p>
      <p>Você, que teve um faturamento por ciclo de aproximadamente ${faturamentoCicloFormatado}, teria uma <span>perda de aproximável de ${perdaCicloFormatado}</span>.</p>
      `;
    } else if (
      possuiReservatorio &&
      tipoMonitoramentoReservatorio === "manual"
    ) {
      mensagemL = `
      <p>Parabéns! Você já deu um grande passo com seu sistema de irrigação e monitoramento manual do seu reservatório.</p>
      <p>Com base nos seus dados, seu reservatório garante água por aproximadamente ${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dias para sua produção de ${tipoPlantacao}, mas a <span>falta de automação coloca seus lucros em risco.</span></p>
      <p><span>Sem controle preciso</span> do seu reservatório, a sua plantação de ${tipoPlantacao} pode estar sujeito o estresse hídrico, que segundo dados da Embrapa e do Agrolink,  pode reduzir sua produção em até <span>65%</span>, gerando um prejuízo de ${perdaCicloFormatado} por ciclo.</p>
      `;
    } else if (!possuiReservatorio) {
      mensagem = `
      <h4>Alerta!</h4>
      <p>Sem um reservatório, dependendo apenas de nascentes ou chuvas, coloca sua produção de ${tipoPlantacao} em um estado vulnerável à escassez de água, o que coloca toda sua colheita em risco.</p>
      <p>Rios que nunca secavam estão secando, como é o caso do Rio Solimões, quem em outubro de 2023 teve a seca mais severa da região, onde o nível do rio chegou a 3,11 metros.</p>
      <p>Imagine enfrentar uma seca dessa durante um período crítico. Sem um sistema de reserva de água, o estresse hídrico pode levar a perdas de até <span>65% da sua produção</span>, segundo dados da Embrapa e do Agrolink. Nesse caso, o seu faturamento em 1 ciclo que foi de ${faturamentoCicloFormatado}, <span>teria uma redução de aproximadamente ${perdaCicloFormatado}.</p>
      <p>Com a <span>HF System</span>, você pode implementar um reservatório inteligente com o nosso sistema de monitoramento automatizado, garantindo o controle total da água disponível e permitindo uma irrigação precisa nos momentos mais críticos.</p>
      `;
    } else if (possuiReservatorio && !possuiMonitoramentoReservatorio) {
      mensagem = `
      <p>Seu sistema de irrigação e reservatório estão funcionando, mas <span>sem um monitoramento automatizado, você não tem controle preciso sobre a quantidade de água disponível</span>.</p>
      <p>Isso significa que, em um momento crítico, <span>você pode enfrentar o estresse hídrico em sua produção de ${tipoPlantacao} a qualquer momento,</span> o que pode causar <span>perdas de até 65% por ciclo</span>, segundo dados da Embrapa e do Agrolink. Nesse caso, o seu faturamento em 1 ciclo que foi de ${faturamentoCicloFormatado}, <span>teria uma redução de aproximadamente ${perdaCicloFormatado}.</p>
        `;
    }
    mensagem += `
    <p>Com a solução da <span>HF System</span>, você saberá exatamente quantos dias de água restam, permitindo ajustes precisos no uso da água e evitando estresse hídrico.</p>
    <ul>
      <li>Monitoramento automatizado para garantir a disponibilidade de água nos momentos críticos;</li>
      <li>Análise preditiva para planejar a irrigação de forma eficiente;</li>
      <li>Acesso a um <span>dashboard</span> completo com todas as informações essenciais.</li>
    </ul>
    `;
  } else if (!trabalhaSistemasIrrigacao) {
    if (possuiReservatorio && tipoMonitoramentoReservatorio === "manual") {
      mensagem = `
      <p>Você já conta com um reservatório e monitoramento manual, mas <strong>e se um dia faltar água?</strong> Sua produção de <strong>{tipoPlantacao}</strong> está garantida apenas por 
      <strong>${capacidadeDiasAguaReservatorio.toFixed(1)} dias</strong>, e um erro manual pode custar <strong>65% da sua colheita</strong> segundo dados do Agrolink, ou <strong>{perdaCicloFormatado}</strong> em perdas financeiras.
      </p>
      <p>Com a solução da <span>HF System</span>, você poderá monitorar e prever a disponibilidade de água e integrá-la a um sistema de irrigação eficiente, garantindo o que há de melhor para sua colheita.</p>
      <ul>
        <li>Monitoramento automático para evitar surpresas com a falta de água;</li>
        <li>Prevenção de estresse hídrico e maximização da produção;</li>
        <li>Acesso a um <span>dashboard</span> completo com informações precisas sobre sua gestão hídrica.</li>
      </ul>
    `;
    } else if (
      possuiReservatorio &&
      tipoMonitoramentoReservatorio === "automático"
    ) {
      mensagem = `
      <p>Você pode ter um reservatório e monitoramento automático, mas a ausência de um sistema de irrigação coloca sua produção em risco. 
        Imagine estar em plena safra e descobrir que, devido à falta de irrigação, sua plantação de ${tipoPlantacao} está prestes a enfrentar estresse hídrico, enquanto o seu reservatório, quer atualmente tem apenas ${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dias de autonomia restante. 
        Essa situação pode resultar em perdas de até 65%, o que significa um impacto significativo nos seus lucros.
  
        Na HF System, oferecemos uma solução integrada que garante que você tenha controle total sobre seus recursos hídricos. Aqui estão alguns benefícios da nossa tecnologia:
  
  </p>  
      <ul>
            <li><strong>Análise preditiva:</strong> Saiba exatamente quantos dias de água restam e planeje sua irrigação com precisão.</li>
            <li><strong>Monitoramento em tempo real:</strong> Receba alertas sobre o nível do reservatório e ajuste a irrigação conforme necessário.</li>
            <li><strong>Maximização da produtividade:</strong> Aumente sua produção em até 2,5 vezes, conforme aponta o Sebrae, ao não depender exclusivamente da chuva e garantir água continuamente.</li>
            <li><strong>Redução de perdas:</strong> Previna perdas de até 65% devido ao estresse hídrico.</li>
            <li><strong>Economia de recursos:</strong> Otimize o uso da água e reduza desperdícios.</li>
            <li><strong>Dashboard intuitivo:</strong> Todas as informações em um só lugar para uma gestão eficiente dos seus recursos.</li>
        </ul>`;
    } else if (possuiReservatorio && !possuiMonitoramentoReservatorio) {
      mensagem = `<p>
      Você possui um reservatório, mas sem um sistema de irrigação e monitoramento automatizado, sua produção de ${tipoPlantacao} está exposta a riscos. 
      Imagine a situação em que, em um momento crítico, o seu reservatório, que hoje tem apenas ${capacidadeDiasAguaReservatorio.toFixed(
        1
      )} dias de autonomia de água, não será suficiente para suprir a demanda da semana. Isso pode levar a perdas significativas e comprometer sua colheita.
  
      Na HF System, oferecemos uma solução integrada que transforma a gestão hídrica em um processo eficiente. Aqui estão alguns benefícios que você pode ter:</p>
  
      <ul>
          <li><strong>Análise preditiva:</strong> Conheça em tempo real quantos dias de água você tem e planeje a irrigação adequadamente.</li>
          <li><strong>Monitoramento automatizado:</strong> Evite surpresas desagradáveis e garanta que sua produção esteja sempre protegida.</li>
          <li><strong>Aumento de produção:</strong> A combinação de monitoramento e irrigação pode aumentar sua produção em até 250%, conforme destacado pelo Sebrae.</li>
          <li><strong>Gestão inteligente da água:</strong> Evite desperdícios e utilize seus recursos de forma mais eficiente.</li>
          <li><strong>Cultivo sustentável:</strong> Melhore sua rentabilidade e garanta um uso responsável da água.</li>
          <li><strong>Dashboard intuitivo:</strong> Tenha todas as informações em um só lugar para uma gestão eficiente dos seus recursos hídricos.</li>
      </ul>
        `;
    } else {
      mensagem = `
      Sem um sistema de irrigação e reservatório, sua produção de ${tipoPlantacao} está exposta a perdas significativas por estresse hídrico. 
      Ao adotar nossa solução de irrigação e monitoramento de reservatório, você não apenas terá um controle preciso da água disponível, mas também poderá:
  
      <ul>
          <li><strong>Aumentar sua produção em até 250%:</strong> Isso significa passar de ${qtdCiclosAnualProducao} ciclos de produção para ${(
        qtdCiclosAnualProducao * 2.5
      ).toFixed(0)} ciclos anuais.</li>
          <li><strong>Maximizar seu faturamento:</strong> Seu faturamento bruto anual pode atingir até R$${(
            valorBruto * 2.5
          ).toFixed(2)}.</li>
          <li><strong>Evitar estresse hídrico:</strong> Mantenha sua colheita saudável e garanta produção estável.</li>
          <li><strong>Gerir recursos de forma eficiente:</strong> Use a água com inteligência, evitando desperdícios.</li>
          <li><strong>Dashboard intuitivo:</strong> Tenha acesso a todas as informações necessárias em um só lugar.</li>
      </ul>`;
    }
  }

  mensagem += `
  
  <p>Imagine transformar sua colheita e ver seus lucros crescerem!</p>
  <p><span>Não deixe seu sucesso ao acaso e cadastre-se agora mesmo!</span></p>
  <p>Para saber mais sobre os riscos do estresse hídrico: <a
          href="https://www.agrolink.com.br/noticias/tecnologia-ajuda-a-mitigar-estresse-hidrico_495547.html"
          target="_blank">leia o artigo completo</a> ou entre em contato conosco e dê o próximo passo rumo ao sucesso!</p>`;

  exibicao.innerHTML = mensagem;
}

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
