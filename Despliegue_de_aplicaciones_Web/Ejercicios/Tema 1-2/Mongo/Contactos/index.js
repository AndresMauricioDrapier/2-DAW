//? Librerias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//? Enrutadores

const mascotas = require(__dirname + '/routes/mascotas');
const restaurantes = require(__dirname + '/routes/restaurantes');
const contactos = require(__dirname + '/routes/contactos');

//? Conexién con la BD
mongoose.connect(
    'mongodb://localhost:27017/contactos_vs',
    { useNewUrlParser: true, useUnifiedTopology: true }

);

//? Servidor Express
let app = express();

//? Middleware body-parser para peticiones POST Y PUT
//? Enrutadores para cada grupo de rutas
app.use(bodyParser.json());
app.use('/mascotas', mascotas);
app.use('/restaurantes', restaurantes);
app.use('/contactos', contactos);

//? Puesta en marcha del servidor
app.listen(8080);