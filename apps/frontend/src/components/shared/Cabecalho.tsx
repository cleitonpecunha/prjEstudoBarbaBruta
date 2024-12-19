'use client'

import Link from 'next/link'
import Logo from './Logo'
import useSessao from '@/data/hooks/useSessao'
import MenuUsuario from './formulario/MenuUsuario'

export default function Cabecalho() {

    const { usuario } = useSessao()

    return (
        <header className="flex items-center h-24 bg-black/60 self-stretch">
            
            <nav className="flex items-center justify-between container">
                
                <Logo />

                {/* <div>{usuario?.nome ?? 'Vazio'}</div> */}
                
                <div>{usuario ? 
                    <MenuUsuario /> : 
                    <Link href="/entrar">Entrar</Link>}
                </div>
                
                {/* <div>
                    <Link href="/entrar">Entrar</Link>
                </div> */}

            </nav>

        </header>
    )
}