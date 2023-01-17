const express = require("express");

let Evento = require('../models/evento.js');
let router = express.Router();


//? Servicio GET
router.get('/', (req, res) => {
    Evento.find().then(resultado => {
        if(resultado.length != 0)
            res.status(200).send({resultado: resultado });
        else
            res.status(400).send({error:"No se encontraron eventos"})
    }).catch((error) => {
        res.status(500).send({error: error })
    })
});
router.get('/:id', (req, res) => {
    Evento.findById(req.params["id"]).then(resultado => {
        if (resultado)
            res.status(200).send({resultado: resultado });
        else
            res.status(400).send({error: "Evento no encontrado" });
    }).catch((error) => {
        res.status(500).send({error: error })
    })
});

//? Servicio POST
router.post('/', (req, res) => {
    let nuevoEvento = new Evento({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        imagen: req.body.imagen,
        tipo: req.body.tipo,
        puntuacion: req.body.puntuacion,
        precio: req.body.precio
    })

    nuevoEvento.save().then(resultado => {
        if(resultado.length !=0)
            res.status(200).send({resultado: resultado });
        else
            res.status(400).send({error: "Error insertando el evento" });
    }).catch(error => {
        res.status(500)
            .send({error: error })
    });
});

//? SERVICIO PUT
router.put('/:id', (req, res) => {
    let eventoModificado = ({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        imagen: req.body.imagen,
        tipo: req.body.tipo,
        puntuacion: req.body.puntuacion,
        precio: req.body.precio
    })

    Evento.findByIdAndUpdate(req.params["id"], eventoModificado, { new: true, runValidators: true }).then(resultadoMod => {
        if (resultadoMod.length != 0)
            res.status(200).send({resultado: resultadoMod });
        else
            res.status(400).send({error: "Error modificando el evento" });
    }).catch((error) => {
        res.status(500).send({error: error })
    });
});

router.post('/comentarios/:idEvento', (req, res) => {
    let comentariosAñadir = {
        creador: req.body.creador,
        fecha: req.body.fecha
    }
    Evento.findById(req.params["idEvento"]).then(resultado => {
        if (resultado) {
            resultado.comentarios.push(comentariosAñadir);
            resultado.save().then(() => {
                res.status(200).send({resultado: resultado });
            }).catch(() => {
                res.status(400).send({error: "Error añadiendo una edicion" });
            });

        }
        else
            res.status(400).send({error: "Error buscando por ID" });
    }).catch(error => {
        res.status(500).send({error: error })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Evento.findByIdAndRemove(req.params['id']).then(resultado => {
            if (resultado)
                res.status(200).send({ resultado: resultado });
            else
                res.status(400).send({error: "Error eliminando el evento" });
        }).catch(error => {
            res.status(500).send({error: error});
        })
});
module.exports = router;


