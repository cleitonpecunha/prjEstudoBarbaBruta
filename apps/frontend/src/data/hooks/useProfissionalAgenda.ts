import { Agendamento } from '@barbabrutal/core'
import { useCallback, useEffect, useState } from 'react'
//import useUsuario from './useUsuario'
import useAPI from './useAPI'
import useProfissionalUsuario from './useProfissionalUsuario'

export default function useProfissionalAgenda() {
    //const { usuario } = useUsuario()
    const { httpGet, httpDelete } = useAPI()
    const [data, setData] = useState<Date>(new Date())
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const { profissionalusuario } = useProfissionalUsuario()

    /*
    const carregarAgendamentos = useCallback(async () => {
        if (!usuario) return
        const dtString = data.toISOString().slice(0, 10)
        //console.log(`agendamentos/${usuario.id}/${dtString}`)
        const agendamentos = await httpGet(`agendamentos/${usuario.id}/${dtString}`)
        //console.log(agendamentos.length)
        setAgendamentos(agendamentos)
    }, [httpGet, usuario, data])
    */
    
    const carregarAgendamentos = useCallback(async () => {
        if (!profissionalusuario[0].profissional.id) return
        const dtString = data.toISOString().slice(0, 10)
        //console.log(`agendamentos/${usuario.id}/${dtString}`)
        //console.log(`agendamentos/${profissionalusuario[0].profissional.id}/${dtString}`)
        const agendamentos = await httpGet(`agendamentos/${profissionalusuario[0].profissional.id}/${dtString}`)
        //console.log(agendamentos.length)
        setAgendamentos(agendamentos)
    }, [httpGet, profissionalusuario, data])

    useEffect(() => {
        carregarAgendamentos()
    }, [carregarAgendamentos])

    async function excluirAgendamento(id: number) {
        await httpDelete(`agendamentos/${id}`)
        setAgendamentos(agendamentos.filter((a) => a.id !== id))
    }

    return {
        data,
        agendamentos,
        alterarData: setData,
        excluirAgendamento,
    }
}
