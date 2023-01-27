import { Telas } from "./enums/telas.js";
import { AuthController } from "./controllers/auth-controller.js";
import { AppController } from "./controllers/app-controller.js";
const btnMenu = document.querySelector('.fa-bars');
const menuMobile = document.querySelector('nav.mobile');
const opcMenu = document.querySelectorAll('nav a');
const btnLogin = document.querySelector('section.user');
const userSpan = document.querySelector('section.user span');
const btnSair = document.querySelector('.btn-logout');
const btnLogo = document.querySelector('section.logo');
const divMensagem = document.querySelector('.mensagem');
const formLogin = document.querySelector('form.login');
const appController = new AppController();
const authController = new AuthController();
let telaAtual = Telas.INICIO;
function MudaTela(ev) {
    var element = ev.target;
    const tela = element.dataset['tela'];
    ev.preventDefault();
    if (!tela)
        return;
    telaAtual = Number(tela);
    opcMenu.forEach(opcao => {
        if (opcao.getAttribute('data-tela') !== tela) {
            opcao.classList.remove('tela-atual');
        }
        else {
            opcao.classList.add('tela-atual');
        }
    });
    appController.render(telaAtual);
    menuMobile.classList.remove('show-menu');
}
function showMessage(texto) {
    const divFilha = divMensagem.firstElementChild;
    divFilha.textContent = texto;
    divMensagem.classList.add('verde');
    divMensagem.classList.remove('hidden', 'vermelho');
    setTimeout(() => {
        divMensagem.classList.add('hidden');
    }, 2000);
}
function showError(texto) {
    const divFilha = divMensagem.firstElementChild;
    divFilha.textContent = texto;
    divMensagem.classList.add('vermelho');
    divMensagem.classList.remove('hidden', 'verde');
    setTimeout(() => {
        divMensagem.classList.add('hidden');
    }, 3000);
}
async function login(e) {
    e.preventDefault();
    const name = formLogin['name'].value;
    const password = formLogin['password'].value;
    try {
        await authController.login(name, password);
        showMessage(`Seja Bem-Vindo(a), ${name}`);
        setTimeout(() => location.reload(), 2000);
    }
    catch (erro) {
        authController.logout();
        formLogin['name'].focus();
        showError(erro);
    }
    if (authController.logado()) {
        userSpan.textContent = authController.userName;
    }
    else {
        userSpan.textContent = 'Entrar';
    }
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
btnLogin.addEventListener('click', (e) => MudaTela(e));
userSpan.addEventListener('click', (e) => MudaTela(e));
btnLogo.addEventListener('click', (e) => MudaTela(e));
formLogin.addEventListener('submit', (e) => login(e));
btnSair.addEventListener('click', logout);
if (authController.logado()) {
    userSpan.textContent = authController.userName;
}
