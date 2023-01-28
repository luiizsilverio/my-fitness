import { View } from "./view.js";
export class SignInView extends View {
    template() {
        this.esconde_sessoes();
        this.elemento.classList.remove('hidden');
        return `
      <form class="login">
        <legend>Login</legend>
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
      <form class="signup hidden"></form>
    `;
    }
}
//# sourceMappingURL=signin-view.js.map