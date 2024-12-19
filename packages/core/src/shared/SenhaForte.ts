import Validador from "./Validador";

export default class SenhaForte {
    constructor(
        readonly valor: string = "",
        readonly atributo?: string,
        readonly objeto?: string,
    ) { 
        this.valor = valor?.trim() ?? ""
        Validador.valor(valor, atributo, objeto).naoVazio().senhaForte().lancarSeErro()
    }
    static isValida(senha: string): boolean {
        return Validador.valor(senha).senhaForte().valido
    }
}