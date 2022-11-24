const mongoose = require('mongoose');

let autorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    añoNacimiento: {
        type: Number,
        min: 0,
        max: 2000
    }
});


//?MODELO
let Autor = mongoose.model('autores', autorSchema);

module.exports = Autor;