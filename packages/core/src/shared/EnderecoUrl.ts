import Validador from "./Validador"

export default class EnderecoUrl {
    private url: URL

    constructor(
        readonly valor?: string,
        atributo?: string,
        objeto?: string,
    ) {
        this.valor = valor ?? ""
        Validador.valor(valor, atributo, objeto).url().lancarSeErro()
        this.url = new URL(this.valor)
    }

    get protocolo(): string {
        return this.url.protocol
    }

    get dominio(): string {
        return this.url.hostname
    }

    get caminho(): string {
        return this.url.pathname
    }

    get parametros(): any {
        const params = this.url.searchParams.toString().split("&")
        return params.reduce((paramsObj, param) => {
            const [chave, valor] = param.split("=")
            return { ...paramsObj, [chave!]: valor }
        }, {} as any)
    }

    static isValida(url: string): boolean {
        return Validador.valor(url).url().valido
    }
}
