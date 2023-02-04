import { Exercicio } from "../models/exercicio.js";
import { View } from "./view.js";

export class ExerciciosView extends View<Exercicio[]> {

  protected template(model: Exercicio[]): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="exercicios">
        <div class="title">
          <h1>EXERCÍCIOS</h1>
        </div>

        <div class="container">
          ${
            model.map(exercicio => this.cardExercicio(exercicio)).join('')
          }
          ${
            model.length > 0 ? (
              this.cardNewExercise()
            ) : ''
          }
        </div>
      </div>
    `;
  }

  private cardExercicio(data: Exercicio): string {
    return `
      <div class="card-exercicio">
        <h2>${data.name}</h2>
        ${
          data?.url_image ? (
            `<img src="http://localhost:3333/exercises/${data.url_image}" alt="pullover">`
          ) : (
            `<img src="assets/icon.svg" alt="Exercício sem foto" class="empty-img">`
          )
        }
        <p>${data.obs}</p>
        <div class="actions">
          <i class="fas fa-plus-circle" title="Incluir Exercício"></i>
          <i class="fas fa-edit" title="Alterar"></i>
          <i class="fas fa-trash-alt" title="Excluir"></i>
        </div>
      </div>
    `;
  }

  private cardNewExercise(): string {
    return `
      <div class="card-exercicio card-new">
        <i class="fas fa-plus-circle" title="Incluir Exercício"></i>
      </div>
    `;
  }
}
