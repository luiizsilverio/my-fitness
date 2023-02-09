import { Telas } from '../enums/telas.js';
import { HomeView } from '../views/home-view.js';
import { ClientesView } from '../views/clientes-view.js';
import { HorariosView } from '../views/horarios-view.js';
import { LojaView } from '../views/loja-view.js';
import { QuemSomosView } from '../views/quem-somos-view.js';
import { TreinosView } from '../views/treinos-view.js';
import { AuthController } from './auth-controller.js';
import { ExerciciosController } from './exercicios-controller.js';

export class AppController {
  private homeView = new HomeView();
  private clientesView = new ClientesView();
  private horariosView = new HorariosView();
  private lojaView = new LojaView();
  private quemSomosView = new QuemSomosView();
  private treinosView = new TreinosView();
  private authController = new AuthController();
  private exerciciosController = new ExerciciosController();

  public render(tela: number): void {
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
        } else {
          this.authController.renderSignInForm();
        }
        break;
      case Telas.EXERCICIOS:
        if (this.authController.logado()) {
          this.exerciciosController.render();
        } else {
          this.authController.renderSignInForm();
        }
        break;
      case Telas.CLIENTES:
        if (this.authController.logado()) {
          this.clientesView.render(null);
        } else {
          this.authController.renderSignInForm();
        }
        break;
      case Telas.LOGIN:
        this.authController.renderSignInForm();
        break;
      default:
        this.homeView.render(null);
      }
  }

}
