const mysql = require("mysql");
const express = require("express");
let app = express();

let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos"
});
conexion.connect((error) => {
    if (error)
        console.log("Error al conectar con la BD:", error);
    else
        console.log("Conexion satisfactoria");
});

app.use(express.json());

//#region SELECTS
app.get("/contactos", (req, res) => {
    conexion.query("SELECT * FROM contactos ORDER BY id DESC", (error, resultado, campos) => {
        if (error)
            res.status(500).send({ ok: false, error: "Error listando contactos" });
        else {
            console.log("hola");
            res.status(200).send({ ok: true, resultado: resultado });
        }

    });

});

//SELECT POR ID
app.get("/contactos/:id", (req, res) => {
    conexion.query({
        sql: "SELECT * FROM contactos WHERE id=? ORDER BY id DESC",
        values: [req.params["id"]]
    }, (error, resultado, campos) => {
        if (error)
            res.status(500).send({ ok: false, error: "Error listando contactos" });
        else {
            console.log("hola");
            res.status(200).send({ ok: true, resultado: resultado[0] });
        }

    });

});
//#endregion

//#region  INSERTS
app.post("/contactos", (req, res) => {
    conexion.query({
        sql: "INSERT INTO contactos SET ?",
        values: { nombre: req.body.nombre, telefono: req.body.telefono }
    }, (error, resultado, campos) => {
        if (error)
            res.status(500).send({ ok: false, error: "Error al procesar la inserción" });
        else
            res.status(200).send({ ok: true, resultado: "Nuevo id: " + resultado.insertId });
    });
})
//#endregion

//#region UPDATE
app.put('/contactos/:id', (req, res) => {
    let datosModificados = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    conexion.query("UPDATE contactos SET ? WHERE id = ?",
        [datosModificados, req.params['id']],
        (error, resultado, campos) => {
            if (error)
                res.status(400)
                    .send({
                        ok: false,
                        error: "Error modificando contacto"
                    });
            else
                res.status(200)
                    .send({
                        ok: true,
                        resultado: resultado
                    });
        });
});
//#endregion

//#region DELETE
app.delete("/contactos/:id", (req, res) => {
    conexion.query({
        sql: "DELETE FROM contactos WHERE id >= ?",
        values: [req.params["id"]]
    },
        (error, resultado, campos) => {
            if (error)
                res.status(500).send({ ok: false, error: "Error al realizar el borrado" });
            else
                res.status(200).send({ ok: true, resultado: resultado });
        });
});

//#endregion

app.listen(8080);