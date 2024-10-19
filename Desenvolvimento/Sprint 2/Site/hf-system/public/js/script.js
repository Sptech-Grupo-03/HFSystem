function menuSelecionado(menu){
    
    document.getElementById('link_home').classList.remove('menu_selecionado')
    document.getElementById('link_sobre_nos').classList.remove('menu_selecionado')
    document.getElementById('link_solucoes').classList.remove('menu_selecionado')
    document.getElementById('link_section_contact').classList.remove('menu_selecionado')
    document.getElementById('link_resgistrar').classList.remove('menu_selecionado')


    document.getElementById(menu).classList.add('menu_selecionado')

}

document.addEventListener("DOMContentLoaded", menuSelecionado('link_home'))
window.onload = function() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
      }
    
    window.scrollTo(0, 0);
  };

