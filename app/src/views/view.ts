export abstract class View {

  protected elemento: HTMLElement;

  constructor(seletor: string = 'section.root') {
    const elem = document.querySelector(seletor);

    if (elem) {
      this.elemento = elem as HTMLElement;
    } else {
      throw Error(`Seletor ${seletor} não existe no DOM.`);
    }
  }

  public render(): void {
    let template = this.template();
    this.elemento.innerHTML = template;
  }

  protected abstract template(): string;

  protected esconde_sessoes(): void {
    const mainSections = document.querySelectorAll('main section');

    for (const section of mainSections) {
      section.classList.add('hidden');
    }
  }

}
