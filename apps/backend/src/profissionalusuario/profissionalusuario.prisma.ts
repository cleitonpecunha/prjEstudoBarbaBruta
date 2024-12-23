import { Injectable } from '@nestjs/common';
import { ProfissionalUsuario, RepositorioProfissionalUsuario } from '@barbabrutal/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ProfissionalusuarioPrisma implements RepositorioProfissionalUsuario {
    constructor(private readonly prismaService: PrismaService) {}
    
    async criar(profissionalusuario: ProfissionalUsuario): Promise<void> {
        await this.prismaService.profissionalUsuario.create({
          data: {            
            usuario: { connect: { id: profissionalusuario.usuario.id } },
            profissional: { connect: { id: profissionalusuario.profissional.id } },            
          },
        });
    }
}
