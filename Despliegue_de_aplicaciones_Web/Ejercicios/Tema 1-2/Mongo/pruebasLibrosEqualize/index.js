const Sequelize = require('sequelize');
const express = require('express');

const ModeloAutor = require("./models/autor");
const ModeloLibro = require("./models/libro");

const routerAutores = require("./routes/autores");
const routerLibros = require("./routes/libros");

const sequelize = new Sequelize('librosSequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Autor = ModeloAutor(sequelize, Sequelize);
const Libro = ModeloLibro(sequelize, Sequelize);

//? RELACION UNO A MUCHOS
Libro.belongsTo(Autor, { foreingKey: 'idAutor', as: 'Autor' });

const autores = routerAutores(express, Autor);
const libros = routerLibros(express, Libro, Autor);


let app = express();
app.use(express.json());
app.use('/libros', libros);
app.use('/autores', autores);

sequelize.sync().then(() => {
    app.listen(8080);
}).catch(error => {
    console.log(error);
});
