/*
Ejercicio de desarrollo de una web con Express, sobre la base de datos
de "libros" utilizada en sesiones anteriores. Se definirán distintas
vistas en Nunjucks para mostrar información de los libros y poderlos
insertar, borrar, etc.
*/

// Carga de librerías
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores');
const usuario = require(__dirname + '/routes/usuarios');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://127.0.0.1:27017/libros_njk', 
    {useNewUrlParser: true});

// Inicializar Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});



// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));
// Cargamos ahora también la carpeta "public" para el CSS propio
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/libros', libros);
app.use('/autores', autores); // Para la parte opcional
app.use('/usuario', usuario); // Para la parte opcional

// Puesta en marcha del servidor
app.listen(8080);