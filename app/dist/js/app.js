var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const mainSections = document.querySelectorAll('main section');
const btnLogin = document.querySelector('section.user');
const userSpan = document.querySelector('section.user span');
const btnSair = document.querySelector('#btn-logout');
const authController = new AuthController();
let telaAtual = Telas.INICIO;
function MudaTela(ev) {
    var element = ev.target;
    const tela = element.dataset['tela'];
    if (!tela)
        return;
    ev.preventDefault();
    telaAtual = Number(tela);
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
function login(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        yield authController.login('sarinha', '123');
        if (authController.logado()) {
            userSpan.textContent = authController.userName;
        }
        else {
            userSpan.textContent = 'Entrar';
        }
        MudaTela(e);
    });
}
function logout(e) {
    authController.logout();
    userSpan.textContent = 'Entrar';
    location.reload();
}
btnMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menuMobile.classList.toggle('show-menu');
});
opcMenu.forEach(opcao => {
    opcao.addEventListener('click', (e) => MudaTela(e));
});
btnLogin.addEventListener('click', (e) => login(e));
userSpan.addEventListener('click', (e) => login(e));
console.log(btnSair);
btnSair.addEventListener('click', logout);
if (authController.logado()) {
    userSpan.textContent = authController.userName;
}
