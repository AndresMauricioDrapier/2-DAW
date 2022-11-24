// Utilidades que se necesitaran para guardar los datos y cargar los datos

const fs = require("fs");

function cargarJuegos(fichero) {
    let objetos=[];
    if (fs.existsSync(fichero))
        objetos= JSON.parse(fs.readFileSync(fichero, 'utf-8'));
    return objetos;
}

function guardarJuegos(fichero, queGuardar) {
    if (fs.existsSync(fichero) && queGuardar!=null)
        fs.writeFileSync(fichero, JSON.stringify(queGuardar));
}

module.exports = {
    cargarJuegos: cargarJuegos,
    guardarJuegos: guardarJuegos,
}

