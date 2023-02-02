import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Juego } from './interfaces/juego/juego.interface';
import { JuegoService } from './juego.service';

@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  //GET /juegos
  @Get()
  async listar(@Res() res) {
    return res.redirect('/');
  }

  // GET /juego/nuevo
  @Get('/nuevo')
  async llevarForm(@Res() res, @Req() req) {
    if (req.session && req.session.usuario)
      return res.render('admin/admin_nuevo');
    else {
      res.render('public/error', { error: 'No eres administrador' });
    }
  }

  //GET /juegos/editar/:id
  @Get('/editar/:id')
  async editarJuego(@Res() res, @Param() id, @Req() req) {
    try {
      if (req.session && req.session.usuario) {
        await this.juegoService
          .listarId(id.id)
          .then((juego) => {
            return res.render('admin/admin_nuevo', { juego: juego });
          })
          .catch((error) => {
            res.render('public/error', { error: error });
          });
      } else {
        res.render('public/error', { error: 'No eres administrador' });
      }
    } catch (error) {
      return res.render('public/error', { error: error });
    }
  }
  // GET /juego/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id) {
    try {
      await this.juegoService
        .listarId(id)
        .then((juego) => {
          return res.render('public/juego_ficha', { juego: juego });
        })
        .catch((error) => {
          res.render('public/error', { error: error });
        });
    } catch (error) {
      return res.render('public/error', { error: error });
    }
  }

  // BORRAR JUEGO /juego/borrar/:id
  @Post('borrar/:id')
  async borrarJuego(@Res() res, @Param('id') id) {
    await this.juegoService.borrar(id).then(() => {
      return res.render('public/error', {
        error: 'Juego borrado correctamente',
      });
    });
  }

  //ACTUALIZAR JUEGO /juego/editar/:id
  @Post('/editar/:id')
  async actualizarJuego(
    @Param('id') id: string,
    @Body() actualizarJuego: Juego,
    @Res() res,
    @Req() req,
  ) {
    try {
      if (req.session && req.session.usuario) {
        const juego = await this.juegoService.listarId(id);
        actualizarJuego.imagen = actualizarJuego.imagen
          ? actualizarJuego.imagen
          : juego.imagen;
        await this.juegoService
          .actualizar(id, actualizarJuego)
          .then(() => {
            return res.redirect('/juego/' + id);
          })
          .catch((e) => {
            res.render('public/error', { error: e });
          });
      } else {
        res.render('public/error', { error: 'No eres administrador' });
      }
    } catch (error) {
      return res.render('public/error', { error: error });
    }
  }

  //TODO: POST /juego/nuevo

  @Post('/nuevo')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  async crear(
    @Body() crearJuegoDTO: JuegoDto,
    @Res() res,
    @Req() req,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    console.log(file, crearJuegoDTO.imagen);
    if (req.session && req.session.usuario) {
      this.juegoService
        .insertar(crearJuegoDTO)
        .then((juego) => {
          if (juego) return res.redirect('/');
          else {
            throw new Error();
          }
        })
        .catch((error) => {
          return res.render('public/error', { error: error });
        });
    } else {
      res.render('public/error', { error: 'No eres administrador' });
    }
  }
}
