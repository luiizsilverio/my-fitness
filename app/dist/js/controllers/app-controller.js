import { HomeView } from '../views/home-view.js';
import { SignInView } from '../views/signin-view.js';
import { SignUpView } from '../views/signup-view.js';
import { ClientesView } from '../views/clientes-view.js';
import { ExerciciosView } from '../views/exercicios-view.js';
import { HorariosView } from '../views/horarios-view.js';
import { LojaView } from '../views/loja-view.js';
import { QuemSomosView } from '../views/quem-somos-view.js';
import { TreinosView } from '../views/treinos-view.js';
import { Telas } from '../enums/telas.js';
export class AppController {
    constructor() {
        this.signUpView = new SignUpView('section.login');
        this.signInView = new SignInView('section.login');
        this.homeView = new HomeView('section.home');
        this.clientesView = new ClientesView('section.clientes');
        this.exerciciosView = new ExerciciosView('section.exercicios');
        this.horariosView = new HorariosView('section.horarios');
        this.lojaView = new LojaView('section.loja');
        this.quemSomosView = new QuemSomosView('section.quem-somos');
        this.treinosView = new TreinosView('section.treinos');
    }
    renderSignUpForm() {
        this.signUpView.render();
    }
    renderSignInForm() {
        this.signInView.render();
        const link = document.querySelector('a.signup');
        link.addEventListener('click', () => this.renderSignUpForm());
    }
    render(tela) {
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
                this.treinosView.render();
                break;
            case Telas.EXERCICIOS:
                this.exerciciosView.render();
                break;
            case Telas.CLIENTES:
                this.clientesView.render();
                break;
            case Telas.LOGIN:
                this.renderSignInForm();
                break;
            default:
                this.homeView.render();
        }
    }
}
