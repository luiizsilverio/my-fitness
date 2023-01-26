export class HomeView {

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
      <h1>NO PAIN NO GAIN</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore porro asperiores consectetur. Pariatur voluptates</p>
      <button>Seja um de nós</button>
    `;
  }

}
