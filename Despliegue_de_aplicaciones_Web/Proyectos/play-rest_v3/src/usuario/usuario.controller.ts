import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
import { UsuarioService } from './usuario.service';

@Controller('auth')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //GET /auth
  @Get()
  async listar(@Res() res) {
    return res.redirect('/auth/login');
  }

  // GET /auth/login
  @Get('/login')
  async llevarForm(@Res() res, @Req() req) {
    if (!(req.session && req.session.usuario))
      return res.render('public/iniciarSesion');
    else return res.redirect('/');
  }
  // GET /auth/logout
  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    try {
      req.session.destroy();
      res.redirect('/');
    } catch (e) {
      res.render('public/error', { error: 'Error en la aplicación: ' + e });
    }
  }

  //POST /auth/login
  @Post('login')
  async crear(@Body() crearUsuarioDto: UsuarioDto, @Res() res, @Req() req) {
    this.usuarioService
      .login()
      .then((users) => {
        users.filter((user) => {
          if (
            user.login === crearUsuarioDto.login &&
            user.password === crearUsuarioDto.password
          ) {
            req.session.usuario = crearUsuarioDto;
            return res.redirect('/');
          }
        });
      })
      .catch((e) => {
        return res.render('public/iniciarSesion', { error: e });
      });
  }

  //*POST /auth  PARA REGISTRARME DE PRUEBA
  // @Post()
  // async crear(
  //   @Body() crearUsuarioDto: UsuarioDto,
  //   @Res() res,
  //   @Session() session,
  // ) {
  //   this.usuarioService
  //     .insertar(crearUsuarioDto)
  //     .then((juego) => {
  //       if (juego) return res.redirect('/');
  //       else {
  //         throw new Error();
  //       }
  //     })
  //     .catch((error) => {
  //       return res.render('public/error', { error: error });
  //     });
  // }
}
