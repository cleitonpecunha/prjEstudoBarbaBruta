import useAgendamento from '@/data/hooks/useAgendamento'
import DiaInput from './DiaInput'
import HorariosInput from './HorariosInput'

export interface DataInputProps {
    data: Date
    quantidadeDeSlots: number
    dataMudou: (data: Date) => void
    horariosOcupados: string[]
}

export default function DataInput(props: DataInputProps) {
    const { data, quantidadeDeSlots, dataMudou } = props
    const { horariosOcupados } = useAgendamento()

    return (
        <div className="flex flex-col gap-10">
            <DiaInput data={data} dataMudou={dataMudou} />
            <HorariosInput 
                horariosOcupados={horariosOcupados} 
                data={data} 
                qtdeHorarios={quantidadeDeSlots} 
                dataMudou={dataMudou} 
            />
        </div>
    )
}
