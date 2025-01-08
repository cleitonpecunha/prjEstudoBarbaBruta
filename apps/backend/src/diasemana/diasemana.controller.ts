import { Controller, Get } from '@nestjs/common';
import { DiasemanaPrisma } from './diasemana.prisma';
import { BuscarDiaSemana } from '@barbabrutal/core';

@Controller('diassemana')
export class DiasemanaController {
  
  constructor(private readonly repo: DiasemanaPrisma) {}

  @Get()
  obterDiasSemana() {
    const casoDeUso = new BuscarDiaSemana(this.repo);
    return casoDeUso.executar();
  }
}
