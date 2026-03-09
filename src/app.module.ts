import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { ConveniosModule } from './modules/area-estrategia-desarrollo-comercial/convenios/convenios.module';
import { ConvenioComentariosModule } from './modules/area-estrategia-desarrollo-comercial/convenio_comentarios/convenio_comentarios.module';
import { ConvenioArchivosModule } from './modules/area-estrategia-desarrollo-comercial/convenio_archivos/convenio_archivos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ConveniosModule,
    ConvenioComentariosModule,
    ConvenioArchivosModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
