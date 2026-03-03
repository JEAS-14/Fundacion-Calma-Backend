export class UsuarioEntity {
  id: number;
  nombre_completo: string;
  apellido_completo: string;
  email: string;
  password_hash: string;
  puesto?: string | null;
  estado?: string | null;
  rol_id?: number | null;
  telefono?: string | null;
  foto_url?: string | null;
  rol?: any; // Relación con roles

  constructor(data: Partial<UsuarioEntity> | any) {
    Object.assign(this, data);
  }
}
