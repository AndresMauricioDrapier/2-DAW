const express = require('express');

let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
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
        res.render('error', {error: "Error insertando libro"});
    });
});


router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    let existeUsuario = usuarios.filter(usuario => usuario.usuario == login && usuario.password == password);
    if (existeUsuario.length > 0)
    {
        req.session.usuario = existeUsuario[0].usuario;
        req.session.rol = existeUsuario[0].rol;
        res.render('index');
    } else {
        res.render('login', {error: "Usuario o contraseña incorrectos"});
    }
});

module.exports = router;