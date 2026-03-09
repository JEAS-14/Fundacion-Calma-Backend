import { Injectable } from '@nestjs/common';
import { ConvenioRepository } from '../../domain/repositories/convenio.repository';
import { Convenio } from '../../domain/entities/convenio.entity';
import { UpdateConvenioDto } from '../dto/update-convenio.dto';

@Injectable()
export class UpdateConvenioUseCase {
  constructor(private readonly convenioRepository: ConvenioRepository) {}

  async execute(id: number, dto: UpdateConvenioDto): Promise<Convenio> {
    return this.convenioRepository.update(id, dto);
  }
}
