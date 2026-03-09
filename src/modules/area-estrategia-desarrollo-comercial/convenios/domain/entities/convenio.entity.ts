export class Convenio {
  constructor(
    public id: number,
    public areaId: number,
    public entidadNombre: string,
    public logoUrl: string | null,
    public ruc: string,
    public rubro: string,
    public contactoNombre: string,
    public telefonoContacto: string,
    public estado: string,
    public fechaExpiracion: Date,
    public creadorId: number,
    public fechaCreacion: Date,
  ) {}
}
