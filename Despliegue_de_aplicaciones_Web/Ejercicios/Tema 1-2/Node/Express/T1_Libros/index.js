const express = require("express");

let app = express();
let libros = [
    {codi: 1, titol: "El juego de Ender", autor: "Orson Scott Card",
    preu: 7.95},
    {codi: 2, titol: "El Señor de los Anillos", autor: "J.R.R. Tolkien",
    preu: 19.90},
    {codi: 3, titol: "La tabla de Flandes", autor: "Arturo Pérez Reverte",
    preu: 8.50},
    {codi: 4, titol: "La historia interminable", autor: "Michael Ende",
    preu: 12.35}
   ]; 

app.get("/libros", (req,res) => {
    res.send(libros);
});

app.get('/libros/:id', (req,res) =>{
    let idLibro = libros.filter(libro => {
        return libro.codi == req.params['id'];
    });
    if(idLibro == 0)
    {
        res.send("No hay coincidencias");
    }
    else
        res.send(idLibro);
});

app.listen(8080);