const express = require('express');
module.exports = (express, Libros, Autor) => {

    let router = express.Router();
    let nuevoLibro = async (titulo, editorial, idAutor) => {
        try {
            let libro = await Libros.create({ titulo: titulo, editorial: editorial });
            let autor = await Autor.findByPk(idAutor);
            let resultado = await libro.setAutor(autor);
            return resultado;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    router.get('/', (req, res) => {
        Libros.findAll().then((result) => {
            res.status(200).send({ ok: true, resultado: result });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        });
    });

    router.get('/:id', (req, res) => {
        Libros.findByPk(req.params['id']).then((resultado) => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Libros no encontrado" });
        }).catch((err) => {
            res.status(500).send({ ok: false, error: err });
        })
    });

    router.post('/', (req, res) => {
        nuevoLibro(req.body.titulo, req.body.editorial, req.body.autor)
            .then(resultado => {
                res.status(200).send({ ok: true, resultado: resultado });
            })
            .catch(error => {
                res.status(400).send({
                    ok: false,
                    error: error
                });
            });
    });

    router.put('/:id', (req, res) => {
        Libros.findByPk(req.params['id']).then(autor => {
            if (autor)
                return autor.update({
                    nombre: req.body.nombre,
                    nacimiento: req.body.nacimiento
                });
            else
                reject("Error actualizando autor");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error actualizando autor"
            });
        });
    });


    router.delete('/:id', (req, res) => {
        Libros.findByPk(req.params['id']).then(libro => {
            if (libro)
                return autor.destroy();
            else
                reject("Error borrando autor");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({
                ok: false,
                error: "Error borrando autor"
            });
        });
    });

    return router;
}