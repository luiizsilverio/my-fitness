import { View } from "./view.js";

export class LojaView extends View {

  protected template(): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="title">
        <h1>NOSSA LOJA</h1>
        <i class="fas fa-shopping-cart"></i>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit omnis deserunt, nulla officiis nobis non totam, suscipit repudiandae tenetur dolore saepe!</p>
    `;
  }

}
