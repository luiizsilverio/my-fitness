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
          <i class="fas fa-plus-circle" title="Incluir Exercício"></i>
        </div>

        <div class="container">
          {
            model.map((exercicio: Exercicio) => card(exercicio))
          }
        </div>
      </div>
    `;
  }

  private card(data: Exercicio) {
    return `
      <div class="card-exercicio">
        <h2>{data.name}</h2>
        {
          data?.url_image && (
            <img src="http://localhost:3333/exercises/${data.url_image}" alt="pullover">
          )
        }
        <p>{data.obs}</p>
        <div class="actions">
          <i class="fas fa-edit" title="Alterar"></i>
          <i class="fas fa-trash-alt" title="Excluir"></i>
        </div>
      </div>
    `;
  }
}
