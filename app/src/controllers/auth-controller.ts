import { AuthService } from '../services/auth-service.js';
import { SignInView } from '../views/signin-view.js';
import { SignUpView } from '../views/signup-view.js';
import { MsgController } from './msg-controller.js';

export class AuthController extends MsgController {
  private user_id: number
  private username: string;
  private email: string;
  private token: string;
  private authService = new AuthService();
  private signUpView = new SignUpView();
  private signInView = new SignInView();

  constructor() {
    super();

    const auth = localStorage.getItem('MyFitness.auth');

    if (auth) {
      const authData = JSON.parse(auth);
      this.token = authData.token;
      this.user_id = authData.user_id;
      this.username = authData.username;
      this.email = authData.email;
    }

    if (this.token) {
      this.getUser(this.user_id);
    }
  }

  get userName() {
    return this.username;
  }

  private async getUser(id: number): Promise<void> {
    try {
      if (!id) {
        return this.showError('Erro ao buscar usuário');
      }

      const data = await this.authService.getUser(id, this.token);

      this.user_id = data.id;
      this.username = data.name;
      this.email = data.email;
      this.salvaDados();

    } catch(error) {
      console.log(error);
      this.showError('Erro ao buscar dados do usuário');
      this.logout();
    }
  }

  public logout(): void {
    console.log('logout')
    localStorage.removeItem('MyFitness.auth');
    this.token = '';
    this.user_id = 0;

    const userSpan = document.querySelector('section.user span');
    userSpan.textContent = 'Entrar';
    location.reload();
  }

  private salvaDados(): void {
    localStorage.setItem('MyFitness.auth', JSON.stringify({
      token: this.token,
      user_id: this.user_id,
      username: this.username,
      email: this.email,
    }));
  }

  public logado(): boolean {
    return this.token && this.user_id > 0;
  }

  public async login(e: Event, newUser: boolean = false): Promise<void> {
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
      const data = await this.authService.signIn(name, password);
      this.token = data.token;
      this.user_id = parseInt(data.uid);

      if (this.token) {
        this.getUser(this.user_id);
        this.showMessage(`Seja Bem-Vindo(a), ${name}`);
        setTimeout(() => location.reload(), 2000);
      }

    } catch(error) {
      this.logout();
      form['name'].focus();
      this.showError('Erro ao acessar o sistema');
      console.log(error);
    }

    const userSpan = document.querySelector('section.user span');

    if (this.logado()) {
      userSpan.textContent = this.userName;
    } else {
      userSpan.textContent = 'Entrar';
    }
  }

  public async signup(e: Event): Promise<void> {
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
      await this.authService.signUp({ name, email, password });

    } catch(error) {
      this.logout();
      formSignup['name'].focus();
      console.log(error);
      this.showError('Erro ao cadastrar o usuário');
    }

    const userSpan = document.querySelector('section.user span');

    if (this.logado()) {
      userSpan.textContent = this.userName;
    } else {
      userSpan.textContent = 'Entrar';
    }
  }

  public renderSignUpForm(): void {
    this.signUpView.render(null);

    const btnSair = document.querySelector('.btn-cancela');
    const formSignup = document.querySelector('form.signup');

    formSignup.addEventListener('submit', (e) => this.signup(e));
    btnSair.addEventListener('click', () => this.logout());
  }

  public renderSignInForm(): void {
    this.signInView.render(null);

    const link = document.querySelector('a.signup');
    const btnSair = document.querySelector('.btn-cancela');
    const formLogin = document.querySelector('form.login');

    link.addEventListener('click', () => this.renderSignUpForm());
    formLogin.addEventListener('submit', (e) => this.login(e));
    btnSair.addEventListener('click', () => this.logout());
  }

}
