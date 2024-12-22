'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Usuario } from '@barbabrutal/core'
import cookie from 'js-cookie'

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
    const nomeCookie = 'barba-token'

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

    return (
        <ContextoSessao.Provider
            value={{
                carregando,
                token,
                usuario,
                criarSessao,
                limparSessao,
            }}
        >
            {props.children}
        </ContextoSessao.Provider>
    )
}
