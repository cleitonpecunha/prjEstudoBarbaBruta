import Horario from "../model/Hoarario";

export default interface RepositorioHorario {
    
    //criar(horaagendamento: Horario): Promise<void>

    buscarTodos(): Promise<Horario[]>
}