'use client'
import AgendadoComSucesso from '@/components/agendamento/AgendadoComSucesso'
import Cabecalho from '@/components/shared/Cabecalho'

export default function Page() {
    return (
        <div className="flex flex-col">
            <Cabecalho
                titulo="Agendamento de Serviços"
                descricao="Seu horário está garantido e será um prazer te atender!"
            />
            <div className="container py-10">
                <AgendadoComSucesso />
            </div>
        </div>
    )
}