import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import { NotificacionesController } from './presentation/controllers/notificaciones.controller';

import { NotificacionRepository } from './domain/repositories/notificacion.repository';
import { NotificacionPrismaRepository } from './infrastructure/repositories/prisma-notificacion.repository';

import { CrearNotificacionUseCase } from './application/use-cases/crear-notificacion.use-case';
import { ListarNotificacionesUseCase } from './application/use-cases/listar-notificaciones.use-case';
import { MarcarLeidoUseCase } from './application/use-cases/marcar-leido.use-case';
import { EliminarNotificacionUseCase } from './application/use-cases/eliminar-notificacion.use-case';

@Module({
  controllers: [NotificacionesController],
  providers: [
    PrismaService,

    {
      provide: NotificacionRepository,
      useClass: NotificacionPrismaRepository,
    },

    CrearNotificacionUseCase,
    ListarNotificacionesUseCase,
    MarcarLeidoUseCase,
    EliminarNotificacionUseCase,
  ],
})
export class NotificacionesModule {}
