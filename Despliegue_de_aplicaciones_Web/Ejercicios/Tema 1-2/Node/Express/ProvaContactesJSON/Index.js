const express = require("express");

let contactes = [
    {nom: "Nacho", edat: 41, telefon: "611223344"},
    {nom: "Ana", edat: 37, telefon: "699887766"},
    {nom: "Juan", edat: 70, telefon: "965661564"},
    {nom: "Pepe", edat: 15, telefon: "966555555"}
    ];
    let app = express();

    app.get("/contactos" , (req,res) => {
        res.send(contactes);
    });
    app.listen(8080);