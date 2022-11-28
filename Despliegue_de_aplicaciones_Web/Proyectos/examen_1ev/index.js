const express = require("express");
const mongoose = require("mongoose");

const eventos = require(__dirname + '/routes/eventos');

//? Conexién con la BD
mongoose.connect(
    'mongodb://localhost:27017/eventos',
    { useNewUrlParser: true, useUnifiedTopology: true }

);

//? Servidor Express
let app = express();

//? Middleware body-parser
app.use(express.json());
app.use('/eventos', eventos);

//? Puesta en marcha del servidor
app.listen(8080);