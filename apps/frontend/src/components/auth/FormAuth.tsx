'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../shared/Logo'
import useFormAuth from '@/data/hooks/useFormAuth'
import CampoInputSenha from '../shared/formulario/CampoInputSenha'
import CampoInputEmail from '../shared/formulario/CampoInputEmail'
import CampoInputTelefone from '../shared/formulario/CampoInputTelefone'
import CampoInputText from '../shared/formulario/CampoInputText'
import useSessao from '@/data/hooks/useSessao'
import Mensagem from '../shared/Mensagem'

export default function FormAuth() {

    // hook
    const { nome,
            alterarNome,
            email, 
            alterarEmail,
            senha,
            alterarSenha,
            telefone,
            alterarTelefone,
            modo, 
            alternarModo, 
            submeterFormulario} = useFormAuth()

    const { usuario } = useSessao()

    return (
        <div className="flex justify-center items-center h-screen">
            <Image src="/banners/principal.webp" fill alt="Banner" />
            <div className="
                    flex flex-col justify-center items-center
                    absolute top-0 left-0 w-full h-full gap-10
                    bg-black/80
                ">
                                
                {/* teste para exiubir o usuário logado */}
                <div>{usuario?.nome ?? 'Vazio'}</div>
                
                <Logo />

                <div>
                    {modo == 'login' ? (
                        <h1 className="text-2xl font-thin">Seja bem vindo</h1>
                        ) : (
                        <h1 className="text-2xl font-thin">Cadastro</h1>    
                    )}
                </div>
                
                {/* input´s de login/cadastrar conforme o modo*/}
                <div className="flex flex-col gap-4 w-80">
                    {/* <div>{process.env.NEXT_PUBLIC_API_URL ?? 'Vazio'}</div> */}
                    
                    {modo == 'cadastro' && (
                        <CampoInputText 
                            placeholder="Nome" 
                            value={nome} 
                            onChangeText={alterarNome}/>                        
                    )}
                    <CampoInputEmail 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={alterarEmail}
                    /> 
                    <CampoInputSenha 
                        placeholder="Senha" 
                        value={senha} 
                        onChangeText={alterarSenha}
                    />
                    {modo == 'cadastro' && (
                        <CampoInputTelefone 
                            placeholder="Telefone" 
                            value={telefone} 
                            onChangeText={alterarTelefone}
                        />
                    )}                    
                
                    {/* monta os botões conforme o "modo" */}
                    <div className="flex gap-2">
                        
                        <button onClick={submeterFormulario} className="button flex-1 bg-green-600">
                            {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                        </button>
                        <Link href="/" className="button flex-1 flex justify-center">Cancelar</Link>

                    </div>

                    <div className="flex mt-6">
                        
                        <button onClick={alternarModo} className="flex-1 button-outline">
                            {modo == 'login' ? (
                                <div>
                                    Ainda não tem conta?{' '}
                                    <span className="text-yellow-400 font-bold">Cadastre-se!</span> 
                                </div>                               
                            ) : (
                                <div>
                                    Já tem conta?{' '}
                                    <span className="text-yellow-400 font-bold"> Entre na plataforma!</span> 
                                </div>
                            )}
                        </button>
                                                
                    </div>
                
                </div>                               

            </div>

            <div className="absolute bottom-10 right-10">
                <Mensagem />
            </div>
            
        </div>
    )
}