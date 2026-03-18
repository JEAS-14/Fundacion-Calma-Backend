import { Inject, Injectable } from '@nestjs/common';
import { CrearNotificacionDto } from '../dto/crear-notificacion.dto';
import { NotificacionRepository } from '../../domain/repositories/notificacion.repository';

@Injectable()
export class CrearNotificacionUseCase {
  constructor(
    @Inject(NotificacionRepository)
    private repo: NotificacionRepository,
  ) {}

  async execute(data: CrearNotificacionDto) {
    return this.repo.crear(data);
  }
}
