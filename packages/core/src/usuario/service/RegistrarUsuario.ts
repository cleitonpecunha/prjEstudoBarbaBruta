//import { Usuario } from "../../../dist";
import Usuario from '../model/Usuario'
import CasoDeUso from "../../shared/CasoDeUso";
import ProvedorCriptografia from "../provider/ProvedorCriptografia";
import RepositorioUsuario from "../provider/RepositorioUsuario";

export default class RegistrarUsuario implements CasoDeUso<Usuario, void>  {
    
    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly provedorCriptografia: ProvedorCriptografia) 
    {}
    
    async executar(usuario: Usuario): Promise<any> {
        
        const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

        if (usuarioExistente) {
            throw new Error('Usuário já exsiste');
        }

        const senhaCriptografada = await this.provedorCriptografia.criptografar(usuario.senha)
        const novoUsuario = {
            ...usuario,
            senha: senhaCriptografada,
            barbeiro: false
        }

        await this.repo.salvar(novoUsuario);
    }    
}