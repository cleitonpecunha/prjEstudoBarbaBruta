import Validador from "./Validador"

export default class EnhderecoEmail {
    
    constructor(
        readonly valor: string,
        readonly atributo?: string,
        readonly objeto?: string,
    ) {
        this.valor = valor?.trim() ?? ""
        Validador.valor(valor, atributo, objeto).naoVazio().email().lancarSeErro()
    }

    get usuario(): string {
        return this.valor.split("@")[0]!
    }

    get dominio(): string {
        return this.valor.split("@")[1]!
    }

    static isValido(email: string): boolean {
        return Validador.valor(email, "E-mail", "Usuário").email().valido
    }    
}