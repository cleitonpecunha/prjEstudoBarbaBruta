import { PrismaClient } from '@prisma/client';
import { profissionais, servicos, Usuario, ProfissionalUsuario, horasAgendamento, diasSemanaAgendamento } from '@barbabrutal/core';

const prisma = new PrismaClient();

///* 
async function seed() { 
  
  /*
  //
  // Inserir os profissionais
  //
   
  await prisma.profissional.deleteMany();
  await prisma.profissional.createMany({ data: profissionais as any });
  
  //
  // Inserir os serviços
  //
  
  await prisma.servico.deleteMany();
  await prisma.servico.createMany({ data: servicos as any });
  
  //
  // Gerar os registro de usuário
  //
  
  // senha é... #Senha123
  const senha = '$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6';
  const usuarios: Usuario[] = [
    {
      nome: 'Cleiton Galego',
      email: 'galego@zmail.com',
      senha,
      telefone: '(11) 99999-9999',
      barbeiro: false,
    },
    {
      nome: 'Marcão Machadada',
      email: 'marcao@barbabrutal.app',
      senha,
      telefone: '(11) 99999-9999',
      barbeiro: true,
    },
  ];
  await prisma.usuario.deleteMany();
  await prisma.usuario.createMany({ data: usuarios as any });
  
  //
  // Inserir na ProfissionalUsuario
  //
   
  await prisma.profissionalUsuario.create({ 
    data: { 
      usuario: { connect: { id: 2 } },
      profissional: { connect: { id: 1 } },
    }
  });
  */

  //
  // Inserir Horas de Agendamento
  //
   
  await prisma.horaAgendamento.deleteMany();
  await prisma.horaAgendamento.createMany({ data: horasAgendamento as any });

  //
  // Inserir Dia da Semana de Agendamento
  //
   
  await prisma.diaSemanaAgendamento.deleteMany();
  await prisma.diaSemanaAgendamento.createMany({ data: diasSemanaAgendamento as any });

}

seed(); 
//*/