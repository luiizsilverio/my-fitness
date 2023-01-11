import { Telas } from "./enums/telas.js";

const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');

let telaAtual = Telas.INICIO;

function MudaTela(e) {
  e.preventDefault();
  let tela = e.target.dataset['tela'];
  telaAtual = tela;

  opcMenu.forEach(opcao => {
    if (opcao.getAttribute('data-tela') !== tela) {
      opcao.classList.remove('tela-atual');
    } else {
      opcao.classList.add('tela-atual');
    }
  })

  // e.target.classList.add('tela-atual');
  menuMobile.classList.remove('show-menu');
}

// Event Listeners

btnMenu.addEventListener('click', (e) => {
  e.preventDefault();
  menuMobile.classList.toggle('show-menu');
})

opcMenu.forEach(opcao => {
  opcao.addEventListener('click', (e) => MudaTela(e));
})
