import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { UsuarioEntity } from '../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository';

@Injectable()
export class UsuarioRepositoryImpl implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapUsuario(usuario: any): UsuarioEntity {
    return new UsuarioEntity({
      ...usuario,
      rol: usuario.roles ?? null,
    });
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      include: { roles: true },
    });
    return usuario ? this.mapUsuario(usuario) : null;
  }

  async findById(id: number): Promise<UsuarioEntity | null> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      include: { roles: true },
    });
    return usuario ? this.mapUsuario(usuario) : null;
  }

  async findRoleByName(nombre: string): Promise<{ id: number; nombre: string } | null> {
    const rol = await this.prisma.roles.findUnique({
      where: { nombre },
      select: { id: true, nombre: true },
    });
    return rol;
  }

  async create(usuario: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    const newUsuario = await this.prisma.usuarios.create({
      data: usuario as any,
      include: { roles: true },
    });
    return this.mapUsuario(newUsuario);
  }

  async update(id: number, usuario: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    const updatedUsuario = await this.prisma.usuarios.update({
      where: { id },
      data: usuario,
      include: { roles: true },
    });
    return this.mapUsuario(updatedUsuario);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.usuarios.delete({
      where: { id },
    });
  }
}
