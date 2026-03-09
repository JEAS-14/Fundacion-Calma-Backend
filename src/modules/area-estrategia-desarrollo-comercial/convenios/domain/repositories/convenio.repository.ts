import { Convenio } from '../entities/convenio.entity';

export abstract class ConvenioRepository {
  abstract create(convenio: Convenio): Promise<Convenio>;

  abstract findAll(): Promise<Convenio[]>;

  abstract findById(id: number): Promise<Convenio | null>;

  abstract update(id: number, convenio: Partial<Convenio>): Promise<Convenio>;

  abstract delete(id: number): Promise<void>;
}
