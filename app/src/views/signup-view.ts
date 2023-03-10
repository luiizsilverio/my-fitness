import { View } from "./view.js";

export class SignUpView extends View<null> {

  protected template(): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="signup">
        <form class="signup">
          <legend style="font-size: 42px">Crie sua Conta</legend>
          <label for="name">Nome do Usuário</label>
          <input type="text" id="name" placeholder="Nome" required>
          <label for="email">E-Mail do Usuário</label>
          <input type="email" id="email" placeholder="E-mail" required>
          <label for="password">Senha</label>
          <input type="password" id="password" placeholder="Senha" required>
          <label for="confirm-password">Confirme a Senha</label>
          <input type="password" id="confirm-password" placeholder="Confirme a Senha" required>
          <div class="actions">
            <button type="submit" class="btn-confirma">Confirma</button>
            <button type="button" class="btn-cancela">Cancela</button>
          </div>
        </form>
      </div>
    `;
  }

}
