import { DateUtils } from "@barbabrutal/core"
import CampoDia from "./CampoDia"
import CampoHorario from "./CampoHorario"

export interface CampoDataHoraProps extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "value" | "onChange" > {
    label?: string
    value: Date | null
    qtdeHorarios: number
    onChange: ( value: Date) => void
    horariosOcupados: string[]
    apenasNoFuturo?: boolean
}

export default function CampoDataHora(props: CampoDataHoraProps) {
    
    const data = props.value ?? DateUtils.hojeComHoraZerada()

    /* function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        //console.log(e.target.value)
        //props.onChange(new Date(e.target.value))
        props.onChange(new Date(`${e.target.value}:00Z`)) // seleciona a data/hora do local no timezone
    } */

    return (
        <div className="flex flex-col gap-6">

            {/* <div className="flex gap-2">
                <span>{data.toLocaleDateString('pt-BR')}</span>
                <span>{data.toLocaleTimeString('pt-BR')}</span>
            </div> */}
            
            {/* {props.label && <span>{props.label}</span>}
            
            <input 
                {...props}
                type="datetime-local"
                value={props.value?.toISOString().substring(0, 16) ?? ''}
                onChange={onChange}
                min={props.apenasNoFuturo ? new Date().toISOString().substring(0, 16) : undefined}
            /> */}

            <CampoDia
                label="Dias Disponíveis"
                value={data}
                onChange={props.onChange}
            />
            <CampoHorario
                label="Horários Disponíveis"
                value={data}
                qtdeHorarios={props.qtdeHorarios}
                horariosOcupados={props.horariosOcupados}
                onChange={props.onChange}
            />

        </div>
    ) 
}