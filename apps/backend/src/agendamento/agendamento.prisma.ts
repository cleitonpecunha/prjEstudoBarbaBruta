import { Injectable } from '@nestjs/common';
import { Agendamento, RepositorioAgendamento } from '@barbabrutal/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AgendamentoPrisma implements RepositorioAgendamento {
  constructor(private readonly prismaService: PrismaService) {}

  async criar(agendamento: Agendamento): Promise<void> {
    await this.prismaService.agendamento.create({
      data: {
        data: agendamento.data,
        usuario: { connect: { id: agendamento.usuario.id } },
        profissional: { connect: { id: agendamento.profissional.id } },
        servicos: {
          connect: agendamento.servicos.map((servico) => ({ id: servico.id })),
        },
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Agendamento[]> {
    return this.prismaService.agendamento.findMany({
      where: {
        usuario: {
          email: email,
        },
        data: {
          gte: new Date(),
        },
      },
      include: {
        servicos: true,
        profissional: true,
        usuario: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  async buscarPorProfissionalEData(
    profissional: number,
    data: Date,
  ): Promise<Agendamento[]> {
    const ano = data.getFullYear();
    const mes = data.getUTCMonth();
    const dia = data.getUTCDate();

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

    const resultado: any = await this.prismaService.agendamento.findMany({
      where: {
        profissionalId: profissional,
        data: {
          gte: inicioDoDia,
          lte: fimDoDia,
        },
      },
      include: { servicos: true, usuario: true },
    });

    return resultado;
  }

  async excluir(id: number): Promise<void> {
    await this.prismaService.agendamento.delete({
      where: {
        id: id,
      },
      include: {
        servicos: true,
      },
    });
  }
}


/*
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import Agendamento from '@barbabrutal/core/src/agendamento/model/Agendamento';
import RepositorioAgendamento from '@barbabrutal/core/src/agendamento/provider/RepositorioAgendamento';

@Injectable()
export class AgendamentoPrisma implements RepositorioAgendamento {  
    
  constructor(private readonly prisma: PrismaService) {}
  
    async criar(agendamento: Agendamento): Promise<void> {
    await this.prisma.agendamento.create({
      data: {
        data: agendamento.data,
        usuario: { connect: { id: agendamento.usuario.id } },
        profissional: { connect: { id: agendamento.profissional.id } },
        servicos: {
          connect: agendamento.servicos.map((servico) => ({ id: servico.id })),
        },
      },
    });
  }

  buscarPorId(id: number): Promise<Agendamento | null> {
    return this.prisma.agendamento.findUnique({
      where: { id },
      include: {
        usuario: { select: { id: true, nome: true, email: true } },
        profissional: { select: { id: true, nome: true } },
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Agendamento[]> {
    const agendamentos = await this.prisma.agendamento.findMany({
      where: { usuario: { email }, data: { gte: new Date() } },
      include: {
        usuario: { select: { id: true, nome: true, email: true } },
        profissional: { select: { id: true, nome: true } },
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
      },
      orderBy: { data: 'desc' },
    });

    return agendamentos.map((agendamento) => {
      delete agendamento.usuarioId;
      delete agendamento.profissionalId;
      return agendamento;
    });
  }

  buscarPorProfissionalEData(
    profissional: number,
    data: Date,
  ): Promise<Agendamento[]> {
    const ano = data.getFullYear();
    const mes = data.getUTCMonth();
    const dia = data.getUTCDate();

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

    return this.prisma.agendamento.findMany({
      where: {
        profissionalId: profissional,
        data: { gte: inicioDoDia, lte: fimDoDia },
      },
      include: {
        usuario: { select: { id: true, nome: true, email: true } },
        profissional: { select: { id: true, nome: true } },
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
      },
    });
  }

  async excluir(id: number): Promise<void> {
    await this.prisma.agendamento.delete({
      where: { id },
      include: { servicos: true },
    });
  }
}
*/
