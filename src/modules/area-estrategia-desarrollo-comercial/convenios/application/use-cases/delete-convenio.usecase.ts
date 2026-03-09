import { Injectable } from '@nestjs/common';
import { ConvenioRepository } from '../../domain/repositories/convenio.repository';

@Injectable()
export class DeleteConvenioUseCase {
  constructor(private readonly convenioRepository: ConvenioRepository) {}

  async execute(id: number): Promise<void> {
    return this.convenioRepository.delete(id);
  }
}
