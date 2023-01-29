import { View } from "./view.js";
export class HorariosView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <div class="horarios">
        <div class="title">
          <h1>HORÁRIOS</h1>
          <i class="far fa-calendar-alt"></i>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fuga, omnis asperiores eum nihil rem beatae maxime.</p>
      </div>
    `;
    }
}
//# sourceMappingURL=horarios-view.js.map