'use strict';

let form = document.getElementById('form1');
let previwPhoto = document.getElementById("imgPreview");
let tbody = document.querySelector('tbody');

// Previw PHOTO 
form.photo.addEventListener("change", e => {
    const file = form.photo.files[0];
    if (file && file.type.startsWith('image')) { // file is undefined and first file.
        let reader = new FileReader();
        reader.readAsDataURL(file); // Read in base64

        reader.addEventListener('load', e => {
            // We preview the image
            previwPhoto.src = reader.result;
        });
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let hobbies = Array.from(form.hobbies).filter(hobbies => hobbies.checked).map(hobbies => hobbies.value).toString();
    let tr = document.createElement("tr");
    // 1st td
    let tdimg = document.createElement("td");
    let img = document.createElement("img");
    img.src = previwPhoto.src;
    tdimg.append(img);
    // 2nd td
    let tdName = document.createElement("td");
    tdName.append(form.name.value)
    // 3rd td
    let tdHobbies = document.createElement("td");
    tdHobbies.append(hobbies);
    // 4th td
    let tdFood = document.createElement("td");
    tdFood.append(form.food.value);
    // 5th td
    let tdLanguage = document.createElement("td");
    tdLanguage.append(form.language.value);

    tr.append(img,tdName,tdHobbies,tdFood,tdLanguage);
    tbody.append(tr);

    form.reset();
    // HAY QUE PONER EL CSS EN NULL
    previwPhoto.src = "";

});