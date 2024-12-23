import { Module } from '@nestjs/common';
import { ProfissionalusuarioController } from './profissionalusuario.controller';
import { ProfissionalusuarioPrisma } from './profissionalusuario.prisma';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ProfissionalusuarioController],
  providers: [ProfissionalusuarioPrisma]
})
export class ProfissionalusuarioModule {}
