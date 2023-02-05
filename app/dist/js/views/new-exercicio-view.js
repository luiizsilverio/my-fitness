import { View } from "./view.js";
export class NewExercicioView extends View {
    template(model) {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="new-exercicio">
        <div class="title">
          <h1>${model?.name}</h1>
        </div>
        <form class="form-exercise">
          <div>
            <label for="name">Nome do Exercício</label>
            <input type="text" id="name" placeholder="Nome do exercício" required value=${model?.name}>
            <label for="description">Descrição do Exercício</label>
            <textarea id="description">${model?.obs}</textarea>
          </div>
        </form>
        <div class="actions">
          <button type="submit" id="btn-signup">Confirma</button>
          <button type="button" class="btn-logout">Cancela</button>
        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=new-exercicio-view.js.map