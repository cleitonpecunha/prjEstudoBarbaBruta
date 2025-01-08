import Horario from "../model/Horario";

export default interface RepositorioHorario {
    
    //criar(horaagendamento: Horario): Promise<void>

    buscarTodos(): Promise<Horario[]>
}