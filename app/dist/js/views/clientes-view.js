import { View } from "./view.js";
export class ClientesView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <h1>CLIENTES</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reprehenderit repellendus non exercitationem labore nihil dicta autem sit ipsum. Qui, doloremque velit?</p>
    `;
    }
}
