const express = require('express');
module.exports = (express, Artistas) => {

    let router = express.Router();

    router.get('/', (req, res) => {
        Artistas.findAll().then((result) => {
            res.status(200).send({ ok: true, resultado: result });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        });
    });

    router.get('/:id', (req, res) => {
        Artistas.findByPk(req.params['id']).then((resultado) => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Artistas no encontrado" });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        })
    });

    router.post('/', (req, res) => {
        Artistas.create({
            nombre: req.body.nombre,
            nacionalidad: req.body.nacionalidad
        }).then((resultado) => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Error insertando Artistas" });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err })
        })
    });

    router.put('/:id', (req, res) => {
        Artistas.findByPk(req.params['id']).then(artistas => {
            if (artistas)
                return Artistas.update({
                    nombre: req.body.nombre,
                    nacimiento: req.body.nacimiento
                });
            else
                reject("Error actualizando Artistas");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error actualizando Artistas"
            });
        });
    });


    router.delete('/:id', (req, res) => {
        Artistas.findByPk(req.params['id']).then(artistas => {
            if (artistas)
                return artistas.destroy();
            else
                reject("Error borrando Artistas");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error borrando artistas"
            });
        });
    });

    return router;
}