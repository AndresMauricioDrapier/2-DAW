import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Juego } from './interfaces/juego/juego.interface';

@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find().exec();
  }
  async listarId(id: string) {
    return await this.juegoModel.findById(id).exec();
  }

  async insertar(crearJuegoDto: JuegoDto): Promise<Juego> {
    const nuevoJuego = new this.juegoModel(crearJuegoDto);
    return await nuevoJuego.save();
  }

  async actualizar(id: string, actualizarJuegoDto: JuegoDto): Promise<Juego> {
    return await this.juegoModel
      .findByIdAndUpdate(
        id,

        {
          $set: {
            nombre: actualizarJuegoDto.nombre,
            descripcion: actualizarJuegoDto.descripcion,
            edad: actualizarJuegoDto.edad,
            numJugadores: actualizarJuegoDto.numJugadores,
            tipo: actualizarJuegoDto.tipo,
            precio: actualizarJuegoDto.precio,
            imagen: actualizarJuegoDto.imagen,
            edicion: actualizarJuegoDto.edicion,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async borrar(id: string): Promise<Juego> {
    return await this.juegoModel.findByIdAndRemove(id).exec();
  }
}
