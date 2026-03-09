import { Injectable } from '@nestjs/common';
import { ConvenioRepository } from '../../domain/repositories/convenio.repository';
import { Convenio } from '../../domain/entities/convenio.entity';

@Injectable()
export class GetConveniosUseCase {
  constructor(private readonly convenioRepository: ConvenioRepository) {}

  async execute(): Promise<Convenio[]> {
    return this.convenioRepository.findAll();
  }
}
