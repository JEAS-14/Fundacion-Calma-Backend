import { Injectable, Inject, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IUsuarioRepository } from '../../domain/repositories/usuario.repository';
import { USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository';
import { RegisterDto } from '../dto/register.dto';
import { RolesFundacion } from '../../domain/enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, passwordPlana: string) {
    // 1. Buscar el usuario por email
    const usuario = await this.usuarioRepository.findByEmail(email);

    // 2. Si no existe, lanzamos error
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (usuario.estado && usuario.estado !== 'ACTIVO') {
      throw new UnauthorizedException('Usuario inactivo');
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
      rol: usuario.rol?.nombre,
    };

    // 5. Emitimos y retornamos el JWT
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre_completo,
        email: usuario.email,
        rol: usuario.rol?.nombre,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const configuredDomains = (process.env.ALLOWED_EMAIL_DOMAINS || '')
      .split(',')
      .map((domain) => domain.trim().toLowerCase())
      .filter(Boolean);
    const emailDomain = registerDto.email.split('@')[1]?.toLowerCase();
    if (configuredDomains.length > 0 && (!emailDomain || !configuredDomains.includes(emailDomain))) {
      throw new BadRequestException(
        `El correo debe pertenecer a uno de estos dominios: ${configuredDomains.join(', ')}`,
      );
    }

    // 1. Verificar que el email no exista
    const usuarioExistente = await this.usuarioRepository.findByEmail(registerDto.email);
    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Hash de la contraseña
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const rolPracticante = await this.usuarioRepository.findRoleByName(RolesFundacion.PRACTICANTE);
    if (!rolPracticante) {
      throw new BadRequestException('No existe el rol Practicante en la base de datos');
    }

    // 3. Crear nuevo usuario con rol Practicante por defecto
    const nuevoUsuario = await this.usuarioRepository.create({
      email: registerDto.email,
      nombre_completo: registerDto.nombre_completo,
      apellido_completo: registerDto.apellido_completo,
      password_hash: passwordHash,
      puesto: registerDto.puesto || 'Practicante',
      estado: 'ACTIVO',
      rol_id: rolPracticante.id,
    });

    return {
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre_completo,
        email: nuevoUsuario.email,
      },
    };
  }
}