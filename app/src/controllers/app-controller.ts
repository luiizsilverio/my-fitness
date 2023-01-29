import config from '../config.js';
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

export class AppController {
  private signUpView = new SignUpView();
  private signInView = new SignInView();
  private homeView = new HomeView();
  private clientesView = new ClientesView();
  private exerciciosView = new ExerciciosView();
  private horariosView = new HorariosView();
  private lojaView = new LojaView();
  private quemSomosView = new QuemSomosView();
  private treinosView = new TreinosView();
  private authController = new AuthController();

  public renderSignUpForm() {
    this.signUpView.render();

    const btnSair = document.querySelector('.btn-logout');
    const formSignup = document.querySelector('form.signup');

    formSignup.addEventListener('submit', (e) => this.signup(e));
    btnSair.addEventListener('click', () => this.logout());
  }

  public renderSignInForm() {
    this.signInView.render();

    const link = document.querySelector('a.signup');
    const btnSair = document.querySelector('.btn-logout');
    const formLogin = document.querySelector('form.login');

    link.addEventListener('click', () => this.renderSignUpForm());
    formLogin.addEventListener('submit', (e) => this.login(e));
    btnSair.addEventListener('click', () => this.logout());
  }

  public render(tela: number) {
    switch (tela) {
      case Telas.INICIO:
        this.homeView.render();
        break;
      case Telas.QUEM_SOMOS:
        this.quemSomosView.render();
        break;
      case Telas.HORARIOS:
        this.horariosView.render();
        break;
      case Telas.LOJA:
        this.lojaView.render();
        break;
      case Telas.TREINOS:
        if (this.authController.logado()) {
          this.treinosView.render();
        } else {
          this.renderSignInForm();
        }
        break;
      case Telas.EXERCICIOS:
        if (this.authController.logado()) {
          this.exerciciosView.render();
        } else {
          this.renderSignInForm();
        }
        break;
      case Telas.CLIENTES:
        if (this.authController.logado()) {
          this.clientesView.render();
        } else {
          this.renderSignInForm();
        }
        break;
      case Telas.LOGIN:
        this.renderSignInForm();
        break;
      default:
        this.homeView.render();
      }
  }


  public limpaMensagem(): void {
    const divMensagem = document.querySelector('.mensagem');
    divMensagem.classList.add('hidden');
  }


  public showMessage(texto: string): void {
    const divMensagem = document.querySelector('.mensagem');
    const divFilha = divMensagem.firstElementChild;

    divFilha.textContent = texto;
    divMensagem.classList.add('verde');
    divMensagem.classList.remove('hidden', 'vermelho');

    setTimeout(() => this.limpaMensagem(), 2000);
  }


  public showError(texto: string): void {
    const divMensagem = document.querySelector('.mensagem');
    const divFilha = divMensagem.firstElementChild;

    divFilha.textContent = texto;
    divMensagem.classList.add('vermelho');
    divMensagem.classList.remove('hidden', 'verde');

    setTimeout(() => this.limpaMensagem(), 3000);
  }


  public async login (e: Event, newUser: boolean = false): Promise<void> {
    e.preventDefault();

    let seletor: string;

    if (newUser) {
      seletor = 'form.signup'
    } else {
      seletor = 'form.login'
    }

    const form = document.querySelector(seletor);
    const name = form['name'].value;
    const password = form['password'].value;

    try {
      await this.authController.login(name, password); // 'sarinha', '123'

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
    } else {
      userSpan.textContent = 'Entrar';
    }
  }


  public logout (): void {
    const userSpan = document.querySelector('section.user span');
    this.authController.logout();
    userSpan.textContent = 'Entrar';
    location.reload();
  }


  public async signup (e: Event): Promise<void> {
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
    } else {
      userSpan.textContent = 'Entrar';
    }
  }

}