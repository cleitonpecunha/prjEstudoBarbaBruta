export default class DateUtils {
    
     // hojeComHoraZerada
     static hoje() {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return hoje
    }

    static proximosDias(quantidade: number, incluirHoje: boolean = true): Date[] {
        const dias = []
        const hoje = DateUtils.hoje()

        if (incluirHoje) {
            dias.push(hoje)
        }

        for (let i = 1; i < quantidade; i++) {
            const dia = new Date(hoje.getTime() + 86400000 * i)
            dias.push(dia)
        }

        return dias
    }

    // new Date(), '09:45'
    static aplicarHorario(data: Date, horario: string): Date {
        const novaData = new Date(data)
        const partes = horario.split(':')
        novaData.setHours(parseInt(partes[0]!), parseInt(partes[1]!))
        return novaData
    }

    static formatarData(data: Date): string {
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    static formatarDataEHora(data: Date): string {
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
    }

    static hojeComHora() {
        const hoje = new Date()
        return hoje
    }

    static hojeComHoraZerada() {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return hoje
    }

    static dataHoje(qtde: number, incluirHoje: boolean = true) {
        const dias = []
        const hoje = DateUtils.hojeComHora()

        if (incluirHoje) {
            dias.push(hoje)
        }

        for (let i = 1; dias.length < qtde; i++) {
            const dia = new Date(hoje)
            dia.setDate(hoje.getDate() + i)
            dias.push(dia)
        }

        return dias
    }
    
    /* 
    static hojeComHora() {
        const hoje = new Date()
        return hoje
    }
    
    static hojeComHoraZerada() {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return hoje
    }

    static proximosDias(qtde: number, incluirHoje: boolean = true) {
        const dias = []
        const hoje = DateUtils.hojeComHoraZerada()

        if (incluirHoje) {
            dias.push(hoje)
        }

        for (let i = 1; dias.length < qtde; i++) {
            const dia = new Date(hoje)
            dia.setDate(hoje.getDate() + i)
            dias.push(dia)
        }

        return dias
    }

    static dataHoje(qtde: number, incluirHoje: boolean = true) {
        const dias = []
        const hoje = DateUtils.hojeComHora()

        if (incluirHoje) {
            dias.push(hoje)
        }

        for (let i = 1; dias.length < qtde; i++) {
            const dia = new Date(hoje)
            dia.setDate(hoje.getDate() + i)
            dias.push(dia)
        }

        return dias
    }

    static aplicarHorario(data: Date, horario: string) {
        const novaData = new Date(data)
        const [hora, minuto] = horario.split(':').map(Number)
        novaData.setHours(hora, minuto, 0, 0)
        return novaData
    }

    static formatarData(data: Date, localizacao: string = 'pt-BR'): string {
        return data.toLocaleDateString(localizacao, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    static formatarDataEHora(data: Date, localizacao: string = 'pt-BR'): string {
        return data.toLocaleDateString(localizacao, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
    } 
    */
}

//console.log(DateUtils.proximosDias(7))
//console.log(DateUtils.aplicarHorario(new Date(),'13:45').toLocaleTimeString())