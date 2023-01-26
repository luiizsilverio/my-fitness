import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
import { AppController } from "./controllers/app-controller.js";

const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const mainSections = document.querySelectorAll('main section');
const btnLogin = document.querySelector('section.user');
const userSpan = document.querySelector('section.user span');
const btnSair = document.querySelector('.btn-logout');
const btnLogo = document.querySelector('section.logo');
const divMensagem = document.querySelector('.mensagem');
const formLogin = document.querySelector('form.login');
const formSignUp = document.querySelector('form.signup');
const linkSignUp = document.querySelector('form.login a');

const appController = new AppController();
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

  // Esconde o formulário de SignUp
  // formLogin.classList.remove('hidden');
  // formSignUp.classList.add('hidden');

  // Exibe a main section referente à opção selecionada
  mainSections[telaAtual].classList.remove('hidden');

  // Esconde o menu popup
  menuMobile.classList.remove('show-menu');
}


function showMessage(texto: string): void {
  const divFilha = divMensagem.firstElementChild;

  divFilha.textContent = texto;
  divMensagem.classList.add('verde');
  divMensagem.classList.remove('hidden', 'vermelho');

  setTimeout(() => {
    divMensagem.classList.add('hidden');
  }, 2000);
}


function showError(texto: string): void {
  const divFilha = divMensagem.firstElementChild;

  divFilha.textContent = texto;
  divMensagem.classList.add('vermelho');
  divMensagem.classList.remove('hidden', 'verde');

  setTimeout(() => {
    divMensagem.classList.add('hidden');
  }, 3000);
}


async function login (e: Event): Promise<void> {
  e.preventDefault();

  const name = formLogin['name'].value;
  const password = formLogin['password'].value;

  try {
    await authController.login(name, password); // 'sarinha', '123'
    showMessage(`Seja Bem-Vindo(a), ${name}`)
    setTimeout(() => location.reload(), 2000);
  }
  catch (erro) {
    authController.logout();
    formLogin['name'].focus();
    showError(erro);
  }

  if (authController.logado()) {
    userSpan.textContent = authController.userName;
  } else {
    userSpan.textContent = 'Entrar';
  }

  // location.reload();
}


function logout (e: Event): void {
  authController.logout();
  userSpan.textContent = 'Entrar';
  location.reload();
}


// Event Listeners

btnMenu.addEventListener('click', (e) => {
  e.preventDefault();
  menuMobile.classList.toggle('show-menu');
})

opcMenu.forEach(opcao => {
  opcao.addEventListener('click', (e) => MudaTela(e));
})

btnLogin.addEventListener('click', (e) => {
  appController.showSignInForm();
  // MudaTela(e);
});

userSpan.addEventListener('click', (e) => MudaTela(e));
btnSair.addEventListener('click', logout);
btnLogo.addEventListener('click', (e) => MudaTela(e));
formLogin.addEventListener('submit', (e) => login(e));

linkSignUp.addEventListener('click', () => console.log('signup')); //authController.showSignUpForm());


// On Load

if (authController.logado()) {
  userSpan.textContent = authController.userName;
}
