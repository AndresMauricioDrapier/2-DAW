const express = require('express');
const Sequelize = require('sequelize');
const artista = require('./models/artista.js');

const ModeloArtista = require("./models/artista.js");
const ModeloCancion = require("./models/cancion.js");

const routerArtistas = require("./routes/artistas");
const routerCanciones = require("./routes/canciones");

const sequelize = new Sequelize('canciones','root','',{
    host:'localhost',
    dialect:'mariadb',
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle:10000
    }
});


const Artista = ModeloArtista(sequelize,Sequelize);
const Cancion = ModeloCancion(sequelize,Sequelize);

const artistas = routerArtistas(express, Artista);
const canciones = routerCanciones(express, Cancion,Artista);

//? RELACION UNO A MUCHOS
Cancion.belongsTo(Artista,{foreingKey:'idArtista', as: 'Artista'});

let app = express();
app.use(express.json());
app.use('/artistas', artistas);
app.use('/canciones', canciones);

sequelize.sync(/*   {force:true} PARA QUE SE HAGA CADA VEZ*/ ).then(() => {
    app.listen(8080);
}).catch((err) => {
    console.log(err);
});