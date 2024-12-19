
import ForcarAutenticacao from '@/components/shared/formulario/ForcarAutenticacao'
import Pagina from '@/components/shared/Pagina'

export default function Layout(props: any) {
    return (
        <ForcarAutenticacao>
            <Pagina>{props.children}</Pagina>
        </ForcarAutenticacao>
    )
}