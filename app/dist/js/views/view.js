export class View {
    constructor(seletor) {
        const elem = document.querySelector(seletor);
        if (elem) {
            this.elemento = elem;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
    }
    render() {
        let template = this.template();
        this.elemento.innerHTML = template;
    }
    esconde_sessoes() {
        const mainSections = document.querySelectorAll('main section');
        for (const section of mainSections) {
            section.classList.add('hidden');
        }
    }
}
