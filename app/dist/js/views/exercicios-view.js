import { View } from "./view.js";
export class ExerciciosView extends View {
    template(model) {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="exercicios">
        <div class="title">
          <h1>EXERCÍCIOS</h1>
        </div>

        <div class="container">
          ${model.map(exercicio => this.cardExercicio(exercicio)).join('')}
          ${model.length > 0 ? (this.cardNewExercise()) : ''}
        </div>
      </div>
    `;
    }
    cardExercicio(data) {
        return `
      <div class="card-exercicio">
        <h2>${data.name}</h2>
        ${data?.url_image ? (`<img src="http://localhost:3333/exercises/${data.url_image}" alt=${data.name}>`) : (`<img src="images/icon.svg" alt="Exercício sem foto" class="empty-img">`)}
        <p>${data.obs}</p>
        <div class="actions">
          <i class="fas fa-plus-circle" title="Incluir Exercício" data-id='new'></i>
          <i class="fas fa-edit" title="Alterar" data-id=${data.id}></i>
          <i class="fas fa-trash-alt" title="Excluir" data-id=${data.id}></i>
        </div>
      </div>
    `;
    }
    cardNewExercise() {
        return `
      <div class="card-exercicio card-new">
        <h2>Criar novo Exercício</h2>
        <i class="fas fa-plus-circle" title="Incluir Exercício" data-id='new'></i>
      </div>
    `;
    }
}
//# sourceMappingURL=exercicios-view.js.map