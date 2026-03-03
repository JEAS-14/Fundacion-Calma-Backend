import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../../application/dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Recibimos el body y se lo pasamos al servicio
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  // 🔥 NUEVA RUTA PROTEGIDA DE PRUEBA
  @UseGuards(JwtAuthGuard) // <-- El Guardia intercepta la petición aquí
  @Get('perfil')
  obtenerPerfilProtegido(@Req() req: any) {
    // Si la petición llega a esta línea, significa que el token es válido
    return {
      mensaje: '¡Acceso autorizado a la zona segura!',
      usuario: req.user // Aquí viene el ID, email y rol que pusiste en el token
    };
  }
}