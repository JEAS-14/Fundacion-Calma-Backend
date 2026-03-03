import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El nombre completo debe ser texto' })
  @IsNotEmpty({ message: 'El nombre completo es requerido' })
  nombre_completo: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido_completo: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'El puesto debe ser texto' })
  puesto?: string;
}
