import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JuegoModule,
    UsuarioModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/playRest_v3'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
