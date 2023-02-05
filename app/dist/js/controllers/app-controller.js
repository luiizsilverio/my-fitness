import { Telas } from '../enums/telas.js';
import { AuthController } from './auth-controller.js';
import { HomeView } from '../views/home-view.js';
import { ClientesView } from '../views/clientes-view.js';
import { HorariosView } from '../views/horarios-view.js';
import { LojaView } from '../views/loja-view.js';
import { QuemSomosView } from '../views/quem-somos-view.js';
import { TreinosView } from '../views/treinos-view.js';
import { MsgController } from './msg-controller.js';
import { ExerciciosController } from './exercicios-controller.js';
export class AppController extends MsgController {
    constructor() {
        super();
        this.homeView = new HomeView();
        this.clientesView = new ClientesView();
        this.horariosView = new HorariosView();
        this.lojaView = new LojaView();
        this.quemSomosView = new QuemSomosView();
        this.treinosView = new TreinosView();
        this.authController = new AuthController();
        this.exerciciosController = new ExerciciosController();
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
                    this.authController.renderSignInForm();
                }
                break;
            case Telas.EXERCICIOS:
                if (this.authController.logado()) {
                    this.exerciciosController.render();
                }
                else {
                    this.authController.renderSignInForm();
                }
                break;
            case Telas.CLIENTES:
                if (this.authController.logado()) {
                    this.clientesView.render(null);
                }
                else {
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
//# sourceMappingURL=app-controller.js.map