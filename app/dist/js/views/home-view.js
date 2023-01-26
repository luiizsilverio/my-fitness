export class HomeView {
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
      <h1>NO PAIN NO GAIN</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore porro asperiores consectetur. Pariatur voluptates</p>
      <button>Seja um de nós</button>
    `;
    }
}
