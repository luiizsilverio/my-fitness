import { View } from "./view.js";

export class SignInView extends View {

  protected template(): string {
    this.esconde_sessoes();
    this.elemento.classList.remove('hidden');

    return `
      <div class="login">
        <form class="login">
          <legend>Acesso</legend>
          <label for="name">Nome do Usuário</label>
          <input type="text" id="name" placeholder="Nome" required autofocus>
          <label for="password">Senha</label>
          <input type="password" id="password" placeholder="Senha" required>
          <div class="actions">
            <button type="submit" id="btn-login">Entrar</button>
            <button type="button" class="btn-logout">Sair</button>
          </div>
          <a href="#" class="signup">Não possui uma conta? Cadastre-se AQUI</a>
        </form>
      </div>
    `;
  }

}
