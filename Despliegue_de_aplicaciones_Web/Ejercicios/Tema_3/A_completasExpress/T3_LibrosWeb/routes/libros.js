const express = require('express');
const multer = require("multer");

let Libro = require(__dirname + '/../models/libro.js');
let router = express.Router();

// Subir el fichero
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/img')
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() + "_" + file.originalname);
    }
})
let upload = multer({storage:storage});

// Servicio de listado general
router.get('/', (req, res) => {
    Libro.find().then(resultado => {
        res.render('libros_listado', { libros: resultado });
    }).catch(error => {
        res.render('error',{error: "Error consiguiendo los libro"});
    });
});

router.get('/nuevo', (req, res) => {
    res.render('libros_nuevo');
});
router.get('/modificar/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('libros_modificar', { libro: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se han encontrado libros"
                });
    }).catch(error => {
        res.render('error',{error: "Error consiguiendo libro"});
    });
});



// Servicio de listado por id
router.get('/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('libros_ficha', { libro: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se han encontrado libros"
                });
    }).catch(error => {
        res.render('error',{error: "Error consiguiendo libro"});
    });
});

// Servicio para insertar libros
router.post('/', upload.single("imagen"),(req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: Number(req.body.precio),
        imagen: req.file.path
    });
    nuevoLibro.save().then(resultado => {
       res.redirect(req.baseUrl);
    }).catch(error => {
        res.render("error",{error:"Error añadiendo un nuevo libro"+error});
    });
});

// Servicio para modificar libros
router.put('/:id', (req, res) => {

    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio,
            precio: req.file.path
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se ha encontrado el libro para actualizar"
                });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error actualizando libro"
            });
    });
});

// Servicio para borrar libros
router.delete('/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error',{error: "Error eliminando libro"});
    });
});

module.exports = router;