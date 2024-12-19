import { Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Mensagem } from '@barbabrutal/core'
import useMensagem from '@/data/hooks/useMensagem'

export default function Mensagens() {
    const { mensagens, excluir } = useMensagem()

    function renderizarMensagem(msg: Mensagem) {
        
        const xIcon = <IconX size={30} />
        const checkIcon = <IconCheck size={30} />
        
        return (
            <Notification
                key={msg.texto}
                title={msg.tipo === 'sucesso' ? 'Efetuado com sucesso' : 'Ocorreu um erro'}
                icon={msg.tipo === 'sucesso' ? checkIcon : xIcon}
                color={msg.tipo === 'sucesso' ? 'teal' : 'red'}
                onClose={() => excluir(msg)}
                className="z-50"
            >
                {JSON.stringify(msg.texto)}
            </Notification>
        )
    }

    return <div className="flex flex-col gap-2">{mensagens.map(renderizarMensagem)}</div>
}
