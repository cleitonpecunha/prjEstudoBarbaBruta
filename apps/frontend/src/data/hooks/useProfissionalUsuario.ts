import { useCallback, useEffect, useState } from "react"
import useAPI from "./useAPI"
import useUsuario from "./useUsuario"
import { ProfissionalUsuario } from "@barbabrutal/core"

export default function useProfissionalUsuario() {
    const { usuario } = useUsuario()
    const { httpGet } = useAPI()
    const [profissionalusuario, setProfissionalUsuario] = useState<ProfissionalUsuario[]>([])

    const carregarProfissionalUsuario = useCallback(async () => {
        if (!usuario) return
        //console.log(`agendamentos/${usuario.id}/${dtString}`)
        const profissionalusuario = await httpGet(`profissionaisusuarios/${usuario.id}`)
        //console.log(agendamentos.length)
        setProfissionalUsuario(profissionalusuario)
    }, [httpGet, usuario])

    useEffect(() => {
        carregarProfissionalUsuario()
    }, [carregarProfissionalUsuario])
    
    return {        
        profissionalusuario,        
    }
}