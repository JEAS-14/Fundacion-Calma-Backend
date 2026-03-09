import { Injectable } from '@nestjs/common';
import { ConvenioRepository } from '../../domain/repositories/convenio.repository';
import { Convenio } from '../../domain/entities/convenio.entity';

@Injectable()
export class GetConvenioUseCase {
  constructor(private readonly convenioRepository: ConvenioRepository) {}

  async execute(id: number): Promise<Convenio | null> {
    return this.convenioRepository.findById(id);
  }
}
