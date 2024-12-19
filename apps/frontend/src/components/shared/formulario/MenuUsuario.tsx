import useSessao from "@/data/hooks/useSessao"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { IconCalendar, IconHome, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import { DateUtils } from "@barbabrutal/core"

export default function MenuUsuario() {
    
    const { usuario, encerrarSessao } = useSessao()

    const data = DateUtils.dataHoje(1)

    function retonarSaudacaoUsuario() {
        let saudacaoUsuario;
        const horaData = data.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit'})

        if (horaData.substring(0, 2) >= '00' && horaData.substring(0, 2) <= '11') {
            saudacaoUsuario = 'Bom Dia'
        } else if (horaData.substring(0, 2) >= '12' && horaData.substring(0, 2) <= '17') {
            saudacaoUsuario = 'Boa Tarde'
        } else {
            saudacaoUsuario = 'Boa Noite'
        }

        return (
            <div className="text-zinc-400 text-sm">
                {saudacaoUsuario}
            </div>
        )
    }

    return usuario ? (
        
        <DropdownMenu>

            <DropdownMenuTrigger>
                <div className="flex items-center gap-3">
                    
                    <div className="flex flex-col items-end"> 
                        {retonarSaudacaoUsuario()}
                        <span className="font-bold uppercase">{usuario?.nome}</span>
                        <span className="text-zinc-400 text-xs">{usuario?.email}</span>
                    </div>
                    
                    <div className="bg-zinc-700 w-10 h-10 p-1 rounded-full">
                        <Image src="/avatar.png" width={40} height={40} alt="Avatar" />
                    </div>

                </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent>
                
                <DropdownMenuItem>
                    <Link href="/" className="flex gap-2">
                        <IconHome size={18} />
                        <span>Início</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                    <Link href="/agendamento" className="flex gap-2">
                        <IconCalendar size={18} />
                        <span>Agendar</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={encerrarSessao} className="flex gap-2 text-red-500">
                    <IconLogout size={18} />
                    <span>Logout</span>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    ) : null
}