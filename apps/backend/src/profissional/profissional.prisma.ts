import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { RepositorioProfissional, Profissional } from '@barbabrutal/core';

@Injectable()
export class ProfissionalPrisma implements RepositorioProfissional {
    constructor(private readonly prisma: PrismaService) {}
  
    buscarTodos(): Promise<Profissional[]> {
      return this.prisma.profissional.findMany();
    }
  }
