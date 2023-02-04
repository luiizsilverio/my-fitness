import { View } from "./view.js";
export class NewExercicioView extends View {
    template(model) {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="new-exercicio">
        <div class="title">
          <h1>${model.name}</h1>
        </div>

        <div class="container">

        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=new-exercicio-view.js.map