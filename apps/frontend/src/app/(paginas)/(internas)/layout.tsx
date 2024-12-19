import ForcarUsuario from '@/components/shared/ForcarUsuario'
import Pagina from '@/components/shared/Pagina'
import { ProvedorAgendamento } from '@/data/contexts/ContextoAgendamento'

export default function Layout(props: any) {
    return (
        <ForcarUsuario>
            <ProvedorAgendamento>
                <Pagina>{props.children}</Pagina>
            </ProvedorAgendamento>
        </ForcarUsuario>
    )
}