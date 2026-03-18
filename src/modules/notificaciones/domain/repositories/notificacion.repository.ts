export abstract class NotificacionRepository {
  abstract crear(data: any): Promise<any>;
  abstract listar(): Promise<any[]>;
  abstract marcarLeido(id: number, leido: boolean): Promise<any>;
  abstract eliminar(id: number): Promise<any>;
}
