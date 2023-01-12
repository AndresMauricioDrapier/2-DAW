const express = require('express');

let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/libros');
});

router.get('/register', (req, res) => {
    res.render('usuario_nuevo');
});

router.post('/register', (req, res) => {
    let nuevoUsuario = new Usuario({
        nombre: req.body.nombre,
        contraseña: req.body.contraseña,
    });
    nuevoUsuario.save().then(resultado => {
        res.redirect('login');
    }).catch(error => {
        res.render('error', { error: "Error insertando libro" });
    });
});


router.post('/login', (req, res) => {
    let nombre = req.body.nombre;
    let contraseña = req.body.contraseña;
    Usuario.find().then(usuarios => {
        let existeUsuario = usuarios.filter(usuario => usuario.nombre == nombre && usuario.contraseña == contraseña);
        if (existeUsuario.length > 0) {
            req.session.usuario = existeUsuario[0].nombre;
            req.session.contraseña = existeUsuario[0].contraseña;
            res.redirect('/libros');
        } else {
            res.render('login', { error: "Usuario o contraseña incorrectos" });
        }
    }).catch(error => {
    });


});

module.exports = router;