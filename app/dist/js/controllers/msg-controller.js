export class MsgController {
    showMessage(texto) {
        const divMensagem = document.querySelector('.mensagem');
        const divFilha = divMensagem.firstElementChild;
        divFilha.textContent = texto;
        divMensagem.classList.add('verde');
        divMensagem.classList.remove('hidden', 'vermelho');
        setTimeout(() => this.limpaMensagem(), 2000);
    }
    showError(texto) {
        const divMensagem = document.querySelector('.mensagem');
        const divFilha = divMensagem.firstElementChild;
        divFilha.textContent = texto;
        divMensagem.classList.add('vermelho');
        divMensagem.classList.remove('hidden', 'verde');
        setTimeout(() => this.limpaMensagem(), 3000);
    }
    limpaMensagem() {
        const divMensagem = document.querySelector('.mensagem');
        divMensagem.classList.add('hidden');
    }
}
//# sourceMappingURL=msg-controller.js.map