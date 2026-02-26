import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Instanciamos Prisma (luego lo pondremos en su propio módulo para mejores prácticas)
const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  
  async login(email: string, pass: string) {
    // 1. Buscamos al usuario en la base de datos por su correo
    const usuario = await prisma.usuarios.findUnique({
      where: { email: email },
      include: { roles: true } // Traemos también los datos de su rol
    });

    // 2. Si no existe el usuario, lanzamos un error 401
    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 3. Verificamos la contraseña 
    // (OJO: Por ahora haremos una comparación simple. En el siguiente paso instalaremos 'bcrypt' para hacerlo seguro)
    if (usuario.password_hash !== pass) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 4. Si todo está bien, le quitamos la contraseña a los datos por seguridad y devolvemos el resto
    const { password_hash, ...datosUsuario } = usuario;
    
    return {
      mensaje: 'Login exitoso',
      usuario: datosUsuario
    };
  }
}