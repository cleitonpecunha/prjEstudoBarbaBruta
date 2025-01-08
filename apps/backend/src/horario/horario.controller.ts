import { Controller, Get } from '@nestjs/common';
import { HorarioPrisma } from './horario.prisma';
import { BuscarHorario } from '@barbabrutal/core';

@Controller('horarios')
export class HorarioController {
    
  constructor(private readonly repo: HorarioPrisma) {}

  @Get()
  obterHorarios() {
    const casoDeUso = new BuscarHorario(this.repo);
    return casoDeUso.executar();
  }
}
