const mongoose = require('mongoose');

// Definir esquema y modelo
let usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String        
    },
    contraseña: {
        type: String
    },
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;
