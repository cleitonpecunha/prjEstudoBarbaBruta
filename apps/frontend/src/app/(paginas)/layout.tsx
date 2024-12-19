import '@mantine/core/styles.css'
import { ProvedorMensagem } from "@/data/contexts/ContextoMensagem";
import { ProvedorSessao } from "@/data/contexts/ContextoSessao";
import { MantineProvider } from "@mantine/core";

export default function Layout(props: any) {
    return (
        <MantineProvider defaultColorScheme="dark">
            <ProvedorMensagem>
                <ProvedorSessao>
                    {props.children}
                </ProvedorSessao>
            </ProvedorMensagem>
        </MantineProvider>
    )
}