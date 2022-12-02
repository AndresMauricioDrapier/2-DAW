//? Librerias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//? Enrutadores

const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores');

//? Conexién con la BD
mongoose.connect(
    'mongodb://localhost:27017/libros_vs',
    { useNewUrlParser: true, useUnifiedTopology: true }

);

//? Servidor Express
let app = express();

//? Middleware body-parser para peticiones POST Y PUT
//? Enrutadores para cada grupo de rutas
app.use(bodyParser.json());
// app.use((req,res,next)=>{
//     res.send({mensaje:"En mantenimiento"});
// });
app.use('/libros', libros);
app.use('/autores', autores);

//? Puesta en marcha del servidor
app.listen(8080);