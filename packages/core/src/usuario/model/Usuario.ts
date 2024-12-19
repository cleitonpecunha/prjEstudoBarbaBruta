export default interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
    telefone?: string;
    barbeiro?: boolean;
}

/* import Entidade, { EntidadeProps } from "../../shared/Entidade"
import NomePessoa from "../../shared/NomePessoa"
import Email from "../../shared/Email"
import SenhaHash from "../../shared/SenhaHash"

export interface UsuarioProps extends EntidadeProps {
    nome?: string
    email?: string
    senha?: string
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
    readonly nome: NomePessoa
    readonly email: Email
    readonly senha: SenhaHash | null

    constructor(props: UsuarioProps) {
        super(props)
        this.nome = new NomePessoa(props.nome!, "Nome", "Usuário")        
        this.email = new Email(props.email!, "E-Mail", "Usuário")        
        this.senha = props.senha ? new SenhaHash(props.senha, "Senha", "Usuário") : null
    }

    semSenha(): Usuario {
        return this.clone({ senha: null })
    }
} */