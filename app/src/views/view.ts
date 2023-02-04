export abstract class View<T> {

  protected elemento: HTMLElement;

  constructor(seletor: string = '.root') {
    const elem = document.querySelector(seletor);

    if (elem) {
      this.elemento = elem as HTMLElement;
    } else {
      throw Error(`Seletor ${seletor} não existe no DOM.`);
    }
  }

  public render(model: T): void {
    let template = this.template(model);
    this.elemento.innerHTML = template;
  }

  protected abstract template(model: T): string;

  protected esconde_sessoes(): void {
    const mainSections = document.querySelectorAll('main section');

    for (const section of mainSections) {
      section.classList.add('hidden');
    }
  }

}
