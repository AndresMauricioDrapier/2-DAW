/*
 * Part 1
 * Create a function that receives 2 strings. The second string must contain only a letter
 * It should return the number of times that letter (second parameter) is included in the string (first parameter).
 * It should not differentiate between uppercase and lowercase letters
 * Check that both parameters are strings and the second string is only 1 character. If there's an error, print a message and return -1
 * Example: timesChar("Characteristic", "c") -> 3
 */
console.log("EXERCISE 1 - PART 1");

function timesChar(string, substri) {
  if (typeof string === "string" && substri.length === 1) {
    let times = string.match(new RegExp(substri, "gi")).length;

    console.log(`Substring: ${substri} appears ${times} times in ${string}`);
  } else {
    console.error("the string or the character we aren't correct");
    return -1;
  }
}
timesChar("hola", "h");

/*
 * Part 2
 * Create an array of strings.
 * Filter the array to include only the strings which their length is at least 5 characters
 * Transform all the strings in the filtered array to UPPERCASE
 * Print the resulting array, using ";" as the separator
 * Don't use traditional loops! (while, for, ...)
 */

console.log("EXERCISE 1 - PART 2");
let array = ["Comida", "yo", "hola", "Programar", "Ordenador", "Portatil"];

let arrayFilter = array
  .filter((nameArray) => nameArray.length >= 5)
  .map((nameUpper) => nameUpper.toUpperCase());
console.log(arrayFilter);
let string = arrayFilter.reduce(
  (resultadoFinal, elemento) => resultadoFinal + ";" + elemento
);
console.log(string);

/*
 * Part 3
 * Create a function that receives 3 parameters with default values (product -> "Generic product",
 * price -> 100, tax 21). Transform the product's name to string and the other 2 parameters to number.
 * If price or tax cannot be converted to number (NaN), show an error.
 * Finally, print the received product and the final price (including taxes)
 * Call this function several times, omitting parameters or sending not numeric values.
 */
console.log("EXERCISE 1 - PART 3");

function transform(product = "Generic product", price = 100, tax = 21) {
  product = String(product);
  if (isNaN(+price) || isNaN(+tax)) {
    console.error("Tax or price is not a number");
  } else {
    tax = "1." + tax;
    console.log(price * +tax);
  }
}
// transform("hola","hola",20);
// transform("hola",20,"hola");
// transform();
transform("hola", 20, 20);

/*
 * Part 4
 * Create an array with 4 values and do the following (use the correct array methods).
 * Add 2 elements at the beginning
 * Add 2 more at the end.
 * Delete positions 3,4 and 5
 * Insert 2 elements before the last element.
 * On each change, show the resulting array with its elements separated by '=>' (don't use any loop).
 */
console.log("EXERCISE 1 - PART 4");
let array4 = ["first", "second", "third", "Fourth"];
console.log(array4.toString());
array4.unshift("Cero", "One");
console.log(array4.toString());
array4.push("Fifth", "sixth");
console.log(array4.toString());
array4.splice(3, 4);
console.log(array4.toString());
array4.splice(array4.length - 1, 0, "Two", "Three");
console.log(array4.toString());

/*
 * Part 5
 * Create an array with several strings. Using the reduce method, return a string
 * that is a concatenation of the first letter of every string in the array.
 */

console.log("EXERCISE 1 - PART 5");

let array5 = ["First", "Second", "Third", "Fourth"];
let arrayReduce = array5.reduce(
  (finalResult, string) => finalResult + string.charAt(0, 1),
  ""
);
console.log(arrayReduce);

/*
 * Part 6
 * Create an array with several strings. Using the reduce method, return the total length of all the strings.
 */
console.log("EXERCISE 1 - PART 6");
let array6 = ["First", "Second", "Third", "Fourth"];
let array6Length = array6.reduce(
  (finalResult, string) => finalResult + string.length,
  0
);
console.log(array6Length);
/*
 * Part 7
 * Create a function that receives an array and adds the first three numbers of the array.
 * Use array destructuring in the parameters to get those three numbers.
 * If any of those numbers is not present in the array, a default value of 0 will be assigned
 * Return the result of adding those three numbers
 */
console.log("EXERCISE 1 - PART 7");
 let sum= ([n1=0,n2=0,n3=0]) => {
 return n1+n2+n3;
}
let array7 = [1, 2,4,5,234,234,234];
console.log(sum(array7)); 

/*
 * Part 8
 * Create a funcion that can receive as many numbers as you want by parameter. Use rest to group them in
 * an array and print the ones that are even and the ones that arre odd separately.
 * DON'T use loops (for, while, etc.)
 * Call this function several times with different values.
 */
console.log("EXERCISE 1 - PART 8");

let odd = (...even) => {
   console.log(`ODD: ${even.filter((num) => num%2 !=0).toString()}`);
   console.log(`EVEN: ${even.filter((num) => num%2 ==0).toString()}`); 
}
odd(1,2,3,4,5);
odd(100,21312,1231243);

/*
 * Part 9
 * Create a Map object. The key will be a student name, and the value an array with all his/her exam marks.
 * Iterate through the Map and show each student's name, the marks separated by '-' and the average mark (with 2 decimals).
 * Example: Peter (7.60 - 2.50 - 6.25 - 9.00). Average: 6.34
 */
console.log("EXERCISE 1 - PART 9");
let people = new Map();
people.set("Andres",[1.8,4.5,6.69,10,8.10]);
people.set("Pedro",[10,5,9,9.2,6.6]);
people.set("Joan",[6.9,8.8,7.7,9.9,7.85]);
people.set("Nestor",[6.7,8.2,5.3,9.8,10]);
people.forEach((person,name) => {
  let media = 0;
  for(let i=0;i<person.length;i++)
  {
    media+=person[i];
  }
  console.log(`${name} (${person}). Average: ${(media/person.length).toFixed(2)}`);
});

/*
 * Part 10
 * Create a function that receives an array, deletes its duplicated values and prints them.
 * Create a Set object from the array to delete the duplicated values.
 */
console.log("EXERCISE 1 - PART 10");

let arrayForDelete = ["Andres","Andres","Joan","Nestor","Pedro","Joan"];
let deleteArray = (array) =>{
  console.log(new Set(array));
};

deleteArray(arrayForDelete);