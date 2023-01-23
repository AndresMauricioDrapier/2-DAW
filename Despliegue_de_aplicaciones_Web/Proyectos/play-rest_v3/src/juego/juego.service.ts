import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Juego } from './interfaces/juego/juego.interface';

@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('juego')
    private readonly contactoModel: Model<Juego>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.contactoModel.find().exec();
  }
  async listarId(id: string) {
    return await this.contactoModel.findById(id).exec();
  }

  async insertar(crearContactoDto: JuegoDto): Promise<Juego> {
    const nuevoContacto = new this.contactoModel(crearContactoDto);
    return await nuevoContacto.save();
  }

  async actualizar(id: string, actualizarTareaDto: JuegoDto): Promise<Juego> {
    return await this.contactoModel
      .findByIdAndUpdate(
        id,

        {
          $set: {
            nombre: actualizarTareaDto.nombre,
            descripcion: actualizarTareaDto.descripcion,
            edad: actualizarTareaDto.edad,
            numJugadores: actualizarTareaDto.numJugadores,
            tipo: actualizarTareaDto.tipo,
            precio: actualizarTareaDto.precio,
            imagen: actualizarTareaDto.imagen,
            edicion: actualizarTareaDto.edicion,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async borrar(id: string): Promise<Juego> {
    return await this.contactoModel.findByIdAndDelete(id).exec();
  }
}
