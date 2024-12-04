const hamburgerIcon = document.getElementById('hamburger-icon');
const sidebar = document.getElementById('sidebar');
const body = document.body;

hamburgerIcon.addEventListener('click', () => {
    sidebar.classList.toggle('active');  // Ativa ou desativa a sidebar
    body.classList.toggle('sidebar-active');  // Aplica o efeito de desfoque no fundo
    hamburgerIcon.classList.toggle('open');  // Rotaciona o ícone do hamburger
});

