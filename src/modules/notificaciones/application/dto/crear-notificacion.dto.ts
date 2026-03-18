export class CrearNotificacionDto {
  titulo: string;
  mensaje: string;
  tipo: 'comunicado' | 'alerta';
  imagen?: string;
}
