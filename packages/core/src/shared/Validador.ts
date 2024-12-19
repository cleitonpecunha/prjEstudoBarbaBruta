//import { validate } from "uuid"
import ErroValidacao from "../erros/model/ErroValidacao"

export default class Validador {
    private constructor(
        readonly valor: any,
        readonly atributo: string | null,
        readonly objeto: string | null,
        readonly erros: ErroValidacao[] = [],
    ) {}    

    static valor(valor: any, atributo?: string, objeto?: string): Validador {
        return new Validador(valor, atributo ?? null, objeto ?? null)
    }

    static lancarErro(erro: string): never {
        throw [{ codigo: erro }]
    }

    static combinar(...validadores: Validador[]): ErroValidacao[] | null {
        const errosFiltrados = validadores
            .flatMap((v) => v.erros)
            .filter((erro) => erro !== null) as ErroValidacao[]
        return errosFiltrados.length > 0 ? errosFiltrados : null
    }

    nulo(erro: string = "NAO_NULO"): Validador {
        return this.valor === null || this.valor === undefined
            ? this
            : this.adicionarErro(erro)
    }

    naoNulo(erro: string = "NULO"): Validador {
        return this.valor !== null && this.valor !== undefined
            ? this
            : this.adicionarErro(erro)
    }

    naoVazio(erro: string = "VAZIO"): Validador {
        const validador = this.naoNulo(erro)
        if (Array.isArray(validador.valor)) {
            return validador.valor.length > 0 ? validador : validador.adicionarErro(erro)
        }
        return validador.valor?.trim() !== "" ? validador : validador.adicionarErro(erro)
    }

    tamanhoMenorQue(tamanhoMaximo: number, erro: string = "TAMANHO_GRANDE"): Validador {
        if (!this.valor) return this
        return this.valor.length < tamanhoMaximo
            ? this
            : this.adicionarErro({ codigo: erro, max: tamanhoMaximo })
    }

    tamanhoMenorOuIgualQue(
        tamanhoMaximo: number,
        erro: string = "TAMANHO_GRANDE",
    ): Validador {
        if (!this.valor) return this
        return this.valor.length <= tamanhoMaximo
            ? this
            : this.adicionarErro({ codigo: erro, max: tamanhoMaximo })
    }

    tamanhoMaiorQue(tamanhoMinimo: number, erro: string = "TAMANHO_PEQUENO"): Validador {
        if (!this.valor) return this
        return this.valor.length > tamanhoMinimo
            ? this
            : this.adicionarErro({ codigo: erro, min: tamanhoMinimo })
    }

    tamanhoMaiorOuIgualQue(
        tamanhoMinimo: number,
        erro: string = "TAMANHO_PEQUENO",
    ): Validador {
        if (!this.valor) return this
        return this.valor.length >= tamanhoMinimo
            ? this
            : this.adicionarErro({ codigo: erro, min: tamanhoMinimo })
    }

    menorQue(max: number, erro: string = "MAIOR"): Validador {
        return this.valor < max ? this : this.adicionarErro({ codigo: erro, max })
    }

    menorOuIgualQue(max: number, erro: string = "MAIOR"): Validador {
        return this.valor <= max ? this : this.adicionarErro({ codigo: erro, max })
    }

    maiorQue(min: number, erro: string = "MENOR"): Validador {
        return this.valor > min ? this : this.adicionarErro({ codigo: erro, min })
    }

    maiorOuIgualQue(min: number, erro: string = "MENOR"): Validador {
        return this.valor >= min ? this : this.adicionarErro({ codigo: erro, min })
    }

    //uuid(erro: string = "ID_INVALIDO"): Validador {
    //    return validate(this.valor) ? this : this.adicionarErro(erro)
    //}

    url(erro: string = "URL_INVALIDA"): Validador {
        try {
            new URL(this.valor)
            return this
        } catch {
            return this.adicionarErro(erro)
        }
    }

    email(erro: string = "EMAIL_INVALIDO"): Validador {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        return regex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    senhaHash(erro: string = "HASH_INVALIDO"): Validador {
        const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
        return regex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    senhaForte(erro: string = "SENHA_FRACA"): Validador {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        //console.log(this.atributo)
        //console.log(this.objeto)
        return regex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    regex(regex: RegExp, erro: string): Validador {
        return regex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    adicionarErro(codigoOuErro: string | ErroValidacao): Validador {
        const erroBase =
            typeof codigoOuErro === "string" ? { codigo: codigoOuErro } : codigoOuErro
        const erro = {
            ...erroBase,
            valor: this.valor,
            atributo: this.atributo ?? undefined,
            objeto: this.objeto ?? undefined,
        }

        if (this.jaTemErro(erro)) return this
        return new Validador(this.valor, this.atributo, this.objeto, [
            ...this.erros,
            erro,
        ])
    }

    get valido(): boolean {
        return this.erros.length === 0
    }

    get invalido(): boolean {
        return !this.valido
    }

    lancarSeErro(): void | never {
        if (!this.erros.length) return
        throw this.erros
    }

    private jaTemErro(erro: ErroValidacao): boolean {
        return this.erros.some((e) => {
            return Object.keys(e).every((key) => {
                return e[key] === erro[key]
            })
        })
    }
}
