import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../infrastructure/prisma/prisma.service';
import { ArchivoRepository } from '../../domain/repositories/archivo.repository';
import { Archivo } from '../../domain/entities/archivo.entity';

@Injectable()
export class PrismaArchivoRepository extends ArchivoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Archivo): Promise<Archivo> {
    const archivo = await this.prisma.convenio_archivos.create({
      data: {
        convenio_id: data.convenioId,
        subido_por_id: data.subidoPorId,
        nombre_archivo: data.nombreArchivo,
        url_archivo: data.urlArchivo,
      },
    });

    return new Archivo(
      archivo.id,
      archivo.convenio_id as number,
      archivo.subido_por_id as number,
      archivo.nombre_archivo,
      archivo.url_archivo,
      archivo.fecha_subida ?? new Date(),
    );
  }

  async findByConvenio(convenioId: number): Promise<Archivo[]> {
    const archivos = await this.prisma.convenio_archivos.findMany({
      where: {
        convenio_id: convenioId,
      },
      orderBy: {
        fecha_subida: 'desc',
      },
    });

    return archivos.map(
      (a) =>
        new Archivo(
          a.id,
          a.convenio_id as number,
          a.subido_por_id as number,
          a.nombre_archivo,
          a.url_archivo,
          a.fecha_subida ?? new Date(),
        ),
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.convenio_archivos.delete({
      where: { id },
    });
  }
}
