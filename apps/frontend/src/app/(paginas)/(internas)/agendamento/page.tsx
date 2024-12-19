'use client'

import FormularioAgendamento from "@/components/agendamento/FormularioAgendamento"
import CabecalhoComTitulo from "@/components/shared/CabecalhoComTitulo"

export default function Page() {

    return (
        <div className="flex flex-col gap-5">
            <CabecalhoComTitulo 
                titulo="Agendamento de Serviços" 
                descricao="Seja atendido exatamento no horário marcado."
            />
            <div className="container y-10">               
                <FormularioAgendamento/>
            </div>
        </div>
    )
}