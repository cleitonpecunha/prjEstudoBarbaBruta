import { DateUtils } from "@barbabrutal/core"

export interface CampoDiaProps extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "value" | "onChange" > {
    label?: string
    value: Date
    onChange: ( value: Date ) => void
    //apenasNoFuturo?: boolean
}

export default function CampoDia(props: CampoDiaProps) {    

    /* function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        //console.log(e.target.value)
        //props.onChange(new Date(e.target.value))
        props.onChange(new Date(`${e.target.value}:00Z`)) // seleciona a data/hora do local no timezone
    } */

    function renderizarDia(data: Date) {
        
        const selecionado = props.value.getDate() === data.getDate()

        return (
            <div key={data.getTime()} 
                 className={`
                    flex-1 flex flex-col items-center gap-2 py-4
                    ${selecionado ? 'bg-yellow-400 text-black' : 'text-zinc-300'}
                `}
                onClick={() => props.onChange(data)}
            >
                
                <div className=" flex items-center gap-1">
                    <span className="text-2xl font-black">
                        {data.getDate()}
                    </span>
                    <span className="uppercase font-light text-xs">
                        {data.toLocaleString('pt-BR', {month: 'short'}).slice(0,3)}
                    </span>
                </div>
                
                <div className={`
                        uppercase font-light text-xs rounded-full py-0.5 px-3
                        ${selecionado ? 'bg-black/10' : 'bg-white/10'}
                    `}>
                    {data.toLocaleString('pt-BR', {weekday: 'short'}).slice(0,3)}
                </div>
            </div>
    )
}

    return (
        <div className="flex flex-col overflow-hidden gap-3">
            
            {props.label && <span className="uppercase text-zinc-400 font-light">{props.label}</span>}
            
            {/* <input 
                {...props}
                type="datetime-local"
                value={props.value?.toISOString().substring(0, 16) ?? ''}
                onChange={onChange}
                min={props.apenasNoFuturo ? new Date().toISOString().substring(0, 16) : undefined}
            /> */}

            <div className="flex bg-zinc-800 rounded-lg">
                {DateUtils.proximosDias(7).filter(dia => dia.getDay() !== 0).map(dia => (
                    renderizarDia(dia)
                ))}
            </div>

        </div>
    ) 
}