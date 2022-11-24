// const http = require('http');



// let atenderPeticion = (request,response) => {
//     response.writeHead(200,{"Content-Type":"text/plain"});
//     response.write("Néstor no se entera ni del clima");
//     response.end();
// }

// http.createServer(atenderPeticion).listen(8080);


const http = require('http');
const fs = require('fs');
let atenderPeticion = (request, response) => {
 response.writeHead(200, {"Content-Type": "text/html"});
 // Leemos con la librería fs la página en cuestión
 var contenido = fs.readFileSync('./index.html', 'utf8');
 // Enviamos el contenido leído
 response.write(contenido);
 response.end();
}
http.createServer(atenderPeticion).listen(8080);