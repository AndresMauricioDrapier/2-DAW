import swal from "sweetalert";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { MapService } from "./classes/map-service";
import { RestaurantService } from "./classes/restaurant-service";
import { Restaurant } from "./interfaces/restaurant";
import { validForm } from "./validateForm";

const restaurantService = new RestaurantService();
const form = document.getElementById("newRestaurant") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
AuthService.logout();

const userService = new AuthService();

userService.validateToken().then().catch(() =>{
    location.assign("../login.html");
});

const coordinates = {
    latitude: 0,
    longitude: 0
};



async function showMap(): Promise<void> {
    const coords = await GeolocationService.getLocation();
    coordinates.latitude = coords.latitude;
    coordinates.longitude = coords.longitude;
    const mapService = MapService.createMapService(coords, "map");
    mapService.createMarker(coords, "red");


    mapService.getSearch().on("select-result", e => {
        form.address.value = e.result.name;
        const coords = e.result.feature.geometry;
        coordinates.latitude = coords.get("latitude");
        coordinates.longitude = coords.get("longitude");

        mapService.createMarker({ latitude: coordinates.latitude, longitude: coordinates.longitude }, "green");
    });
}
showMap();

document.addEventListener("submit", e => {
    const openingDays = Array.from(form.days).filter(i => (i as HTMLInputElement).checked).map(i => (i as HTMLInputElement).value);
    let restaurant: Restaurant;
    e.preventDefault();
    if (validForm(form, openingDays, form.address.value)) {
        restaurant = {
            name: (form.name as unknown as HTMLInputElement).value,
            description: form.description.value,
            cuisine: form.cuisine.value,
            daysOpen: openingDays,
            image: imgPreview.src,
            phone: form.phone.value,
            address: form.description.value,
            lat: coordinates.latitude,
            lng: coordinates.longitude
        };
        restaurantService.post(restaurant).then(() => {
            form.reset();
            location.assign("../index.html");
        }).catch(e => {
            let message = "";
            for (let i = 0; i < e.message.length; i++) {
                message += e.message[i] + "\n";
            }
            swal("Registration error", message, "error");
        });
    }
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


