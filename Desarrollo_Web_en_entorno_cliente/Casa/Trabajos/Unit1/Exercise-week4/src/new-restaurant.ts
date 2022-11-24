"use strict";
import { RestaurantService } from "./restaurant-service.class";
import { validForm } from "./validateForm";
// eslint-disable-next-line no-unused-vars
import "../styles.css";

const restaurantService = new RestaurantService();

const form = document.getElementById("newRestaurant") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
const img = document.createElement("img");

let openingDays;

document.addEventListener("submit", e => {
    openingDays = Array.from(form.days).filter(i => (i as HTMLInputElement).checked).map(i => (i as HTMLInputElement).value);
    e.preventDefault();
    if (validForm(form, openingDays.toString())) {
        restaurantService.post(
            {
                "name": (form.name as unknown as HTMLInputElement).value,
                "description": form.description.value,
                "daysOpen": openingDays,
                "phone": form.phone.value,
                "cuisine": form.cuisine.value,
                "image": imgPreview.src,
            }
        ).then(() => {
            form.reset();
            location.assign("../index.html");
        }).catch(e => alert(e));

    }

    img.src = "";
});


form.image.addEventListener("change", () => {

    const file = form.image.files[0];
    if (file && file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            imgPreview.classList.remove("d-none");
            imgPreview.src = reader.result as string;
        });
    }
    else {
        imgPreview.src = "";
    }

});