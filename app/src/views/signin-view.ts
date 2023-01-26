export class SignInView {

  protected elemento: HTMLElement;

  constructor(seletor: string) {
    const elem = document.querySelector(seletor);

    if (elem) {
      this.elemento = elem as HTMLElement;
    } else {
      throw Error(`Seletor ${seletor} não existe no DOM.`);
    }
  }

  public update(): void {
    let template = this.template();
    this.elemento.innerHTML = template;
  }

  private esconde_sessoes(): void {
    const mainSections = document.querySelectorAll('main section');

    for (const section of mainSections) {
      section.classList.add('hidden');
    }
  }

  private template(): string {
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
