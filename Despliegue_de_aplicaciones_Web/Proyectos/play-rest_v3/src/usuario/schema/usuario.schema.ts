import * as mongoose from 'mongoose';
export const UsuarioSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlenght: 5,
    unique: true,
  },
  password: {
    type: String,
    minlenght: 8,
  },
});
