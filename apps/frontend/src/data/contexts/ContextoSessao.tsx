'use client'

import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import cookie from 'js-cookie'
import { Usuario } from "@barbabrutal/core";

interface ContextoSessaoProps { 
    usuarioTeste: Usuario | null  
    numero: number
    carregando: boolean
    token: string | null
    usuario: Usuario | null
    criarSessao: (token: string) => void
    limparSessao: () => void
}

/* 
interface Sessao {
    token: string | null
    usuario: Usuario | null
} 
*/

interface ContextoSessaoProps {
    carregando: boolean
    token: string | null
    usuario: Usuario | null
    criarSessao: (token: string) => void
    limparSessao: () => void
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any)
export default ContextoSessao

export function ProvedorSessao(props: any) {

    const nomeCookie = '_barbabrutal_token'

    const [carregando, setCarregando] = useState(true)
    const [token, setToken] = useState<string | null>(null)
    const [usuario, setUsuario] = useState<Usuario | null>(null)    
    
    const carregarSessao = useCallback(function () {
        try {
            setCarregando(true)
            const { token, usuario } = obterSessao()
            setToken(token)
            setUsuario(usuario)
        } finally {
            setCarregando(false)
        }
    }, [])

    function criarSessao(token: string) {
        cookie.set(nomeCookie, token, { expires: 1 })
        carregarSessao()
    }

    function limparSessao() {
        cookie.remove(nomeCookie)
        setUsuario(null)
        setToken(null)
    }

    function obterSessao(): { token: string | null; usuario: Usuario | null } {
        const token = cookie.get(nomeCookie)
        if (!token) {
            return { token: null, usuario: null }
        }

        try {
            const decodificado: any = jwtDecode(token)
            const expirado = decodificado.exp! < Date.now() / 1000

            if (expirado) {
                cookie.remove(nomeCookie)
                return { token: null, usuario: null }
            }

            return {
                token,
                usuario: {
                    id: decodificado.id,
                    nome: decodificado.nome,
                    email: decodificado.email,
                    barbeiro: decodificado.barbeiro,
                    telefone: decodificado.telefone,
                },
            }
        } catch (e) {
            cookie.remove(nomeCookie)
            return { token: null, usuario: null }
        }
    }

    useEffect(() => {
        carregarSessao()
    }, [carregarSessao])
    
    /* 
    const [sessao, setSessao] = useState<Sessao>({ token: null, usuario: null })

    const carregarSessao = useCallback(function () {
        try {
            setCarregando(true)
            const sessao = obterSessao()
            setSessao(sessao)
        } finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        carregarSessao()
    }, [carregarSessao])

    function criarSessao(token: string) {
        cookie.set(nomeCookie, token, { expires: 1 })
        const sessao = obterSessao()
        setSessao(sessao)
    }

    function limparSessao() {
        cookie.remove(nomeCookie)
        setSessao({ token: null, usuario: null })
    }
    
    function obterSessao(): Sessao {
        const token = cookie.get(nomeCookie)

        if (!token) {
            return { token: null, usuario: null }
        }

        try {
            const payload: any = jwtDecode(token)
            const valido = payload.exp! > Date.now() / 1000

            if (!valido) {
                return { token: null, usuario: null }
            }

            return {
                token,
                usuario: {
                    id: payload.id,
                    nome: payload.nome,
                    email: payload.email,
                    barbeiro: payload.barbeiro,
                    telefone: payload.telefone,
                },
            }
        } catch (e) {
            return { token: null, usuario: null }
        }
    } 
    */

    return (
        <ContextoSessao.Provider 
            value={{ 
                usuarioTeste: {
                    id: 10,
                    nome: 'TestTube',
                    email: 'teste@email.com.br',
                    barbeiro: false,
                    telefone: '11 1 1111-1111' 
                },
                numero: 1000,
                carregando,
                token,
                usuario,
                //token: sessao.token,
                //usuario: sessao.usuario,
                criarSessao,
                limparSessao,
            }}
        >
            {props.children}
        </ContextoSessao.Provider>
    )
}
