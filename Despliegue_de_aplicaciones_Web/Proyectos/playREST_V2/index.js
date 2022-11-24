//? Librerias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//? Enrutadores
const juegos = require(__dirname + '/routes/juegos');

//? Conexién con la BD
mongoose.connect(
    'mongodb://localhost:27017/playREST_V2',
    { useNewUrlParser: true, useUnifiedTopology: true }

);

//? Servidor Express
let app = express();

//? Middleware body-parser
app.use(bodyParser.json());
app.use('/juegos', juegos);

//? Puesta en marcha del servidor
app.listen(8080);