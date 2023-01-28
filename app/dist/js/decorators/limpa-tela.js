export function limpaTela() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            const retorno = metodoOriginal.apply(this, args);
            const elem = target;
            console.log(elem);
            return retorno;
        };
        return descriptor;
    };
}
//# sourceMappingURL=limpa-tela.js.map