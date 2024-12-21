
import { useCallback } from 'react'
import useSessao from './useSessao'

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE

export default function useAPI() {
    const { token } = useSessao()

    const httpGet = useCallback(
        async function (uri: string): Promise<any> {
            const path = uri.startsWith('/') ? uri : `/${uri}`

            const resp = await fetch(`${URL_BASE}${path}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return extrairDados(resp)
        },
        [token]
    )

    const httpPost = useCallback(
        async function (uri: string, body: any): Promise<any> {
            const path = uri.startsWith('/') ? uri : `/${uri}`
            const resp = await fetch(`${URL_BASE}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            })
            return extrairDados(resp)
        },
        [token]
    )
    const httpDelete = useCallback(
        async function (uri: string): Promise<any> {
            const path = uri.startsWith('/') ? uri : `/${uri}`
            const resp = await fetch(`${URL_BASE}${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            return extrairDados(resp)
        },
        [token]
    )

    async function extrairDados(resp: Response) {
        let conteudo = ''
        try {
            conteudo = await resp.text()
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }

    return { httpGet, httpPost, httpDelete }
}

 
/*
import useSessao from "./useSessao"

export default function useAPI() {

    const { token } = useSessao()

    const urlBase = process.env.NEXT_PUBLIC_API_URL

    async function extrairDados(resposta: Response) {
        let conteudo = ''
        try {
            conteudo = await resposta.text()
            //console.log(conteudo)
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }
    
    async function httpGet(caminho: string) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return extrairDados(resposta)
    }
    
    async function httpPost(caminho: string, body: any) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        //console.log(resposta)
        return extrairDados(resposta)
    }

    async function httpDelete(caminho: string) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const urlCompleta = `${urlBase}${uri}`

        const resposta = await fetch(urlCompleta, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        //console.log(resposta)
        return extrairDados(resposta)
    }
    
    return { httpGet, httpPost, httpDelete }
} 
*/