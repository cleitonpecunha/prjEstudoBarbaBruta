import Agendamento from '../model/Agendamento'

export default interface RepositorioAgendamento {
    criar(agendamento: Agendamento): Promise<void>    
    buscarPorEmail(email: string): Promise<Agendamento[]>
    buscarPorProfissionalEData(profissional: number, data: Date): Promise<Agendamento[]>
    excluir(id: number): Promise<void>
    /*
    criar(agendamento: Agendamento): Promise<void>
    buscarPorId(id: number): Promise<Agendamento | null>
    buscarPorEmail(email: string): Promise<Agendamento[]>
    buscarPorProfissionalEData(profissional: number, data: Date): Promise<Agendamento[]>
    excluir(id: number): Promise<void>
    */
}
