import DiaSemana from "../model/DiaSemana";

export default interface RepositorioDiaSemana {
    
    //criar(diasemana: DiaSemana): Promise<void>

    buscarTodos(): Promise<DiaSemana[]>
}