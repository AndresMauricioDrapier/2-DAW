const mongoose = require('mongoose');

let librosSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
    },
    editorial: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autores'
    },
    comentarios: {
        comentario: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now
        },
        nombre: {
            type: String,
            required: true,
        }
    }
});

let Libro = mongoose.model('libros', librosSchema);

module.exports = Libro;