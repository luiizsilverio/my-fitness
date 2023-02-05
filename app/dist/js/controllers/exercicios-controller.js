import { ExerciciosService } from "../services/exercicios-service";
import { ExerciciosView } from "../views/exercicios-view";
import { MsgController } from "./msg-controller";
import { NewExercicioView } from '../views/new-exercicio-view.js';
export class ExerciciosController extends MsgController {
    constructor() {
        super();
        this.exerciciosView = new ExerciciosView();
        this.exerciciosService = new ExerciciosService();
        this.newExercicioView = new NewExercicioView();
    }
    async excluiExercicio(ev) {
        var element = ev.target;
        const id = element.getAttribute('data-id');
        if (!id || id === 'new')
            return;
        if (!window.confirm(`Confirma Excluir o Exercício?`)) {
            return;
        }
        try {
            await this.exerciciosService.excludeExercise(id);
            this.render();
            this.showMessage('Exercício excluído.');
        }
        catch (erro) {
            console.log(erro);
            this.showError('Erro ao excluir o exercício');
        }
    }
    async render() {
        try {
            const dados = await this.exerciciosService.getAllExercises();
            this.exerciciosView.render(dados);
            const addBtns = document.querySelectorAll('.exercicios i.fa-plus-circle');
            const editBtns = document.querySelectorAll('.exercicios i.fa-edit');
            const delBtns = document.querySelectorAll('.exercicios i.fa-trash-alt');
            for (const addBtn of addBtns) {
                addBtn.addEventListener('click', (e) => this.renderEditaExercicio(e));
            }
            for (const editBtn of editBtns) {
                editBtn.addEventListener('click', (e) => this.renderEditaExercicio(e));
            }
            for (const delBtn of delBtns) {
                delBtn.addEventListener('click', async (e) => this.excluiExercicio(e));
            }
        }
        catch (erro) {
            console.log(erro);
            this.showError('Erro ao buscar a lista de exercícios');
        }
    }
    async renderEditaExercicio(ev) {
        var element = ev.target;
        const id = element.getAttribute('data-id');
        let dados;
        if (!id || id === 'new') {
            console.log('new');
            return;
        }
        try {
            dados = await this.exerciciosService.getExercise(id);
            this.newExercicioView.render(dados);
        }
        catch (erro) {
            console.log(erro);
            this.showError('Erro ao buscar o exercício');
        }
    }
}
//# sourceMappingURL=exercicios-controller.js.map