"use strict";

// Create a class "Product" with name and price
// Create an array with at least 4 products
// Order that array by product's name and show it
// Order that array by product's price and show it

// a.sort((p1, p2) => );

class Product{
    name;
    price;
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
}

let product = [new Product("Manga",10.50),new Product("Figura",50.6),new Product("Comic",7.8),new Product("Pulsera",1)];


let productOrderByPrice = [...product];
let productOrderByName = [...product];
productOrderByPrice.sort((produc1,product2) => produc1.price-product2.price);
productOrderByName.sort((produc1,product2) => produc1.name.localeCompare(product2.name));
console.log(productOrderByPrice);
console.log(productOrderByName);
console.log(product);



