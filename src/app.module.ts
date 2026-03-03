import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConveniosModule } from './area-estrategia-desarrollo-comercial/convenios/convenios.module';
import { ConveniosModule } from './modules/area-estrategia-desarrollo-comercial/convenios/convenios.module';
import { ConvenioModule } from './convenio/convenio.module';
import { ConveniosModule } from './modules/area-estrategia-desarrollo-comercial/presentation/convenios/convenios.module';

@Module({
  imports: [AuthModule, ConveniosModule, ConvenioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
