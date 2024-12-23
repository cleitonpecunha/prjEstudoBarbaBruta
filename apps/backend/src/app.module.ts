import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ProfissionalModule } from './profissional/profissional.module';
import { ServicoModule } from './servico/servico.module';
import { ProfissionalusuarioModule } from './profissionalusuario/profissionalusuario.module';

@Module({
  imports: [UsuarioModule, DbModule, AgendamentoModule, ProfissionalModule, ServicoModule, ProfissionalusuarioModule],
  controllers: [AppController],  
})
export class AppModule {}
