import CasoDeUso from "../../shared/CasoDeUso"
import Usuario from "../model/Usuario"
import ProvedorCriptografia from "../provider/ProvedorCriptografia"
import RepositorioUsuario from "../provider/RepositorioUsuario"

export default class LoginUsuario {
    constructor(
        private readonly repoUsuario: RepositorioUsuario,
        private readonly provedorCrptografia: ProvedorCriptografia
    ) {}

    async executar(email: string, senha: string): Promise<Usuario | null> {
        const usuario = await this.repoUsuario.buscarPorEmail(email)
        if (!usuario) throw new Error('Usuário não encontrado')

        const senhaCorreta = await this.provedorCrptografia.comparar(senha, usuario.senha)
        if (!senhaCorreta) throw new Error('Senha incorreta')

        delete usuario.senha
        return usuario
    }
}

/* 
type Entrada = {
    email: string
    senha: string
}

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {

    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly provedorCriptografia: ProvedorCriptografia
    ) {}
    
    async executar(entrada: Entrada): Promise<Usuario> {
        const { email, senha } = entrada

        const usuario = await this.repo.buscarPorEmail(email)
        if (!usuario) throw new Error('Usuário não encontrado')

        const mesmaSenha = await this.provedorCriptografia.comparar(senha, usuario.senha)
        if (!mesmaSenha) throw new Error('Senha incorreta')

        delete usuario.senha
        return usuario
    }
} 
*/