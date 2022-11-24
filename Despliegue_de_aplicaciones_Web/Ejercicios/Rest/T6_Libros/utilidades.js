const fs = require("fs");

function cargarFichero(fichero) {
    if (fs.existsSync(fichero))
        return JSON.parse(fs.readFileSync(fichero, 'utf-8'));
}

function guardarFichero(fichero, queGuardar) {
    if (fs.existsSync(fichero))
        fs.writeFileSync(fichero, JSON.stringify(queGuardar));
}

module.exports = {
    cargarFichero: cargarFichero,
    guardarFichero: guardarFichero,
}

