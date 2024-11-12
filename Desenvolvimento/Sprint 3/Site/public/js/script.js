function menuSelecionado(menu) {
  // document.getElementById("link_home").classList.remove("menu_selecionado");
  // document
  //   .getElementById("link_sobre_nos")
  //   .classList.remove("menu_selecionado");
  // document.getElementById("link_solucoes").classList.remove("menu_selecionado");
  // document
  //   .getElementById("link_section_contact")
  //   .classList.remove("menu_selecionado");
  // document
  //   .getElementById("link_resgistrar")
  //   .classList.remove("menu_selecionado");

  // document.getElementById(menu).classList.add("menu_selecionado");
}

document.addEventListener("DOMContentLoaded", menuSelecionado("link_home"));
window.onload = function () {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
};

document.querySelectorAll(".scroll_link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Evita o comportamento padrão do link

    const targetId = this.getAttribute("href"); // Obtém o ID da seção de destino
    const targetElement = document.querySelector(targetId); // Seleciona o elemento da seção

    const headerOffset = window.innerHeight * 0.15; // Ajuste para a altura do seu header
    const elementPosition = targetElement.getBoundingClientRect().top; // Posição do elemento em relação ao viewport
    const offsetPosition = elementPosition + window.scrollY - headerOffset; // Calcula a nova posição para scroll

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Scroll suave
    });
  });
});

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");

  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const navbar = document.querySelector(".navbar");
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
    });
  });  
}

function contato() {
  // Configura o link mailto para abrir um e-mail para o cliente nos encaminhar
  window.location.href = "mailto:hfsystem@gmail.com";
}

function suporte() {
  window.open("https://hydroflowsystem.atlassian.net/servicedesk/customer/portal/1");
}