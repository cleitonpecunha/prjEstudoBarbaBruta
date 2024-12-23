import Usuario from '../../usuario/model/Usuario'
import Profissional from '../../profissional/model/Profissional'

export default interface ProfissionalUsuario {
    id: number    
    usuario: Usuario
    profissional: Profissional
}
