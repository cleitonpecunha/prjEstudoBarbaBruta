import { v4 as uuid, validate } from 'uuid'

export default class Id {
    readonly valor: string
    
    constructor(valor?: string) {
        this.valor = valor ?? uuid()
        if(!validate(this.valor)) throw new Error('Id inválido')
    }
}