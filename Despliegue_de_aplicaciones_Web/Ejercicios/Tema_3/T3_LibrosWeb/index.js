/*
Ejercicio de desarrollo de servicios con Express. Sobre la base de datos de "libros" de  
sesiones anteriores, se desarrollarán los servicios básicos paras operaciones habituales de
GET, POST, PUT y DELETE. En este caso, dejamos hechas las operaciones tipo GET.

En esta versión del ejercicio, se estructura el código en carpetas separadas para modelos
y enrutadores
*/

// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require("nunjucks");

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores'); // Para la parte opcional

// Conectar con BD en Mongo 
mongoose.connect(
    'mongodb://localhost:27017/libros_njk',
    { useNewUrlParser: true, useUnifiedTopology: true }
);


// Inicializar Express
let app = express();

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.redirect('/libros/menu');
});



// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/libros', libros);
app.use('/autores', autores)

// Puesta en marcha del servidor
app.listen(8080);