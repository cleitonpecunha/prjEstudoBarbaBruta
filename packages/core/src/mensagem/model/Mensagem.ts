export default interface Mensagem {
    tipo: 'erro' | 'sucesso'
    texto: string
    tempo?: number
}