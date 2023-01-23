import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Juego } from './juego/interfaces/juego/juego.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('juego')
    private readonly contactoModel: Model<Juego>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async listar(nombre: string): Promise<Juego[]> {
    return await this.contactoModel
      .find((juegos) => {
        juegos.filter((juego) => juego.nombre == nombre);
      })
      .exec();
  }
}
