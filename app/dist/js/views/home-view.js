import { View } from "./view.js";
export class HomeView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <h1>NO PAIN NO GAIN</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore porro asperiores consectetur. Pariatur voluptates</p>
      <button>Seja um de nós</button>
    `;
    }
}
