import { View } from "./view.js";

export class HomeView extends View {

  protected template(): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="home">
        <h1>NO PAIN NO GAIN</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore porro asperiores consectetur. Pariatur voluptates</p>
        <button>Seja um de nós</button>
      </div>
    `;
  }

}
