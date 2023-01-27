import { Body, Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(@Res() res) {
    return res.render('public/listado_juegos');
  }
  // @  Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/buscar')
  async listar(@Res() res, @Body() buscar: string) {
    const resultado = await this.appService.listarBuscar(buscar);
    if (resultado) return res.render('listado_juegos', { contacto: resultado });
  }
}
