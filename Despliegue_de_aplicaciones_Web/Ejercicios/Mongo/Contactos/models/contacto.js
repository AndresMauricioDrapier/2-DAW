const mongoose = require('mongoose');

//?SCHEMA
let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        trim: true

    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    },
    restauranteFavorito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurante'
    },
    mascotas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascota'
    }]
});

//?MODELO
let Contacto = mongoose.model('contactos', contactoSchema);

module.exports = Contacto;