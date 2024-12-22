import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoPrisma } from './agendamento.prisma';
import { DbModule } from 'src/db/db.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioMiddleware } from 'src/usuario/usuario.middleware';

@Module({
  imports: [UsuarioModule, DbModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoPrisma]
})
export class AgendamentoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsuarioMiddleware).forRoutes(AgendamentoController);
  }
}
