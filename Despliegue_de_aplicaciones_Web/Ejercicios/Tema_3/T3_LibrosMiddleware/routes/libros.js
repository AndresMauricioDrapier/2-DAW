const express = require("express");

let Libro = require('../models/libro.js');
let router = express.Router();

router.use((req, res, next) => {
    console.log(`Fecha: ${new Date().toString()}
    Metodo: ${req.method}
    URL: ${req.baseUrl}`);
    next();
});

//? Servicio GET
router.get('/', (req, res) => {
    Libro.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "Error obteniendo Libros" })
    })
});



//? Servicio POST
router.post('/', (req, res) => {
    let nuevoLibro = new Libro({
        nombre: req.body.nombre,
        añoNacimiento: req.body.añoNacimiento

    })

    nuevoLibro.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo Libro" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Libro no encontrada" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando Libro" });
        })
});

module.exports = router;


