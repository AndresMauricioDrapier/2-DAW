const express = require("express");

let Autor = require('../models/autor.js');
let router = express.Router();

//? Servicio GET
router.get('/', (req, res) => {
    Autor.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "Error obteniendo Autores" })
    })
});



//? Servicio POST
router.post('/', (req, res) => {
    let nuevoAutor = new Autor({
        nombre: req.body.nombre,
        añoNacimiento: req.body.añoNacimiento
        
    })

    nuevoAutor.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo Autor" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Autor.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Autor no encontrada" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando Autor" });
        })
});

module.exports = router;


