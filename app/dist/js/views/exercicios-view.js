import { View } from "./view.js";
export class ExerciciosView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <h1>EXERCÍCIOS</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis voluptatem, fugit sit adipisci quaerat.</p>
    `;
    }
}
//# sourceMappingURL=exercicios-view.js.map