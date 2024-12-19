import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsuario, RegistrarUsuario, Usuario } from '@barbabrutal/core';
import { UsuarioRepositorio } from './usuario.repositorio';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly repoUsuario: UsuarioRepositorio,
        private readonly provedorCrptografia: BcryptProvider) 
    {}

    @Post('login')
  async login(@Body() dados: { email: string; senha: string },): Promise<string> 
    {
    const casoDeUso = new LoginUsuario(this.repoUsuario, this.provedorCrptografia);
    
    const usuario = await casoDeUso.executar(dados.email, dados.senha);
    
    const segredo = process.env.JWT_SECRET!;
    
    return jwt.sign(usuario, segredo, { expiresIn: '15d' });
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario): Promise<void> {
    const casoDeUso = new RegistrarUsuario(this.repoUsuario, this.provedorCrptografia);
    await casoDeUso.executar(usuario);
  }
    
    /* 
    @Post('login')
    async login(@Body() dadosEntrada: {email: string, senha: string}) {
        
        const casoDeUso = new LoginUsuario(this.repo, this.provedorCrptografia);
        const usuario = await casoDeUso.executar({email: dadosEntrada.email, senha: dadosEntrada.senha});
        
        //return JSON.stringify(usuario);
        //return usuario as any;
        
        const chaveValidacao = process.env.JWT_SECRET;
        return jwt.sign(usuario, chaveValidacao, { expiresIn: '1d' });
        
    };
    
    @Post('registrar')
    async registrar(@Body() usuario: Usuario) {

        const casoDeUso = new RegistrarUsuario(this.repo, this.provedorCrptografia);
        await casoDeUso.executar(usuario);

    }; 
    */
}
