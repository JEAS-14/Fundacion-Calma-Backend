import { Injectable } from '@nestjs/common';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';

@Injectable()
export class DeleteComentarioUseCase {
  constructor(private readonly comentarioRepository: ComentarioRepository) {}

  async execute(id: number): Promise<void> {
    return this.comentarioRepository.delete(id);
  }
}
