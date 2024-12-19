import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsuario, RegistrarUsuario, Usuario } from '@barbabrutal/core';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly repo: UsuarioPrisma,
        private readonly provedorCrptografia: BcryptProvider) 
    {}

    @Post('registrar')
    async registrar(@Body() usuario: Usuario) {

        const casoDeUso = new RegistrarUsuario(this.repo, this.provedorCrptografia);
        await casoDeUso.executar(usuario);

    };

    @Post('login')
    async login(@Body() dadosEntrada: {email: string, senha: string}) {
        
        const casoDeUso = new LoginUsuario(this.repo, this.provedorCrptografia);
        const usuario = await casoDeUso.executar({email: dadosEntrada.email, senha: dadosEntrada.senha});
       
        //return JSON.stringify(usuario);
        //return usuario as any;
       
        const chaveValidacao = process.env.JWT_SECRET;
        return jwt.sign(usuario, chaveValidacao, { expiresIn: '1d' });

    };
}
