import { View } from "./view.js";
export class NewExercicioView extends View {
    template(model) {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="new-exercicio">
        <div class="title">
          <h1>Cadastrar Exercício</h1>
        </div>
        <form class="form-exercise" data-id=${model?.id} data-file=${model?.url_image}>
          <label for="name">Nome do Exercício</label>
          <input type="text" id="name" placeholder="Nome do exercício" required value=${model?.name}>
          <label for="obs">Descrição do Exercício</label>
          <textarea id="obs">${model?.obs}</textarea>
          <label for="url_image" class="btn-image">Imagem do Exercício</label>
          <Input
            type="file"
            id="url_image"
            multiple="false"
            style="display:none;"
          />
          <div class="image">
            ${model?.url_image ? `<img src=${`http://localhost:3333/exercises/${model?.url_image}`} />` : ''}
          </div>
          <div class="actions">
            <button type="submit" class="btn-confirma">Confirma</button>
            <button type="button" class="btn-cancela">Cancela</button>
          </div>
        </form>
      </div>
    `;
    }
}
//# sourceMappingURL=new-exercicio-view.js.map