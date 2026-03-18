import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CrearNotificacionUseCase } from '../../application/use-cases/crear-notificacion.use-case';
import { CrearNotificacionDto } from '../../application/dto/crear-notificacion.dto';
import { ListarNotificacionesUseCase } from '../../application/use-cases/listar-notificaciones.use-case';
import { EliminarNotificacionUseCase } from '../../application/use-cases/eliminar-notificacion.use-case';
import { MarcarLeidoUseCase } from '../../application/use-cases/marcar-leido.use-case';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private crearNotificacionUseCase: CrearNotificacionUseCase,
    private listarNotificacionesUseCase: ListarNotificacionesUseCase,
    private eliminarNotificacionUseCase: EliminarNotificacionUseCase,
    private marcarLeidoUseCase: MarcarLeidoUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CrearNotificacionDto) {
    return this.crearNotificacionUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listarNotificacionesUseCase.execute();
  }

  @Patch(':id/leido')
  marcarLeido(@Param('id') id: string, @Body() body: any) {
    return this.marcarLeidoUseCase.execute(Number(id), body.leido);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.eliminarNotificacionUseCase.execute(Number(id));
  }
}
