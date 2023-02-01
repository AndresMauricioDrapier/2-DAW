import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Session,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';

@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  //GET /juego
  @Get()
  async listar(@Res() res) {
    const juego = await this.juegoService.listar();
    if (juego) return res.render('public/listado_juegos', { juegos: juego });
  }

  // GET /juego /nuevo
  @Get('/nuevo')
  async llevarForm(@Res() res) {
    return res.render('admin/admin_nuevo');
  }

  //GET /juegos/editar/:id HAY QUE EDITARLO PARA QUE LLEVEN AL MISMO FORMULARIO
  @Get('/editar/:id')
  async editarJuego(@Res() res, @Param() id: string, @Session() session) {
    try {
      if (session && session.usuario) {
        const juego = await this.juegoService.listarId(id);
        if (juego) return res.render('admin_editar', { juego: juego });
        else {
          throw new Error();
        }
      } else {
        res.render('error', { error: 'No eres administrador' });
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }
  // GET /juego/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const juego = await this.juegoService.listarId(id);
      if (juego) return res.render('public/juego_ficha', { juego: juego });
      else {
        throw new Error();
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }

  // POST /juego

  @Post()
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
    @Session() session,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    console.log(file, crearJuegoDTO.imagen);
    if (session && session.usuario) {
      this.juegoService
        .insertar(crearJuegoDTO)
        .then((juego) => {
          if (juego) return res.render('public/listado_juegos');
          else {
            throw new Error();
          }
        })
        .catch((error) => {
          return res.render('public/error', { error: error });
        });
    } else {
      res.render('error', { error: 'No eres administrador' });
    }
  }

  // PUT /juego/:id
  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarJuego: JuegoDto,
    @Res() res,
    @Session() session,
  ) {
    try {
      if (session && session.usuario) {
        const juego = await this.juegoService.listarId(id);
        const juegoEditar = await this.juegoService.actualizar(
          id,
          actualizarJuego,
        );
        juegoEditar.imagen = juegoEditar.imagen
          ? juegoEditar.imagen
          : juego.imagen;
        if (juego) return res.render('listado_juegos', { juego: juego });
        else {
          throw new Error();
        }
      } else {
        res.render('error', { error: 'No eres administrador' });
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }
  //  DELETE /juego/:id
  @Delete(':id')
  async borrar(@Param('id') id: string, @Res() res, @Session() session) {
    try {
      if (session && session.usuario) {
        const borrado = await this.juegoService.borrar(id);
        if (borrado) return res.render('listado_juegos');
        else {
          throw new Error();
        }
      } else {
        res.render('error', { error: 'No eres administrador' });
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }
}
