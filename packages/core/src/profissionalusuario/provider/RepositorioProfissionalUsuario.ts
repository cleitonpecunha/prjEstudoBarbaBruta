import ProfissionalUsuario from "../model/ProfissionalUsuario"

export default interface RepositorioProfissionalUsuario {
    
    criar(profissionalusuario: ProfissionalUsuario): Promise<void>
}