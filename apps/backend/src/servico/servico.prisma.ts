import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { RepositorioServico, Servico } from '@barbabrutal/core';

@Injectable()
export class ServicoPrisma implements RepositorioServico {
    constructor(private readonly prisma: PrismaService) {}
  
    buscarTodos(): Promise<Servico[]> {
      return this.prisma.servico.findMany();
    }
  }
