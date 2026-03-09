import { Injectable } from '@nestjs/common';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';
import { ConvenioComentario } from '../../domain/entities/comentario.entity';

@Injectable()
export class GetComentariosUseCase {
  constructor(private readonly comentarioRepository: ComentarioRepository) {}

  async execute(convenioId: number): Promise<ConvenioComentario[]> {
    return this.comentarioRepository.findByConvenio(convenioId);
  }
}
