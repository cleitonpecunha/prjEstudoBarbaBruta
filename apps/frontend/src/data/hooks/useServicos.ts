'use client'

import useAPI from './useAPI'
import { useCallback, useEffect, useState } from 'react'
import { Servico } from '@barbabrutal/core'

export default function useServicos() {
    
    const { httpGet } = useAPI()
    const [servicos, setServicos] = useState<Servico[]>([])

    const carregarServicos = useCallback(
        async function () {        
        const servicos = await httpGet('servicos')
        setServicos(servicos)
    }, 
        [httpGet]
    )

    useEffect(() => {
        carregarServicos()
    }, [carregarServicos])

    return {
        servicos,
    }
}