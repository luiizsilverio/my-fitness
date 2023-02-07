import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
import { AppController } from "./controllers/app-controller.js";

const btnMenu = document.querySelector('header .fa-bars');
const menuMobile = document.querySelector('header nav.mobile');
const opcMenu = document.querySelectorAll('header nav a');
const btnLogo = document.querySelector('header section.logo');
const btnLogin = document.querySelector('header section.user');
const userSpan = document.querySelector('header section.user span');

const appController = new AppController();
const authController = new AuthController();

let telaAtual = Telas.INICIO;

function MudaTela(ev: Event): void {
  let element = ev.target as HTMLElement;

  // const tela = element.getAttribute('data-tela');
  const tela = element.dataset['tela'];

  ev.preventDefault();

  if (!tela) return;

  const disabled = element.classList.contains('isDisabled');
  if (disabled) return;

  telaAtual = Number(tela);

  // Mostra a opção do menu selecionada na cor laranja
  opcMenu.forEach(opcao => {
    if (opcao.getAttribute('data-tela') !== tela) {
      opcao.classList.remove('tela-atual');
    } else {
      opcao.classList.add('tela-atual');
    }
  })

  // Renderiza a tela selecionada
  appController.render(telaAtual);

  // Esconde o menu popup
  menuMobile.classList.remove('show-menu');
}

function ativa_opcoes(ativa: boolean = true): void {
  opcMenu.forEach((opcao, index) => {
    const vtela = opcao.getAttribute('data-tela');

    if ([Telas.TREINOS, Telas.EXERCICIOS, Telas.CLIENTES]
      .includes(Number(vtela))) {
        if (ativa) {
          opcao.classList.remove('isDisabled');
        } else {
          opcao.classList.add('isDisabled');
        }
      }
  })
}

function desativa_opcoes(): void {
  ativa_opcoes(false);
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
userSpan.addEventListener('click', (e) => MudaTela(e));
btnLogo.addEventListener('click', (e) => MudaTela(e));

// On Load

if (authController.logado()) {
  userSpan.textContent = authController.userName;
  ativa_opcoes();
} else {
  desativa_opcoes();
}

appController.render(Telas.INICIO);
