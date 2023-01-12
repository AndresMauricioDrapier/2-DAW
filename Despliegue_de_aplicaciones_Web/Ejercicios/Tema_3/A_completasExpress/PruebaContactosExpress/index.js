//? Librerias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");

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

//? Asignación del motor de plantillas
app.set('view engine', 'njk');

//? Configuramos motor Nunjucks
nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});



//? Middleware body-parser para peticiones POST Y PUT
//? Enrutadores para cada grupo de rutas
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/mascotas', mascotas);
app.use('/restaurantes', restaurantes);
app.use('/contactos', contactos);


//?Redirijir al poner solamente localhost:8080/
app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});


//? Puesta en marcha del servidor
app.listen(8080);

