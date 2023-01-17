const express = require("express");

let app = express();



app.get('/',(req,res) => {
    res.send("Bienvenido/a");
});
app.listen(8080);