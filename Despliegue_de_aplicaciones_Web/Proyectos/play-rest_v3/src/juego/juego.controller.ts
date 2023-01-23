import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';

@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}
  @Get()
  async listar(@Res() res) {
    const resultado = await this.juegoService.listar();
    if (resultado)
      return res.render('contactos_listado', { contacto: resultado });
  }
  // GET /contacto/buscar/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const resultado = await this.juegoService.listarId(id);
      if (resultado)
        return res.render('contactos_ficha', { contacto: resultado });

      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al contacto' };
    }
  }
  // POST /contacto
  @Post()
  async crear(@Body() crearContactoDto: JuegoDto) {
    return this.juegoService.insertar(crearContactoDto);
  }

  // PUT /contacto/:id
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() actualizarContactoDto: JuegoDto) {
    return this.juegoService.actualizar(id, actualizarContactoDto);
  }
  // DELETE /contacto/:id
  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.juegoService.borrar(id);
  }
}
