import { Injectable } from '@nestjs/common';
import { NotificacionRepository } from '../../domain/repositories/notificacion.repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class NotificacionPrismaRepository implements NotificacionRepository {
  constructor(private prisma: PrismaService) {}

  async crear(data: any) {
    return this.prisma.notificaciones.create({
      data: {
        titulo: data.titulo,
        mensaje: data.mensaje,
        tipo: data.tipo,
        leido: false,
      },
    });
  }

  async listar() {
    return this.prisma.notificaciones.findMany({
      orderBy: { creado_at: 'desc' },
    });
  }

  async marcarLeido(id: number, leido: boolean) {
    return this.prisma.notificaciones.update({
      where: { id },
      data: { leido }
    });
  }

  async eliminar(id: number) {
    return this.prisma.notificaciones.delete({
      where: { id },
    });
  }
}
