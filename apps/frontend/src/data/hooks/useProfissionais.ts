'use client'

import { useCallback, useEffect, useState } from "react"
import useAPI from "./useAPI"
import { Profissional } from "@barbabrutal/core"

export default function useProfissionais() {
    
    const { httpGet } = useAPI()
    const [profissionais, setProfissionais] = useState<Profissional[]>([])

    const carregarProfissionais = useCallback(
        async function () {        
        const profissionais = await httpGet('profissionais')
        setProfissionais(profissionais)
    }, 
        [httpGet]
    )

    useEffect(() => {
        carregarProfissionais()
    }, [carregarProfissionais])
    
    return {
        profissionais,
    }
}