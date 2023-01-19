import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactoModule } from './contacto/contacto.module';

@Module({
  imports: [
    ContactoModule,
    MongooseModule.forRoot('mongodb://localhost/contactos'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
