import DiaSemanaAgendamento from "../model/DiaSemanaAgendamento";

export default interface RepositorioDiaSemanaAgendamento {
    criar(diasemanaagendamento: DiaSemanaAgendamento): Promise<void>    
}