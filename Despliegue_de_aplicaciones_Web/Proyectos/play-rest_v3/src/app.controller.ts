import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(@Res() res) {
    const juegos = await this.appService.listar();
    return res.render('public/listado_juegos', { juegos: juegos });
  }
  @Post('/buscar')
  async listar(@Res() res, @Body() buscar) {
    const resultado = await this.appService.listarBuscar(buscar.textoBusqueda);
    if (resultado)
      return res.render('public/listado_juegos', { juegos: resultado });
  }
}
