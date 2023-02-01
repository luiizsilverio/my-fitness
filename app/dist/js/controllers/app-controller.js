import { Telas } from '../enums/telas.js';
import { AuthController } from './auth-controller.js';
import { HomeView } from '../views/home-view.js';
import { SignInView } from '../views/signin-view.js';
import { SignUpView } from '../views/signup-view.js';
import { ClientesView } from '../views/clientes-view.js';
import { ExerciciosView } from '../views/exercicios-view.js';
import { HorariosView } from '../views/horarios-view.js';
import { LojaView } from '../views/loja-view.js';
import { QuemSomosView } from '../views/quem-somos-view.js';
import { TreinosView } from '../views/treinos-view.js';
import { ExerciciosService } from '../services/exercicios-service.js';
export class AppController {
    constructor() {
        this.signUpView = new SignUpView();
        this.signInView = new SignInView();
        this.homeView = new HomeView();
        this.clientesView = new ClientesView();
        this.exerciciosView = new ExerciciosView();
        this.horariosView = new HorariosView();
        this.lojaView = new LojaView();
        this.quemSomosView = new QuemSomosView();
        this.treinosView = new TreinosView();
        this.authController = new AuthController();
        this.exerciciosService = new ExerciciosService();
    }
    renderSignUpForm() {
        this.signUpView.render(null);
        const btnSair = document.querySelector('.btn-logout');
        const formSignup = document.querySelector('form.signup');
        formSignup.addEventListener('submit', (e) => this.signup(e));
        btnSair.addEventListener('click', () => this.logout());
    }
    renderSignInForm() {
        this.signInView.render(null);
        const link = document.querySelector('a.signup');
        const btnSair = document.querySelector('.btn-logout');
        const formLogin = document.querySelector('form.login');
        link.addEventListener('click', () => this.renderSignUpForm());
        formLogin.addEventListener('submit', (e) => this.login(e));
        btnSair.addEventListener('click', () => this.logout());
    }
    async renderExercicios() {
        const dados = await this.exerciciosService.getAllExercises();
        this.exerciciosView.render(dados);
    }
    render(tela) {
        switch (tela) {
            case Telas.INICIO:
                this.homeView.render(null);
                break;
            case Telas.QUEM_SOMOS:
                this.quemSomosView.render(null);
                break;
            case Telas.HORARIOS:
                this.horariosView.render(null);
                break;
            case Telas.LOJA:
                this.lojaView.render(null);
                break;
            case Telas.TREINOS:
                if (this.authController.logado()) {
                    this.treinosView.render(null);
                }
                else {
                    this.renderSignInForm();
                }
                break;
            case Telas.EXERCICIOS:
                if (this.authController.logado()) {
                    this.renderExercicios();
                }
                else {
                    this.renderSignInForm();
                }
                break;
            case Telas.CLIENTES:
                if (this.authController.logado()) {
                    this.clientesView.render(null);
                }
                else {
                    this.renderSignInForm();
                }
                break;
            case Telas.LOGIN:
                this.renderSignInForm();
                break;
            default:
                this.homeView.render(null);
        }
    }
    limpaMensagem() {
        const divMensagem = document.querySelector('.mensagem');
        divMensagem.classList.add('hidden');
    }
    showMessage(texto) {
        const divMensagem = document.querySelector('.mensagem');
        const divFilha = divMensagem.firstElementChild;
        divFilha.textContent = texto;
        divMensagem.classList.add('verde');
        divMensagem.classList.remove('hidden', 'vermelho');
        setTimeout(() => this.limpaMensagem(), 2000);
    }
    showError(texto) {
        const divMensagem = document.querySelector('.mensagem');
        const divFilha = divMensagem.firstElementChild;
        divFilha.textContent = texto;
        divMensagem.classList.add('vermelho');
        divMensagem.classList.remove('hidden', 'verde');
        setTimeout(() => this.limpaMensagem(), 3000);
    }
    async login(e, newUser = false) {
        e.preventDefault();
        let seletor;
        if (newUser) {
            seletor = 'form.signup';
        }
        else {
            seletor = 'form.login';
        }
        const form = document.querySelector(seletor);
        const name = form['name'].value;
        const password = form['password'].value;
        try {
            await this.authController.login(name, password);
            this.showMessage(`Seja Bem-Vindo(a), ${name}`);
            setTimeout(() => location.reload(), 2000);
        }
        catch (erro) {
            this.authController.logout();
            form['name'].focus();
            this.showError(erro);
        }
        const userSpan = document.querySelector('section.user span');
        if (this.authController.logado()) {
            userSpan.textContent = this.authController.userName;
        }
        else {
            userSpan.textContent = 'Entrar';
        }
    }
    logout() {
        const userSpan = document.querySelector('section.user span');
        this.authController.logout();
        userSpan.textContent = 'Entrar';
        location.reload();
    }
    async signup(e) {
        e.preventDefault();
        const formSignup = document.querySelector('form.signup');
        const name = formSignup['name'].value;
        const email = formSignup['email'].value;
        const password = formSignup['password'].value;
        const confirm_password = formSignup['confirm-password'].value;
        if (password !== confirm_password) {
            this.showError('Senhas não conferem!');
            return;
        }
        if (!name) {
            this.showError('Informe o nome');
            return;
        }
        try {
            await this.authController.signup({ name, email, password });
            await this.login(e, true);
        }
        catch (erro) {
            this.authController.logout();
            formSignup['name'].focus();
            this.showError(erro);
        }
        const userSpan = document.querySelector('section.user span');
        if (this.authController.logado()) {
            userSpan.textContent = this.authController.userName;
        }
        else {
            userSpan.textContent = 'Entrar';
        }
    }
}
//# sourceMappingURL=app-controller.js.map