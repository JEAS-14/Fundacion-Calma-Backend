import { Module } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

import { CreateArchivoUseCase } from './application/use-cases/create-archivo.usecase';
import { GetArchivosUseCase } from './application/use-cases/get-archivos.usecase';
import { DeleteArchivoUseCase } from './application/use-cases/delete-archivo.usecase';

import { ArchivoRepository } from './domain/repositories/archivo.repository';
import { PrismaArchivoRepository } from './infrastructure/repositories/prisma-archivo.repository';

import { ArchivosController } from './infrastructure/controllers/archivos.controller';

@Module({
  controllers: [ArchivosController],
  providers: [
    PrismaService,

    CreateArchivoUseCase,
    GetArchivosUseCase,
    DeleteArchivoUseCase,

    {
      provide: ArchivoRepository,
      useClass: PrismaArchivoRepository,
    },
  ],
})
export class ConvenioArchivosModule {}
