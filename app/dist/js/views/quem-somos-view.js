import { View } from "./view.js";
export class QuemSomosView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <h1>QUEM SOMOS</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque incidunt ad fugiat itaque repellendus, a totam quis quos debitis veniam possimus harum.</p>
      <nav class="social">
        <a href="https://github.com/luiizsilverio" target="_blank">
          <i class="fab fa-github" title="Github"></i>
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <i class="fab fa-facebook" title="Facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <i class="fab fa-instagram" title="Instagram"></i>
        </a>
        <a href="https://www.youtube.com" target="_blank">
          <i class="fab fa-youtube" title="Youtube"></i>
        </a>
      </nav>
    `;
    }
}
