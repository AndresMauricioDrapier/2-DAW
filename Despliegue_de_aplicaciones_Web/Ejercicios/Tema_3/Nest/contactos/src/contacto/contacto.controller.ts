import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { ContactoService } from './contacto.service';
import { ContactoDto } from './dto/contacto-dto/contacto-dto';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}
  @Get()
  async listar(@Res() res) {
    const resultado = await this.contactoService.listar();
    if (resultado)
      return res.render('contactos_listado', { contacto: resultado });
  }
  // GET /contacto/buscar/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const resultado = await this.contactoService.listarId(id);
      if (resultado)
        return res.render('contactos_ficha', { contacto: resultado });

      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al contacto' };
    }
  }
  // POST /contacto
  @Post()
  async crear(@Body() crearContactoDto: ContactoDto) {
    return this.contactoService.insertar(crearContactoDto);
  }

  // PUT /contacto/:id
  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() actualizarContactoDto: ContactoDto,
  ) {
    return this.contactoService.actualizar(id, actualizarContactoDto);
  }
  // DELETE /contacto/:id
  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.contactoService.borrar(id);
  }
}
