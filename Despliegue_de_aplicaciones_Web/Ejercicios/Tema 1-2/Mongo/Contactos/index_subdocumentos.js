const mongoose = require('mongoose');
const express = require("express");

//? Conexión con la BD
mongoose.connect('mongodb://localhost:27017/Contactos_Subdocumentos');

//#region Definicion de nuestras colecciones 
let restauranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    }


});
let mascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'otros']
    }
});
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
    restauranteFavorito: restauranteSchema,
    mascotas: [mascotaSchema]
});
//#endregion


//#region Crear Modelos
let Contacto = mongoose.model('contactos', contactoSchema);
//#endregion

//#region Crear contacto, Guardar contacto
let contacto1 = new Contacto({
    nombre: "Narnia",
    telefono: "123453289",
    edad: 20,
    restauranteFavorito: {
        nombre: "La Mafia",
        direccion: "Avenida Locutor Vicente Hipolito",
        telefono: "123456789"
    },
});
contacto1.mascotas.push({ nombre: "perro", tipo: "perro" });
contacto1.mascotas.push({ nombre: "gato", tipo: "gato" });
contacto1.save().then(resultado => {
    console.log("Contacto añadido => ", resultado);
}).catch(error => {
    console.log("Error" + error);
});

//#endregion


