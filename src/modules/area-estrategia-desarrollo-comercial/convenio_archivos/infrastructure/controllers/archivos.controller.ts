import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CreateArchivoDto } from '../../application/dto/create-archivo.dto';
import { GetArchivosUseCase } from '../../application/use-cases/get-archivos.usecase';
import { CreateArchivoUseCase } from '../../application/use-cases/create-archivo.usecase';
import { DeleteArchivoUseCase } from '../../application/use-cases/delete-archivo.usecase';
import { Archivo } from '../../domain/entities/archivo.entity';

@Controller('convenio-archivos')
export class ArchivosController {
  constructor(
    private readonly getArchivos: GetArchivosUseCase,
    private readonly createArchivo: CreateArchivoUseCase,
    private readonly deleteArchivo: DeleteArchivoUseCase,
  ) {}

  @Get('convenio/:convenioId')
  async findByConvenio(
    @Param('convenioId') convenioId: string,
  ): Promise<Archivo[]> {
    return this.getArchivos.execute(Number(convenioId));
  }

  @Post()
  async create(@Body() dto: CreateArchivoDto): Promise<Archivo> {
    return this.createArchivo.execute(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteArchivo.execute(Number(id));
  }
}
