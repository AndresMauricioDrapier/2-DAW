const añadirBorrar = require("./personas");

let datos = [
  { nombre: "Nacho", telefono: "966112233", edad: 41 },
  { nombre: "Ana", telefono: "911223344", edad: 36 },
  { nombre: "Mario", telefono: "611998877", edad: 15 },
  { nombre: "Laura", telefono: "633663366", edad: 17 },
];

añadirBorrar.borrarPersona({ nombre: "Laura", telefono: "633663366", edad: 17 }, datos)
  .then((resultado) => {
    console.log(
      "Se ha borrado correctamente, estos son los resultados que quedan."
    );
    console.log(resultado);
  })
  .catch((error) => {
    console.error("Ese nombre no existe:" + error);
  });

añadirBorrar.nuevaPersona({ nombre: "Pepe", telefono: "966112233", edad: 41 }, datos)
  .then((resultado) => {
    console.log("Se ha subido correctamente");
    console.log(resultado);
  })
  .catch((error) => {
    console.error("Hay un error: " + error);
  });
