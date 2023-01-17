const moment = require('moment');

let antes = moment("16/09/2001", "DD/MM/YYYY");
let ahora = moment();
let despues = moment("16/09/2051", "DD/MM/YYYY");

let tiempoAhora = moment.duration(ahora.diff(antes)).years();
let tiempoFutura = moment.duration(despues.diff(ahora));

if (antes.isBefore(ahora))
{
    console.log("La fecha "+antes.format("DD/MM/YYY")+" es anterior a la fecha "+ahora.format("DD/MM/YYY"));
}
if (despues.isAfter(ahora)){
    console.log("La fecha "+despues.format("DD/MM/YYY")+" es posterior a la fecha "+ahora.format("DD/MM/YYY"));
}


console.log(tiempoAhora + " años han pasado");
console.log("Quedan "+tiempoFutura.years()+" años para que llegue y "+tiempoFutura.months()+" meses");

console.log(ahora.add(1,'month').format("DD/MM/YYYY"));