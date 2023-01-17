"use strict";
// Complete the exercise

import { validForm,days,openClosed } from "./functions.js";

let form = document.getElementById("newRestaurant");
let imgPreview = document.getElementById("imgPreview");
let tBody = document.querySelector("placesContainer");
let img = document.createElement("img");

let openingDays;



document.addEventListener("submit", e => {
    openingDays= Array.from(form.days).filter(i => i.checked).map(i => i.value);
    e.preventDefault();
    if (validForm(form, openingDays.toString())) {
        addFields();
        form.reset();
    };
   
    img.src = "";
});

function addFields() {

    let placesContainer = document.getElementById("placesContainer");
    let divCol = document.createElement("div");
    divCol.classList.add("col");

    let divCardHShadow = document.createElement("div");
    divCardHShadow.classList.add("card", "h-100", "shadow");

    //img
    let img = document.createElement("img");
    img.classList.add("card-img-top");

    let file = document.getElementById("image");
    let srcURL = URL.createObjectURL(file.files[0]);

    img.src = srcURL;

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let h4CardTitle = document.createElement("h4");
    h4CardTitle.classList.add("card-title");
    h4CardTitle.append(form.name.value);

    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    pCardText.append(form.description.value);

    let divCardText = document.createElement("div");
    divCardText.classList.add("card-text");

    let smallTextMuted = document.createElement("small");
    smallTextMuted.classList.add("text-muted");

    let strongTextMuted = document.createElement("strong");
    strongTextMuted.append("Open: ", days(openingDays));

    let spanBadge = document.createElement("span");
    openClosed(openingDays,spanBadge);


    let divCardText2 = document.createElement("div");
    let smallTextMuted2 = document.createElement("small");
    smallTextMuted2.classList.add("text-muted");
    let strongTextMuted2 = document.createElement("strong");
    strongTextMuted2.append("Phone: ", form.phone.value);

    smallTextMuted2.appendChild(strongTextMuted2);
    divCardText2.appendChild(smallTextMuted2);

    divCardBody.appendChild(h4CardTitle);
    divCardBody.appendChild(pCardText);

    smallTextMuted.appendChild(strongTextMuted);

    divCardText.appendChild(smallTextMuted);
    divCardText.appendChild(spanBadge);
    divCardBody.appendChild(divCardText);

    smallTextMuted2.appendChild(strongTextMuted2)
    divCardText2.appendChild(smallTextMuted2);
    divCardBody.appendChild(divCardText2);




    let divCardFooter = document.createElement("div");
    divCardFooter.classList.add("card-footer");
    let smallTextMuted3 = document.createElement("small");
    smallTextMuted3.classList.add("text-muted");
    smallTextMuted3.append(form.cuisine.value);

    divCardFooter.appendChild(smallTextMuted3);
    divCardHShadow.appendChild(img);
    divCardHShadow.appendChild(divCardBody);
    divCardHShadow.appendChild(divCardFooter);
    divCol.appendChild(divCardHShadow);
    placesContainer.appendChild(divCol);
}



form.image.addEventListener("change", e => {

    const file = form.image.files[0];
    if (file && file.type.startsWith('image')) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', e => {
            imgPreview.classList.remove("d-none");
            imgPreview.src = reader.result;
        });
    }
    else {
        imgPreview.src = "";
    }

});