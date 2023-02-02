import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
import { Usuario } from './interfaces/usuario/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('auth')
    private readonly authModel: Model<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.authModel.find().exec();
  }
  async insertar(crearUsuarioDto: UsuarioDto): Promise<Usuario> {
    const nuevoJuego = new this.authModel(crearUsuarioDto);
    return await nuevoJuego.save();
  }

  async login(): Promise<Usuario[]> {
    return this.authModel.find().exec();
  }
}
