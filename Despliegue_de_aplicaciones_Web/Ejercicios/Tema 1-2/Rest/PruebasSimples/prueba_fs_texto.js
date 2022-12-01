const fs = require("fs");

let personas = [
    {
        nombre: "Laura",
        edad: 10
    },
    {
        nombre: "Andres",
        edad: 20
    },
    {
        nombre: "Pedro",
        edad: 15
    }
]

// Convertir JS a JSON
let personasJSON = JSON.stringify(personas);
console.log(`Objeto JSON es ${personasJSON}`);

//Convertir JSON a JS
let personasJS = JSON.parse(personasJSON);
console.log(`Objeto JS es ${personasJS}`);

//* Guardar y cargar datos de fichero
const fichero = "fichero.json";

//? Guardar al ficherito
let objeto = fs.writeFileSync(fichero,personasJSON);

//? Cargar el fichero

let objetoJS = fs.readFileSync(fichero,'utf-8');
console.log(objetoJS);