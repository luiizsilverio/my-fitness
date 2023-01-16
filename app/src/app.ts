import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
import config from './config.js';

const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const mainSections = document.querySelectorAll('main section');
const btnLogin = document.querySelector('section.user');
const userSpan = document.querySelector('section.user span');
const btnSair = document.querySelector('#btn-logout');

const authController = new AuthController();

let telaAtual = Telas.INICIO;

function MudaTela(ev: Event): void {
  var element = ev.target as HTMLElement;

  // const tela = element.getAttribute('data-tela');
  const tela = element.dataset['tela'];

  if (!tela) return;

  ev.preventDefault();

  telaAtual = Number(tela);

  // Mostra a opção do menu selecionada com cor laranja
  opcMenu.forEach(opcao => {
    if (opcao.getAttribute('data-tela') !== tela) {
      opcao.classList.remove('tela-atual');
    } else {
      opcao.classList.add('tela-atual');
    }
  })

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


async function login (e: Event): Promise<void> {
  e.preventDefault();

  await authController.login('sarinha', '123');

  if (authController.logado()) {
    userSpan.textContent = authController.userName;
  } else {
    userSpan.textContent = 'Entrar';
  }

  MudaTela(e);
}


function logout (e: Event): void {
  authController.logout();
  userSpan.textContent = 'Entrar';
  location.reload();
  // location.href = "/";
}


// Event Listeners

btnMenu.addEventListener('click', (e) => {
  e.preventDefault();
  menuMobile.classList.toggle('show-menu');
})

opcMenu.forEach(opcao => {
  opcao.addEventListener('click', (e) => MudaTela(e));
})

btnLogin.addEventListener('click', (e) => login(e));
userSpan.addEventListener('click', (e) => login(e));

console.log(btnSair)
btnSair.addEventListener('click', logout);

// On Load

if (authController.logado()) {
  userSpan.textContent = authController.userName;
}
