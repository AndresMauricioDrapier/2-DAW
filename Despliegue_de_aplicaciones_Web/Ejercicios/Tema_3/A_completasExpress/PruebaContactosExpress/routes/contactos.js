const express = require("express");

let Contacto = require('../models/contacto.js');
let router = express.Router();

//? Servicio GET
router.get('/', (req, res) => {
    Contacto.find().then(resultado => {
        res.render('contactos_listado',{contactos:resultado});
    }).catch((error) => {
        res.render({ ok: false, error: "Error obteniendo Contacto" })
    })
});



//? Servicio POST
router.post('/', (req, res) => {
    let nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad,
        
    })

    nuevoContacto.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo Contacto" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Contacto.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Contacto no encontrada" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando Contacto" });
        })
});

module.exports = router;


