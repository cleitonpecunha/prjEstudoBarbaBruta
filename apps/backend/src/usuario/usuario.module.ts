import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioRepositorio } from './usuario.repositorio';
import { BcryptProvider } from './bcrypt.provider';
import { UsuarioMiddleware } from './usuario.middleware';

@Module({
  imports: [DbModule],
  controllers: [UsuarioController],
  providers: [UsuarioRepositorio, BcryptProvider, UsuarioMiddleware],
  exports: [UsuarioMiddleware, UsuarioRepositorio]
})
export class UsuarioModule {}
