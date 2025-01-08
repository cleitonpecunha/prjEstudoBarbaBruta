import CasoDeUso from '../../shared/CasoDeUso'
import Horario from '../model/Hoarario'
import RepositorioHorario from '../provider/RepositorioHorario'

export default class BuscarHorario implements CasoDeUso<void, Horario[]> {
    constructor(private readonly repo: RepositorioHorario) {}

    async executar(): Promise<Horario[]> {
        return this.repo.buscarTodos()
    }
}