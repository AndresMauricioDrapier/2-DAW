"use strict";
// When the mouse is inside a div, it will have a light blue background (selected class). <br>
// When the mouse is out, remove that class.<br>
// If the user presses control + click, it will copy the text of the div inside the #result element

let div = document.getElementById('container');
let divChild = div.querySelectorAll('div');
let result = document.getElementById('result');

let toggleClass = function (e) {
    e.target.classList.toggle('selected');
};
let addText = function (e) {
    if (e.ctrlKey) {
        // ? result.innerText = e.target.textContent // Más facil también
        result.replaceChildren(e.target.textContent);
    }
};

divChild.forEach(divChild => {
    divChild.addEventListener('mouseenter', toggleClass);
    divChild.addEventListener('mouseleave', toggleClass);
});

divChild.forEach(child => {
    child.addEventListener('click', addText);
})










