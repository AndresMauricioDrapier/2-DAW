import * as mongoose from 'mongoose';
export const JuegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlenght: 6,
  },
  descripcion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  numJugadores: {
    type: Number,
    required: true,
  },
  tipo: {
    enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero'],
    //required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: {
    type: String,
  },
  edicion: [
    {
      nombre: {
        type: String,
      },
      anyo: {
        type: Number,
        min: 2000,
        max: new Date().getFullYear(),
      },
    },
  ],
});
