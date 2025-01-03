import { useState } from 'react'
import { cn } from '@/lib/utils'
import { IconX } from '@tabler/icons-react'
import { AgendaUtils, DateUtils } from '@barbabrutal/core'

export interface HorariosInputProps {
    data: Date
    qtdeHorarios: number
    horariosOcupados: string[]
    dataMudou(data: Date): void
}

export default function HorariosInput(props: HorariosInputProps) {
    
    const [horaHover, setHoraHover] = useState<string | null>(null)
    
    const { horariosOcupados } = props
    
    const { manha, tarde, noite } = AgendaUtils.horariosDoDia()

    const horaSelecionada = props.data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    })

    /* // data atual de hoje
    const dataHojeAtual = DateUtils.hoje().getDate()
    
    // hora da data atual de hoje
    const horaData = DateUtils.dataHoje(1)        
    const horaDataHojeAtual = horaData.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit'})

    // data selecionada
    const dataAgendamento = props.data.getDate() */

    function obterPeriodo(horario: string | null, qtde: number): string[] {
        
        if (!horario) return []
        
        const horarios = manha.includes(horario) ? manha : tarde.includes(horario) ? tarde : noite
        
        const indice = horarios.findIndex((h) => horario == h)        
        
        return horarios.slice(indice, indice + qtde)
    }    

    function renderizarHorario(horario: string) {
        
        const periodo = obterPeriodo(horaHover, props.qtdeHorarios)

        //console.log(periodo)
        //const hora = periodo.map((i => i[4]))
        //console.log(hora)
        
        const periodoSelecionado = obterPeriodo(horaSelecionada, props.qtdeHorarios)

        //console.log(periodoSelecionado)        
        /* periodoSelecionado.map(function(elemento, índice, array){
            console.log(elemento.replace(":",""));
            console.log(índice);
            //console.log(array);
            //return elemento;
        }, 80); */
        /* periodoSelecionado.map((elemento) => {
            console.log(elemento.replace(":",""));
        }); */

        const temHorarios = periodo.length === props.qtdeHorarios

        //console.log(temHorarios)
        //console.log(periodo.length === props.qtdeHorarios)
        
        const destacarHora = temHorarios && periodo.includes(horario)

        //console.log(destacarHora)             
        
        /* // hora invalida da agenda
        const horaInvalida = periodoSelecionado.map((horarioAgenda) => {            
            if(dataAgendamento === dataHojeAtual) {          
                if(horarioAgenda.replace(":","") >= horaDataHojeAtual.replace(":","") ) {
                    return 1
                } else {
                    return 0
                }
            }            
        });
        //console.log(periodoSelecionado)
        //console.log(horaInvalida)        
        const temHoraInvalida = horaInvalida.includes(0)
        //console.log(temHoraInvalida) */
        
        const selecionado =
            periodoSelecionado.length === props.qtdeHorarios && periodoSelecionado.includes(horario)

        //console.log(selecionado)
        //console.log(periodoSelecionado.length)
        //console.log(periodoSelecionado.length === props.qtdeHorarios)
        
        const naoSelecionavel = !temHorarios && periodo.includes(horario)

        //console.log(!temHorarios)
        //console.log(periodo.includes(horario))
        //console.log(naoSelecionavel)
        
        const periodoBloqueado =
            periodo.includes(horario) && periodo.some((h) => horariosOcupados.includes(h))
        
        //console.log(periodoBloqueado)

        const ocupado = horariosOcupados.includes(horario)

        //console.log(ocupado)

        return (
            <div
                key={horario}
                className={cn(
                    'flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none',
                    {
                        'bg-yellow-400': destacarHora,
                        'bg-red-500': naoSelecionavel || periodoBloqueado,
                        'text-white bg-green-500': selecionado,
                        'cursor-not-allowed bg-zinc-800': ocupado,
                    }
                )}
                onMouseEnter={(_) => setHoraHover(horario)}
                onMouseLeave={(_) => setHoraHover(null)}
                onClick={() => {
                    if (naoSelecionavel) return
                    if (ocupado || periodoBloqueado) return
                    //if (temHoraInvalida) return 
                    props.dataMudou(DateUtils.aplicarHorario(props.data, horario))
                }}
            >
                <span
                    className={cn('text-sm text-zinc-400', {
                        'text-black font-semibold': destacarHora,
                        'text-white font-semibold': selecionado,
                        'text-zinc-400 font-semibold': ocupado,
                    })}
                >
                    {naoSelecionavel || periodoBloqueado || ocupado ? (
                        <IconX size={18} className="text-white" />
                    ) : (
                        horario
                    )}
                </span>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">Horários Disponíveis</span>
            <div className="flex flex-col gap-3 select-none">
                <span className="text-xs uppercase text-zinc-400">Manhã</span>
                <div className="grid grid-cols-8 gap-1">{manha.map(renderizarHorario)}</div>

                <span className="text-xs uppercase text-zinc-400">Tarde</span>
                <div className="grid grid-cols-8 gap-1">{tarde.map(renderizarHorario)}</div>

                <span className="text-xs uppercase text-zinc-400">Noite</span>
                <div className="grid grid-cols-8 gap-1">{noite.map(renderizarHorario)}</div>
            </div>
        </div>
    )
}
