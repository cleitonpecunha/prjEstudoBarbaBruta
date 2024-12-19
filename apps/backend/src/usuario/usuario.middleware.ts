import { Usuario } from '@barbabrutal/core';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { UsuarioRepositorio } from './usuario.repositorio';

@Injectable()
export class UsuarioMiddleware implements NestMiddleware {
  
  constructor(private readonly repoUsuario: UsuarioRepositorio) {}
  
  async use(req: any, res: any, next: () => void) {    
    //console.log('estou no middleware....')
    try {
      
      const token = req.headers.authorization?.replace('Bearer ', '');
      //console.log('token',token)
      if (!token) {
        throw new HttpException('Token não informado!', 401);
      }
  
      const payload = jwt.verify(token,process.env.JWT_SECRET!) as Usuario;
      
      if (!payload) {
        throw new HttpException('Token inválido!', 401);
      }
      
      const usuario = await this.repoUsuario.buscarPorEmail(payload.email);
      
      delete usuario.senha;
      
      if (!usuario) {
        throw new HttpException('Token inválido!', 401);
      }
  
      req.usuario = usuario;    
      next();
    } catch (error) {
        throw new HttpException('Token inválido!', 401);
    }
  }
}
