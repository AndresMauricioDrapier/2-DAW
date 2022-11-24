
let borrarPersona = (nombre, datos) => {
  return new Promise((resolve, reject) => {
    let resultado = datos.filter((persona) => {
      return persona.nombre != nombre.nombre;
    });

    if (resultado.length != 0) {
      datos = resultado;
      resolve(datos);
    } else {
      reject("Ese nombre no existe.");
    }
  });
};

let nuevaPersona = (nombre, datos) => {
  return new Promise((resolve, reject) => {
    let resultado = datos.filter((persona) => {
      return persona.nombre === nombre.nombre;
    });

    if (resultado.length == 0) {
      datos.push(nombre);
      resolve(datos);
    } else {
      reject("No hay resultados");
    }
  });
};

module.exports = {
  nuevaPersona: nuevaPersona,
  borrarPersona: borrarPersona,
};
