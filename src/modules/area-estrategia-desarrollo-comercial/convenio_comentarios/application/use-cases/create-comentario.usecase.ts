import { Injectable } from '@nestjs/common';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';
import { ConvenioComentario } from '../../domain/entities/comentario.entity';
import { CreateComentarioDto } from '../dto/create-comentario.dto';

@Injectable()
export class CreateComentarioUseCase {
  constructor(private readonly comentarioRepository: ComentarioRepository) {}

  async execute(dto: CreateComentarioDto): Promise<ConvenioComentario> {
    const comentario = new ConvenioComentario(
      0,
      dto.convenioId,
      dto.usuarioId,
      dto.comentario,
      new Date(),
    );

    return this.comentarioRepository.create(comentario);
  }
}
