import { useEffect, useState } from "react"
import useAPI from './useAPI'
import useSessao from "./useSessao"
import { useRouter, useSearchParams } from "next/navigation"
//import useMensagem from "./useMensagem"

export default function useFormAuth() {

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    
    function alternarModo() {
        setModo(modo == 'login' ? 'cadastro' : 'login')
    }

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [telefone, setTelefone] = useState('')

    // hook
    const { httpPost } = useAPI()
    const { usuario, iniciarSessao } = useSessao()
    //const { adicionarErro, adicionarSucesso} = useMensagem()

    const router = useRouter()

    const param = useSearchParams()

    useEffect(() => {
        if(usuario?.email) {
            const destino = param.get('destino') as string            
            router.push(destino ? destino : '/')
        }
    }, [usuario, router, param])

    async function login() {
        const token = await httpPost('auth/login', { email, senha })

        //console.log('Login:',{email,senha,token})
        //console.log(token)
        iniciarSessao(token)

        //console.log(token)
        //if (usuario?.id) {
        //    adicionarSucesso('Seja Bem Vindo!')
        //} else {
        //    adicionarErro('Usuário e/ou senha inválido.')
        //}

        //limparFormulario()        
    }

    async function registar() {
        await httpPost('auth/registrar', { nome, email, senha, telefone })
        //console.log('Cadastro:',{nome, email,senha, telefone})
    }

    function limparFormulario() {
        setNome('')
        setEmail('')
        setSenha('')
        setTelefone('')
        setModo('login')
    }

    async function submeterFormulario() {
        if (modo == 'login') {
            await login()
        } else {
            await registar()
            await login()
        }
        limparFormulario()
    }

    // export metodos
    return {
        modo,
        nome,
        email,
        senha,
        telefone,
        alterarNome: setNome,
        alterarEmail: setEmail,
        alterarSenha: setSenha,
        alterarTelefone: setTelefone,
        alternarModo,
        submeterFormulario,
        limparFormulario
    }
}
