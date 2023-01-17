const mongoose = require('mongoose');

let comentariosSchema = mongoose.Schema({
    creador: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        min: '01-01-2020',
        max: Date.now
    }

});

let eventosSchema = mongoose.Schema({
    titulo: {
        required: true,
        type: String,
        minlength: 6,
    },
    descripcion: {
        type:String,
        required: true //?TEXTO LARGO OBLIGATORIO
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{9}$/
    },
    imagen: {
        type: String, //?RUTA RELATIVA
        required: false
    },
    tipo: {
        type:String,
        enum: ['concierto', 'deporte', 'comida', 'hogueras', 'cumpleaños']
    },
    puntuacion: {
        type: Number,
        min: 0,
        max: 5
    },
    precio: {
        type: Number,
        min: 1
    },
    comentarios: [comentariosSchema]
});

let Evento = mongoose.model('eventos', eventosSchema);

module.exports = Evento;