const express = require("express");

let Restaurante = require(__dirname + '/../models/restaurante.js');
let router = express.Router();

//? Servicio GET
router.get('/', (req, res) => {
    Restaurante.find().find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "Error obteniendo Restaurantes" })
    })
});

//? Servicio POST
router.post('/', (req, res) => {
    let nuevoRestaurante = new Restaurante({
        nombre: req.body.nombre,
        tipo: req.body.tipo
    })

    nuevoRestaurante.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo Restaurante" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Restaurante.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Restaurante no encontrada" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando Restaurante" });
        })
});

module.exports = router;


