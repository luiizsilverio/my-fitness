import { View } from "./view.js";
export class ExerciciosView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="exercicios">
        <div class="title">
          <h1>EXERCÍCIOS</h1>
          <i class="fas fa-plus-circle" title="Incluir Exercício"></i>
        </div>

        <div class="container">
          <div class="card-exercicio">
            <h2>Pullover</h2>
            <img src="http://localhost:3333/exercises/5e48ad343328-mulher-exercicio-pullover.jpg" alt="pullover">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis voluptatem</p>
            <div class="actions">
              <i class="fas fa-edit" title="Alterar"></i>
              <i class="fas fa-trash-alt" title="Excluir"></i>
            </div>
          </div>
          <div class="card-exercicio">
            <h2>Supino</h2>
            <img src="http://localhost:3333/exercises/87a7baa3967e-supino.jpeg" alt="supino">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis voluptatem apenas um teste para ver como fica na tela lorem ipsum</p>
            <div class="actions">
            <i class="fas fa-edit" title="Alterar"></i>
            <i class="fas fa-trash-alt" title="Excluir"></i>
            </div>
          </div>
          <div class="card-exercicio">
            <h2>Pullover</h2>
            <img src="http://localhost:3333/exercises/5e48ad343328-mulher-exercicio-pullover.jpg" alt="pullover">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis voluptatem</p>
            <div class="actions">
              <i class="fas fa-edit" title="Alterar"></i>
              <i class="fas fa-trash-alt" title="Excluir"></i>
            </div>
          </div>
          <div class="card-exercicio">
            <h2>Supino</h2>
            <img src="http://localhost:3333/exercises/87a7baa3967e-supino.jpeg" alt="supino">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis voluptatem apenas um teste para ver como fica na tela lorem ipsum</p>
            <div class="actions">
            <i class="fas fa-edit" title="Alterar"></i>
            <i class="fas fa-trash-alt" title="Excluir"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=exercicios-view.js.map