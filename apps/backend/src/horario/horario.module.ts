import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioPrisma } from './horario.prisma';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [HorarioController],
  providers: [HorarioPrisma]
})
export class HorarioModule {}
