const express = require("express");
const Fichero = require("./utilidades.js");
const miFichero = "fichero.json";

let app = express();
app.use(express.json());


let libros = Fichero.cargarFichero(miFichero);

app.get("/libros", (req, res) => {
    if (libros && libros.length > 0) {
        res.status(200).send({ ok: true,resultado: libros})
    }
    else
        res.status(500).send({ ok: false, error: "No se encontraron contactos" });
 });

app.get('/libros/:id', (req, res) => {
    let idLibro = libros.filter(libro => {
        return libro.codi == req.params['id'];
    });
    if (idLibro && idLibro.length > 0) {
        res.status(200).send({ ok: true, idLibro: idLibro[0] })
    }
    else
        res.status(500).send({ ok: false, error: "No se encontraron contactos" });
});

app.post('/libros', (req, res) => {
    let nuevoLibro = {
    codi: req.body.codi, titol: req.body.titol,
    autor: req.body.autor,preu: req.body.preu
    };

    //validar libro si existe
    let existe = libros.filter(
    libro => libro.codi == nuevoLibro.codi );
    if (existe.length == 0) {
        libros.push(nuevoLibro);
        Fichero.guardarFichero(miFichero,libros);
    res.status(200).send({ok: true,resultado:libros});
    } else { res.status(400).send({ok: false, error: "Libro duplicado"});}
}); 

app.put('/libros/:codi',(req,res)=>{
    let existe = libros.filter(libro => libro.codi == req.params['codi']);

    if(existe.length>0)
    {
        let libro = existe[0];
        libro.titol = req.body.titol;
        libro.autor = req.body.autor;
        libro.preu = req.body.preu;
        res.status(200).send({ok:true,resultado:libros});
    }
    else
    {
        res.status(400).send({ok:false,error: "Libro no encontrado"});
    }
});

app.delete('/libros/:id',(req,res) => {
    let libroBorrado = libros.filter(libro => libro.codi != req.params['id']);
    if(libros.length != libroBorrado.length)
    {
        Fichero.guardarFichero(miFichero,libroBorrado);
        res.status(200).send({ok:true,resultado:libroBorrado})
    }else{
        res.status(400).send({ok:false,error: "Ese libro no se ha encontrado"});
    }
});

app.listen(8080);