// Servicios para ver los juegos por query selector y por parametros, además de modificar, añadir y borrar juegos.

const express = require("express");
const utilidades = require("./utilidades.js");
const miFichero = "juegos.json";
let app = express();
app.use(express.json());

let juegos = utilidades.cargarJuegos(miFichero);

app.get("/juegos", (req, res) => {
    if (Object.keys(req.query).length == 0) {
        if (juegos && juegos.length > 0) {
            res.status(200).send({ ok: true, resultado: juegos })
        }
        else {
            res.status(400).send({ ok: false, error: "Hay un fallo en la petición" });
            res.status(500).send({ ok: false, error: "Hay un fallo en el servidor" });

        }
    } else if (req.query['tipo'] && req.query['anyos']) {

        if (req.query['anyos'] >= 0) {
            let juegoFiltrado = juegos.filter(juego => {
                return juego.edadMinima <= req.query['anyos'] && juego.tipo.includes(req.query['tipo']);
            });
            if (juegoFiltrado && juegoFiltrado.length > 0) {
                res.status(200).send({ ok: true, resultado: juegoFiltrado })
            }
            else {
                res.status(500).send({ ok: false, error: "Hay un fallo en el servidor" });
            }
        }
        else {
            res.status(400).send({ ok: false, error: "Edad mínima recomendada en años inválida" });
        }
    } else if (req.query['anyos']) {
        if (req.query['anyos'] >= 0) {
            let juegoFiltrado = juegos.filter(juego => {
                return juego.edadMinima <= req.query['anyos'];
            });
            if (juegoFiltrado && juegoFiltrado.length > 0) {
                res.status(200).send({ ok: true, resultado: juegoFiltrado })
            }
            else {
                res.status(500).send({ ok: false, error: "Hay un fallo en el servidor" });
            }
        }
        else {
            res.status(400).send({ ok: false, error: "Edad mínima recomendada en años inválida" });
        }

    }
    else if (req.query['tipo']) {
        let juegoFiltrado = juegos.filter(juego => {
            return juego.tipo.includes(req.query['tipo']);
        });
        if (juegoFiltrado && juegoFiltrado.length > 0) {
            res.status(200).send({ ok: true, resultado: juegoFiltrado })
        }
        else {
            res.status(500).send({ ok: false, error: "Hay un fallo en el servidor" });
        }
    }


});

app.get('/juegos/:id', (req, res) => {
    let idJuegos = juegos.filter(juego => {
        return juego.id == req.params['id'];
    });
    if (idJuegos && idJuegos.length > 0) {
        res.status(200).send({ ok: true, resultado: idJuegos[0] })
    }
    else
        res.status(400).send({ ok: false, error: "Código de juego inexistente" });
});

app.post('/juegos', (req, res) => {
    let nuevoJuego = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edadMinima: req.body.edadMinima,
        numeroJugadores: req.body.numeroJugadores,
        tipo: req.body.tipo,
        precio: req.body.precio
    };
    //validar juego si existe
    let existe = juegos.filter(
        juego => juego.id == nuevoJuego.id);
    if (existe.length == 0) {
        juegos.push(nuevoJuego);
        utilidades.guardarJuegos(miFichero, juegos);
        res.status(200).send({ ok: true, resultado: juegos });
    } else {
        res.status(400).send({ ok: false, error: "Código de juego repetido" }); ç
    }
});

app.put('/juegos/:id', (req, res) => {
    let existe = juegos.filter(juego => juego.id == req.params['id']);

    if (existe.length > 0) {
        let juegoModificado = existe[0];
        juegoModificado.nombre = req.body.nombre;
        juegoModificado.descripcion = req.body.descripcion;
        juegoModificado.edadMinima = req.body.edadMinima;
        juegoModificado.numeroJugadores = req.body.numeroJugadores;
        juegoModificado.tipo = req.body.tipo;
        juegoModificado.precio = req.body.precio;

        utilidades.guardarJuegos(miFichero, juegos);

        res.status(200).send({ ok: true, resultado: juegoModificado });
        
    }
    else {
        res.status(400).send({ ok: false, error: "Juego no encontrado" });
    }
});
app.delete('/juegos/:id', (req, res) => {
    let juegoBorrado = juegos.filter(juego => juego.id != req.params['id']);
    if (juegos.length != juegoBorrado.length) {
        utilidades.guardarJuegos(miFichero, juegoBorrado);
        res.status(200).send({ ok: true, resultado: juegoBorrado })
    } else {
        res.status(400).send({ ok: false, error: "Juego no se ha encontrado" });
    }
});


app.listen(8080);


