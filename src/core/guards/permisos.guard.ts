import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermisosService, Acciones } from '../services/permisos.service';

export const PERMISO_KEY = 'permiso';
export const AREA_KEY = 'areaId';

export interface PermisoMetadata {
  accion: Acciones;
  areaId?: number;
}

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permisosService: PermisosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permiso = this.reflector.get<PermisoMetadata>(PERMISO_KEY, context.getHandler());
    if (!permiso) {
      return true; // Si no hay metadata de permiso, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const usuarioId = request.user?.id; // JwtStrategy.validate() retorna { id, email, rol }

    if (!usuarioId) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Obtener areaId de metadata o de request
    let areaId = permiso.areaId;
    if (!areaId) {
      // Intentar obtener de params, body, o query
      areaId = request.params?.areaId || request.body?.areaId || request.query?.areaId;
    }

    const tienePermiso = await this.permisosService.tienePermiso(
      usuarioId,
      permiso.accion,
      areaId,
    );

    if (!tienePermiso) {
      throw new ForbiddenException('No tienes permisos para realizar esta acción');
    }

    return true;
  }
}