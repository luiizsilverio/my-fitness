import { HomeView } from '../views/home-view.js';
import { SignInView } from '../views/signin-view.js';
import { SignUpView } from '../views/signup-view.js';
export class AppController {
    constructor() {
        this.signUpView = new SignUpView('section.login');
        this.signInView = new SignInView('section.login');
        this.homeView = new HomeView('section.home');
    }
    showSignUpForm() {
        this.signUpView.update();
    }
    showSignInForm() {
        this.signInView.update();
        const link = document.querySelector('a.signup');
        link.addEventListener('click', () => this.showSignUpForm());
    }
    showHome() {
        this.homeView.update();
    }
}
