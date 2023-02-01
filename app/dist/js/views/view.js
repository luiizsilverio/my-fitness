export class View {
    constructor(seletor = '.root') {
        const elem = document.querySelector(seletor);
        if (elem) {
            this.elemento = elem;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
    }
    render(model) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
    esconde_sessoes() {
        const mainSections = document.querySelectorAll('main section');
        for (const section of mainSections) {
            section.classList.add('hidden');
        }
    }
}
//# sourceMappingURL=view.js.map