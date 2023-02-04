import { View } from "./view.js";

export class TreinosView extends View<null> {

  protected template(): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="treinos">
        <h1>TREINOS</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo dolorum eos magnam facere quia, doloribus assumenda.</p>
      </div>
    `;
  }

}
