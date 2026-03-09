import { Injectable } from '@nestjs/common';
import { ArchivoRepository } from '../../domain/repositories/archivo.repository';
import { Archivo } from '../../domain/entities/archivo.entity';
import { CreateArchivoDto } from '../dto/create-archivo.dto';

@Injectable()
export class CreateArchivoUseCase {
  constructor(private readonly archivoRepository: ArchivoRepository) {}

  async execute(dto: CreateArchivoDto): Promise<Archivo> {
    const archivo = new Archivo(
      0,
      dto.convenioId,
      dto.subidoPorId,
      dto.nombreArchivo,
      dto.urlArchivo,
      new Date(),
    );

    return this.archivoRepository.create(archivo);
  }
}
