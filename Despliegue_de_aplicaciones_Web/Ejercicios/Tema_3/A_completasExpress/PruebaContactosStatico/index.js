const express = require("express");
const nunjucks = require('nunjucks');

let app = express();

//?Configuración de nunjucks
app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use('/public', express.static(__dirname + '/public'));

//?Redirijir al poner solamente localhost:8080/

app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});

//?Poder usar bootstrap en los html 
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


app.listen(8080);