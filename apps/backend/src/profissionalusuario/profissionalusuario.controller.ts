import { Controller, Get, Param } from '@nestjs/common';
import { ProfissionalusuarioPrisma } from './profissionalusuario.prisma';

@Controller('profissionaisusuarios')
export class ProfissionalusuarioController {
    
    constructor(private readonly repo: ProfissionalusuarioPrisma) {}

    @Get(':usuario')
    buscarProfissionalPorIdUsuario( @Param('usuario') usuario: string ) 
    {
      return this.repo.buscarProfissionalPorIdUsuario(+usuario);
    }
}
