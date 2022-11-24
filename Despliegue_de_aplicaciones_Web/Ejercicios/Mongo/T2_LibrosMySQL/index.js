const express = require("express");
const sql = require("mysql");
let app = express();

let conexion = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "libros"
});

conexion.connect((error) =>{
    if(error)
        console.log("Error al conectar con la BD:",error);
    else
        console.log("Exito en la conexión");
});
app.use(express.json());

//#region GETS
app.get("/libros", (req,res) =>{
    conexion.query({
        sql: "SELECT * FROM libros"
    },(error,resultado,campos) =>{
        if(error)
            res.status(500).send({ok:false,error:"Error al realizar la select"});
        else
            res.status(200).send({ok:true,resultado:resultado});
    }
    );
});

app.get("/libros/:id", (req,res) =>{
    conexion.query({
        sql: "SELECT * FROM libros WHERE id = ?",
        values: req.params["id"]
    },(error,resultado,campos) =>{
        if(error)
            res.status(500).send({ok:false,error:"Error al realizar la select"});
        else
            res.status(200).send({ok:true,resultado:resultado});
    }
    );
});
//#endregion

//#region POST
app.post("/libros",(req,res) =>{
    const newLibro = {
        titulo:req.body.titulo,
        autor:req.body.autor,
        precio:req.body.precio
    }
    conexion.query({
        sql:"INSERT INTO libros SET ?",
        values:[newLibro]
    },(error,resultado,campos) =>{
        if(error && resultado.affectedRows==0)
            res.status(500).send({ok:false,error:"Error al insertar libro",error});
        else
            res.status(200).send({ok:true,resultado:resultado});
    });
});
//#endregion

//#region PUTS
app.put("/libros/:id",(req,res) =>{
    const datosModificados = {
        titulo:req.body.titulo,
        autor:req.body.autor,
        precio:req.body.precio
    };
    conexion.query({
        sql:"UPDATE libros SET ? WHERE id=?",
        values:[datosModificados,req.params["id"]]
    },(error,resultado,campos) =>{
        if(error&& resultado.affectedRows==0)
            res.status(500).send({ok:false,error:"Error actualizando libro",error});
        else
            res.status(200).send({ok:true,resultado:resultado});
    });
});

//#endregion

//#region DELETE
app.delete("/libros/:id",(req,res)=>{
    conexion.query({
        sql:"DELETE FROM libros WHERE id=?",
        values:req.params["id"]
    },(error,resultado,campos)=>{
        if(error && resultado.affectedRows==0)
            res.status(500).send({ok:false,error:"Error al borrar libro",error});
        else
            res.status(200).send({ok:true,resultado:resultado});
    });
});

//#endregion


app.listen(8080);