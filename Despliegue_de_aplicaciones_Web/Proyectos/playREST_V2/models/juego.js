const mongoose = require('mongoose');

//?SCHEMA
let edicionSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    anyo:{
        type:Number,
        min:2001,
        max:new Date().getFullYear()
    }
});
let juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    edad:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    numeroJugadores:{
        type:Number,
        required:true
    },
    tipo:{
        type:String,
        enum: [ "rol", "escape", "dados", "fichas", "cartas","tablero"]
    },
    precio:{
        type:Number,
        min:1,
        required:true
    },
    imagen:{
        type:String,
    },
    edicion:[edicionSchema]
    
});

//?MODELO
let Juego = mongoose.model('juegos', juegoSchema);

module.exports = Juego;