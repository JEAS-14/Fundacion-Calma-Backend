import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, passwordPlana: string) {
    // 1. Buscar el usuario por email en el esquema core
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email: email },
      include: { roles: true } // Traemos el rol para saber sus permisos
    });

    // 2. Si no existe, lanzamos error
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 3. Comparar la contraseña plana con el hash de la base de datos
    const passwordValida = await bcrypt.compare(passwordPlana, usuario.password_hash);
    
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 4. Si todo está bien, preparamos la información (Payload) para el Token
    const payload = { 
      sub: usuario.id, 
      email: usuario.email,
      rol: usuario.roles?.nombre // Guardamos el rol directamente en el pasaporte
    };

    // 5. Emitimos y retornamos el JWT
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre_completo,
        email: usuario.email,
        rol: usuario.roles?.nombre
      }
    };
  }
}