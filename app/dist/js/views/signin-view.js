export class SignInView {
    constructor(seletor) {
        const elem = document.querySelector(seletor);
        if (elem) {
            this.elemento = elem;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
    }
    update() {
        let template = this.template();
        this.elemento.innerHTML = template;
    }
    esconde_sessoes() {
        const mainSections = document.querySelectorAll('main section');
        for (const section of mainSections) {
            section.classList.add('hidden');
        }
    }
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
