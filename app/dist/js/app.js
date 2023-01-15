import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const btnLogin = document.querySelector('section.user');
const mainSections = document.querySelectorAll('main section');
const userSpan = document.querySelector('section.user span');
const authController = new AuthController();
let telaAtual = Telas.INICIO;
function MudaTela(e) {
    let tela = e.target.dataset['tela'];
    if (!tela)
        return;
    e.preventDefault();
    telaAtual = tela;
    opcMenu.forEach(opcao => {
        if (opcao.getAttribute('data-tela') !== tela) {
            opcao.classList.remove('tela-atual');
        }
        else {
            opcao.classList.add('tela-atual');
        }
    });
    for (const section of mainSections) {
        section.classList.add('hidden');
    }
    mainSections[telaAtual].classList.remove('hidden');
    menuMobile.classList.remove('show-menu');
}
btnMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menuMobile.classList.toggle('show-menu');
});
opcMenu.forEach(opcao => {
    opcao.addEventListener('click', (e) => MudaTela(e));
});
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    authController.login('sarinha', '123');
    setTimeout(() => {
        if (authController.logado()) {
            userSpan.textContent = authController.userName;
        }
        else {
            userSpan.textContent = 'Entrar';
        }
        MudaTela(e);
    }, 200);
});
if (authController.logado()) {
    userSpan.textContent = authController.userName;
}
