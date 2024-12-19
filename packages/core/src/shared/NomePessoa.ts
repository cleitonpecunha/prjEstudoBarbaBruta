import Validador from "./Validador"

export default class NomePessoa {
    constructor(
        readonly completo?: string,
        readonly atributo?: string,
        readonly objeto?: string,
    ) {
        this.completo = completo?.trim() ?? ""        

        Validador.valor(completo, atributo, objeto)
            .naoVazio()
            .tamanhoMaiorOuIgualQue(4) // 3 letras + 1 espaço
            .tamanhoMenorOuIgualQue(120)
            .regex(/^[a-zA-ZÀ-ú'\.-\s]*$/, "CARACTERES_INVALIDOS")
            .lancarSeErro()

        Validador.valor(this.completo.split(" ")[1], atributo, objeto)
            .naoVazio("SOBRENOME_INVALIDO")
            .lancarSeErro()
    }

    get primeiroNome() {
        return this.completo!.split(" ")[0]
    }

    get sobrenomes(): string[] {
        return this.completo!.split(" ").slice(1)
    }

    get ultimoSobrenome(): string {
        return this.completo!.split(" ").pop() as string
    }
}