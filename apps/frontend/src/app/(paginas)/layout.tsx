import '@mantine/core/styles.css'
import { ProvedorMensagem } from "@/data/contexts/ContextoMensagem";
import { ProvedorSessao } from "@/data/contexts/ContextoSessao";
import { MantineProvider } from "@mantine/core";
import { ProvedorUsuario } from '@/data/contexts/ContextoUsuario';

export default function Layout(props: any) {
    return (
        <MantineProvider defaultColorScheme="dark">
            <ProvedorMensagem>
                <ProvedorSessao>
                    <ProvedorUsuario>{props.children}</ProvedorUsuario>
                </ProvedorSessao>
            </ProvedorMensagem>
        </MantineProvider>
    )
}