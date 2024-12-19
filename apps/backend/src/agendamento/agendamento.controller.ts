import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { UsuarioLogado } from 'src/usuario/usuario.decorator';
import { AgendamentoPrisma } from './agendamento.prisma';
import { Agendamento, 
         BuscarAgendamentosCliente,
         BuscarAgendaProfissionalPorDia,
         ExcluirAgendamento,
         NovoAgendamento,
         ObterHorariosOcupados,
         Usuario } from '@barbabrutal/core';

@Controller('agendamentos')
export class AgendamentoController {
    constructor(private readonly repo: AgendamentoPrisma) {}
    
    // novoAgendamento
    @Post()
    async novoAgendamento(
        @Body() dados: Agendamento,
        @UsuarioLogado() usuario: Usuario,
    ) {
        if (dados.usuario.id !== usuario.id) {
            throw new HttpException('Usuário não autorizado!',401)
        }
        const agendamento: Agendamento = { ...dados, data: new Date(dados.data) };
        const casoDeUso = new NovoAgendamento(this.repo);
        await casoDeUso.executar({ agendamento, usuario });
    }

    // buscarAgendamentosCliente
    @Get()
    buscarAgendamentosCliente(@UsuarioLogado() usuario: Usuario) {
        const casoDeUso = new BuscarAgendamentosCliente(this.repo);
        return casoDeUso.executar(usuario);
    }
    
    // buscarAgendaProfissionalPorDia
    @Get(':profissional/:data')
    buscarAgendaProfissionalPorDia(
        @Param('profissional') profissional: string,
        @Param('data') data: string,
    ) {
        const casoDeUso = new BuscarAgendaProfissionalPorDia(this.repo);
        return casoDeUso.executar({
        profissional: +profissional,
        data: new Date(data),
        });
    }
    
    // buscarOcupacaoPorProfissionalEData
    @Get('ocupacao/:profissional/:data')
    buscarOcupacaoPorProfissionalEData(
        @Param('profissional') profissional: string,
        @Param('data') dataParam: string,
    ) {
        const casoDeUso = new ObterHorariosOcupados(this.repo);
        return casoDeUso.executar({
        profissionalId: +profissional,
        data: new Date(dataParam),
        });
    }
    
    // excluirAgendamento
    @Delete(':id')
    async excluirAgendamento(
        @Param('id') id: string,
        @UsuarioLogado() usuario: Usuario,
    ) {
        if (!usuario.barbeiro) {
            throw new HttpException('Usuário não autorizado!',401)
        }
        const casoDeUso = new ExcluirAgendamento(this.repo);
        await casoDeUso.executar({id: +id, usuario });
    }
}
