import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Horario, RepositorioHorario } from '@barbabrutal/core';

@Injectable()
export class HorarioPrisma implements RepositorioHorario {
    
    constructor(private readonly prisma: PrismaService) {}
    
    buscarTodos(): Promise<Horario[]> {
        return this.prisma.horario.findMany();
    }    
}
