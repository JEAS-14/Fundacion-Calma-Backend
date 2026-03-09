import { Archivo } from '../entities/archivo.entity';

export abstract class ArchivoRepository {
  abstract create(archivo: Archivo): Promise<Archivo>;

  abstract findByConvenio(convenioId: number): Promise<Archivo[]>;

  abstract delete(id: number): Promise<void>;
}
