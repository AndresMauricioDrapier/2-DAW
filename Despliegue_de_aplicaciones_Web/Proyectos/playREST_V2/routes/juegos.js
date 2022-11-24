//? Llamadas a los distintos servicios como GET, POST, PUT y Delete
const express = require("express");

let Juego = require('../models/juego.js');
let router = express.Router();

//? Servicio GET
router.get('/', (req, res) => {
    Juego.find().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "No se encontraron juegos de mesa" })
    })
});
router.get('/:id', (req, res) => {
    Juego.findById(req.params["id"]).then(resultado => {
        if (resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(400).send({ ok: false, error: "Juego no encontrado" });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "No se encontraron juegos de mesa" })
    })
});

//? Servicio POST
router.post('/', (req, res) => {
    let nuevoJuego = new Juego({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        numeroJugadores: req.body.numeroJugadores,
        tipo: req.body.tipo,
        precio: req.body.precio,
        imagen: req.body.imagen
    })

    nuevoJuego.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo Juego" })
    });
});

//? SERVICIO PUT
router.put('/:id', (req, res) => {
    let juegoModificado = ({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        numeroJugadores: req.body.numeroJugadores,
        tipo: req.body.tipo,
        precio: req.body.precio,
        imagen: req.body.imagen
    })

    Juego.findByIdAndUpdate(req.params["id"], juegoModificado, { new: true, runValidators: true }).then(resultadoMod => {
        if (resultadoMod)
            res.status(200).send({ ok: true, resultado: resultadoMod });
        else
            res.status(400).send({ ok: false, error: "Error modificando el juego" });
    }).catch((error) => {
        res.status(500).send({ ok: false, error: "No se encontraron juegos de mesa" })
    });
});

router.put('/ediciones/:id', (req, res) => {
    let edicionJuego = {
        nombre: req.body.nombre,
        anyo: req.body.anyo
    }
    Juego.findById(req.params["id"]).then(resultado => {
        if (resultado) {
            resultado.edicion.push(edicionJuego);
            resultado.save().then(() => {
                res.status(200).send({ ok: true, resultado: resultado });
            }).catch(() => {
                res.status(400).send({ ok: false, error: "Error añadiendo una edicion" });
            });

        }
        else
            res.status(400).send({ ok: false, error: "Error buscando por ID" });
    }).catch(error => {
        res.status(500).send({ ok: false, error: "No se encontraron juegos de mesa" })
    });
});

//? Servicio DELETE
router.delete('/:id', (req, res) => {
    Juego.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Error eliminando el juego" });
        }).cateh(error => {
            res.status(400)
                .send({ ok: false, error: "No se encontraron juegos de mesa" });
        })
});
router.delete('/ediciones/:id/:idEdicion', (req, res) => {
    Juego.findById(req.params['id']).then(resultado => {
        if (!resultado)
            res.status(400).send({ ok: false, error: "Error encontrando el juego" });

        let filterID = resultado.edicion.filter((e) => e.id != req.params['idEdicion']);
        Juego.findByIdAndUpdate(req.params['id'],{edicion:filterID},{ new: true, runValidators: true }).then((resultado) =>{
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Error eliminando la edición del juego" });
        });

    }).catch(error => {
        res.status(500).send({ ok: false, error: "Error encontrando por esa ID" });
    })
});
module.exports = router;


