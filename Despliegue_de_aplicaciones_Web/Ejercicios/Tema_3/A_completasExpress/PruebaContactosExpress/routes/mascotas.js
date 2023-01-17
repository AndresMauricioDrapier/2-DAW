const express = require("express");

let Mascota = require(__dirname + '/../models/mascota.js');
let router = express.Router();

//? Servicio GET
router.get('/', (req, res) => {
    Mascota.find().find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "Error obteniendo Mascotas" })
    })
});

//? Servicio POST
router.post('/', (req, res) => {
    let nuevaMascota = new Mascota({
        nombre: req.body.nombre,
        tipo: req.body.tipo
    })

    nuevaMascota.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo mascota" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Mascota.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Mascota no encontrada" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando mascota" });
        })
});

module.exports = router;


