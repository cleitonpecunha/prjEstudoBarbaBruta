import CasoDeUso from '../../shared/CasoDeUso'
import DiaSemana from '../model/DiaSemana'
import RepositorioDiaSemana from '../provider/RepositorioDiaSemana'

export default class BuscarDiaSemana implements CasoDeUso<void, DiaSemana[]> {
    constructor(private readonly repo: RepositorioDiaSemana) {}

    async executar(): Promise<DiaSemana[]> {
        return this.repo.buscarTodos()
    }
}