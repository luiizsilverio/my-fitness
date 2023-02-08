import { ExerciciosService } from "../services/exercicios-service.js";
import { ExerciciosView } from "../views/exercicios-view.js";
import { MsgController } from "./msg-controller.js";
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
            const form = document.querySelector('.form-exercise');
            const btCanc = document.querySelector('.btn-cancela');
            const inputImg = document.querySelector('#url_image');
            form.addEventListener('submit', (e) => this.saveExercise(e));
            btCanc.addEventListener('click', () => this.render());
            inputImg.addEventListener('change', (e) => this.renderImage(e));
        }
        catch (erro) {
            console.log(erro);
            this.showError('Erro ao buscar o exercício');
        }
    }
    renderImage(ev) {
        ev.preventDefault();
        const input = ev.target;
        const url_image = input.value;
        const spanImage = document.querySelector('.btn-image');
        if (url_image) {
            spanImage.classList.add('sel-image');
        }
        else {
            spanImage.classList.remove('sel-image');
        }
    }
    async saveExercise(ev) {
        ev.preventDefault();
        if (!window.confirm(`Confirma os dados do Exercício?`)) {
            return;
        }
        let form = ev.target;
        const id = form.dataset['id'];
        const name = form['name'].value;
        const obs = form['obs'].value;
        const url_image = form['url_image'];
        const formData = new FormData();
        formData.append('name', name);
        formData.append('obs', obs);
        if (url_image.value) {
            formData.append('image', url_image.files[0]);
        }
        try {
            await this.exerciciosService.editExercise(id, formData);
            this.render();
            this.showMessage('Exercício atualizado com sucesso.');
        }
        catch (erro) {
            console.log(erro);
            this.showError('Erro ao buscar o exercício');
        }
    }
}
//# sourceMappingURL=exercicios-controller.js.map