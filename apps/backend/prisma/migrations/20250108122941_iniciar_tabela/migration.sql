-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "barbeiro" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "profissionais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "avaliacao" REAL NOT NULL,
    "quantidadeAvaliacoes" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "profissionaisusuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    CONSTRAINT "profissionaisusuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "profissionaisusuario_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "qtdeSlots" INTEGER NOT NULL,
    "imagemUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    CONSTRAINT "agendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horario" TEXT NOT NULL,
    "periodoDia" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "diassemana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ordemDiaSemana" INTEGER NOT NULL,
    "nomeDiaSemana" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "datasindisponivel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "periodoDia" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgendamentoToServico" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AgendamentoToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "agendamentos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AgendamentoToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "servicos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_nome_key" ON "profissionais"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "servicos_nome_key" ON "servicos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_horario_key" ON "horarios"("horario");

-- CreateIndex
CREATE UNIQUE INDEX "diassemana_ordemDiaSemana_key" ON "diassemana"("ordemDiaSemana");

-- CreateIndex
CREATE UNIQUE INDEX "diassemana_nomeDiaSemana_key" ON "diassemana"("nomeDiaSemana");

-- CreateIndex
CREATE UNIQUE INDEX "datasindisponivel_data_key" ON "datasindisponivel"("data");

-- CreateIndex
CREATE UNIQUE INDEX "_AgendamentoToServico_AB_unique" ON "_AgendamentoToServico"("A", "B");

-- CreateIndex
CREATE INDEX "_AgendamentoToServico_B_index" ON "_AgendamentoToServico"("B");
