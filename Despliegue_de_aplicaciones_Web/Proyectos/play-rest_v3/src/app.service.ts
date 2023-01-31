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
  async listarBuscar(nombre: string): Promise<Juego[]> {
    let juegos = await this.contactoModel.find().exec();
    juegos = juegos.filter((juego) => {
      return juego.nombre.includes(nombre);
    });
    return juegos;
  }

  async listar(): Promise<Juego[]> {
    return await this.contactoModel.find().exec();
  }
}
