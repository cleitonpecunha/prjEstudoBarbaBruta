import { Controller } from '@nestjs/common';
import { ProfissionalusuarioPrisma } from './profissionalusuario.prisma';

@Controller('profissionalusuario')
export class ProfissionalusuarioController {
    constructor(private readonly repo: ProfissionalusuarioPrisma) {}
}
