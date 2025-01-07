import HoraAgendamento from "../model/HoraAgendamento";

export default interface RepositorioHoraAgendamento {
    criar(horaagendamento: HoraAgendamento): Promise<void>    
}