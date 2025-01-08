import { Module } from '@nestjs/common';
import { DiasemanaController } from './diasemana.controller';
import { DiasemanaPrisma } from './diasemana.prisma';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [DiasemanaController],
  providers: [DiasemanaPrisma]
})
export class DiasemanaModule {}
