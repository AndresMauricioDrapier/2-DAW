"use strict";
import { RestaurantService } from "./restaurant-service.class.js";
import { validForm } from "./validateForm.js";

let restaurantService = new RestaurantService();

let form = document.getElementById("newRestaurant");
let imgPreview = document.getElementById("imgPreview");
let tBody = document.querySelector("placesContainer");
let img = document.createElement("img");

let openingDays;

document.addEventListener("submit", e => {
    openingDays = Array.from(form.days).filter(i => i.checked).map(i => i.value);
    e.preventDefault();
    if (validForm(form, openingDays.toString())) {
        restaurantService.post(
            {
                "name": form.name.value,
                "description": form.description.value,
                "daysOpen": openingDays,
                "phone": form.phone.value,
                "cuisine": form.cuisine.value,
                "image": imgPreview.src,
            }
        ).then(() => {
            form.reset();
            location.assign("./index.html");
        }).catch(e => alert(e));
        
    };

    img.src = "";
});


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