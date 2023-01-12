import { Telas } from "./enums/telas.js";

const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const btnLogin = document.querySelector('.user a');
const mainSections = document.querySelectorAll('main section');

let telaAtual = Telas.INICIO;

function MudaTela(e) {
  let tela = e.target.dataset['tela'];
  if (!tela) return;

  e.preventDefault();

  telaAtual = tela;

  // Mostra a opção do menu selecionada com cor laranja
  opcMenu.forEach(opcao => {
    if (opcao.getAttribute('data-tela') !== tela) {
      opcao.classList.remove('tela-atual');
    } else {
      opcao.classList.add('tela-atual');
    }
  })

  // e.target.classList.add('tela-atual');

  // Esconde todas as main sections
  // for (const [index, section] of mainSections.entries()) {
  for (const section of mainSections) {
    section.classList.add('hidden');
  }

  // Exibe a main section referente à opção selecionada
  mainSections[telaAtual].classList.remove('hidden');

  // Esconde o menu popup
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

btnLogin.addEventListener('click', (e) => MudaTela(e));
