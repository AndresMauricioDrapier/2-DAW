const mongoose = require('mongoose');

//?SCHEMA
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

//?MODELO
let Mascota = mongoose.model('mascota', mascotaSchema);

module.exports = Mascota;
