import config from '../config.js';
import { HomeView } from '../views/home-view.js';
import { SignInView } from '../views/signin-view.js';
import { SignUpView } from '../views/signup-view.js';

export class AppController {
  private signUpView = new SignUpView('section.login');
  private signInView = new SignInView('section.login');
  private homeView = new HomeView('section.home');

  public showSignUpForm() {
    this.signUpView.update();
  }

  public showSignInForm() {
    this.signInView.update();
    const link = document.querySelector('a.signup');
    link.addEventListener('click', () => this.showSignUpForm());
  }

  public showHome() {
    this.homeView.update();
  }

}
