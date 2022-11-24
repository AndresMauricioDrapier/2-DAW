const ruta = '/Daw/2º DAW';
const fs = require('fs');
fs.readdirSync(ruta).forEach(fichero=>{
    console.log(fichero);
});