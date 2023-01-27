import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Juego } from './juego/interfaces/juego/juego.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Juego')
    private readonly contactoModel: Model<Juego>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async listarBuscar(nombre: string): Promise<Juego[]> {
    return await this.contactoModel
      .find((juegos: Juego[]) => {
        juegos.filter((juego) => juego.nombre == nombre);
      })
      .exec();
  }
}
