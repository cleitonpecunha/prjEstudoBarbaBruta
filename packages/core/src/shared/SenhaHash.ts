import Validador from "./Validador";

export default class SenhaHash {
    constructor(
        readonly valor: string,
        readonly atributo?: string,
        readonly objeto?: string
    ) {
        this.valor = valor?.trim() ?? ""
        Validador.valor(valor, atributo, objeto).naoVazio().senhaHash().lancarSeErro()
    }

    static isValida(hash: string): boolean {
        return Validador.valor(hash).senhaHash().valido
    }
}