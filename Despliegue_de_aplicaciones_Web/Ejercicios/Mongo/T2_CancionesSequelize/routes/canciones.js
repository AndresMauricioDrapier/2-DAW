const express = require('express');
module.exports = (express, Canciones,Artista) => {

    let nuevaCancion = async (titulo, duracion,album, idArtista) => {
        try {
            let cancion = await Canciones.create({ titulo: titulo, duracion: duracion,album:album });
            let artista = await Artista.findByPk(idArtista);
            let resultado = await cancion.setArtista(artista);
            return resultado;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    let router = express.Router();

    router.get('/', (req, res) => {
        Canciones.findAll().then((result) => {
            res.status(200).send({ ok: true, resultado: result });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        });
    });

    router.get('/:id', (req, res) => {
        Canciones.findByPk(req.params['id']).then((resultado) => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Canciones no encontrado" });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        })
    });

    router.post('/', (req, res) => {
        nuevaCancion(req.body.titulo, req.body.duracion, req.body.album,req.body.artista)
            .then(resultado => {
                res.status(200).send({ ok: true, resultado: resultado });
            })
            .catch(error => {
                res.status(400).send({
                    ok: false,
                    error: "Error insertando cancion"
                });
            });
    });

    router.put('/:id', (req, res) => {
        Canciones.findByPk(req.params['id']).then(canciones => {
            if (canciones)
                return Canciones.update({
                    nombre: req.body.nombre,
                    nacimiento: req.body.nacimiento
                });
            else
                reject("Error actualizando Canciones");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error actualizando Canciones"
            });
        });
    });


    router.delete('/:id', (req, res) => {
        Canciones.findByPk(req.params['id']).then(artistas => {
            if (artistas)
                return Canciones.destroy();
            else
                reject("Error borrando Canciones");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error borrando Canciones"
            });
        });
    });

    return router;
}