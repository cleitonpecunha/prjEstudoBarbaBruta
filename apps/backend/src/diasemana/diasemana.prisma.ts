import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { DiaSemana, RepositorioDiaSemana } from '@barbabrutal/core';

@Injectable()
export class DiasemanaPrisma implements RepositorioDiaSemana {

    constructor(private readonly prisma: PrismaService) {}
    
    buscarTodos(): Promise<DiaSemana[]> {
        return this.prisma.diaSemana.findMany();
    }    
}
