import { View } from "../views/view.js";

export function limpaTela() {

  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]) {

      const retorno = metodoOriginal.apply(this, args);
      const elem = <View<null>>target;
      console.log(elem);
      return retorno;
    }

    return descriptor;
  }
}

// descriptor.value dá acesso ao método decorado
