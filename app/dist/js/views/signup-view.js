import { View } from "./view.js";
export class SignUpView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <form class="login hidden"></form>
      <form class="signup">
        <legend>Login</legend>
        <label for="name_">Nome do Usuário</label>
        <input type="text" id="name_" placeholder="Nome" required>
        <label for="email_">E-Mail do Usuário</label>
        <input type="email" id="email_" placeholder="E-mail" required>
        <label for="password_">Senha</label>
        <input type="password" id="password_" placeholder="Senha" required>
        <label for="confirm-password">Confirme a Senha</label>
        <input type="password" id="confirm-password" placeholder="Confirme a Senha" required>
        <div class="actions">
          <button type="submit" id="btn-signup">Confirma</button>
          <button type="button" class="btn-logout">Cancela</button>
        </div>
      </form>
    `;
    }
}
