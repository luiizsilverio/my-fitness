export class SignUpView {
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
