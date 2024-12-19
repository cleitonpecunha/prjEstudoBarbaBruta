'use client'

import { cn } from "@/lib/utils"
import { AgendaUtils, DateUtils } from "@barbabrutal/core"
import { IconX } from "@tabler/icons-react"
import { useState } from "react"

export interface CampoHorario_oldProps extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "value" | "onChange" > {
    label?: string
    value: Date
    qtdeHorarios: number
    horariosOcupados: string[]
    onChange: ( value: Date ) => void
}

export default function CampoHorario_old(props: CampoHorario_oldProps) {

    const [ horarioHover, setHorarioHover ] = useState<string | null>(null)
    const { manha, tardeNoite } = AgendaUtils.horariosDoDia()
    //const { horariosOcupados } = props
    
    const horaSelecionado = props.value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})

    function obterIntervaloDeHorarios(horario: string | null, qtde: number)  {

        if(!horario) return []
        
        const horarios = manha.includes(horario) ? manha : tardeNoite

        const indice = horarios.indexOf(horario) 
        
        return horarios.slice(indice, indice + qtde)
    }    
    
    function renderizarHorario(horario: string) {

        const intervaloHover = obterIntervaloDeHorarios(horarioHover, props.qtdeHorarios)
        const destaque = intervaloHover.includes(horario)
        const horariosSuficientes = intervaloHover.length === props.qtdeHorarios
        const naoSelecionavel = horarioHover && !horariosSuficientes && intervaloHover.includes(horario)
        const intervaloSelecionado = obterIntervaloDeHorarios(horaSelecionado, props.qtdeHorarios)
        const selecionado = intervaloSelecionado.length === props.qtdeHorarios && intervaloSelecionado.includes(horario)

        return (
            
            <div className={cn(
                      'flex justify-center items-center rounded h-8 bg-zinc-800',
                      {
                        'bg-green-500 text-white font-semibold': selecionado,
                        'bg-yellow-400 text-black font-semibold': destaque,
                        'bg-red-500 text-white font-semibold cursor-not-allowed': naoSelecionavel,
                    })}
                onMouseEnter={() => setHorarioHover(horario)}
                onMouseLeave={() => setHorarioHover(null)}
                onClick={() => {
                    if(naoSelecionavel) return
                    props.onChange(DateUtils.aplicarHorario(props.value, horario))
                }}
            >                
                {naoSelecionavel ? <IconX size={18}/> : <span>{horario}</span>}

            </div>
        )
    }

    return (
        
        <div className="flex flex-col gap-3 select-none">

            {/* <span className="text-xl">{horaSelecionado}</span>
            <span className="text-xl">{horarioHover ?? '--:--'}</span>
            <span className="text-xl">{obterIntervaloDeHorarios(horarioHover, props.qtdeHorarios).join(' - ')}</span> */}
            
            {props.label && <span className="uppercase text-zinc-400 font-light">{props.label}</span>}

            <div className="flex flex-col gap-3">
                
                <span className="uppercase text-zinc-400 font-light">Manhã</span>
                <div className="grid grid-cols-8 gap-1">
                    {manha.map(renderizarHorario)}
                </div>

                <span className="uppercase text-zinc-400 font-light">Tarde & Noite</span>
                <div className="grid grid-cols-8 gap-1">
                    {tardeNoite.map(renderizarHorario)}
                </div>

            </div>

        </div>
    ) 
}