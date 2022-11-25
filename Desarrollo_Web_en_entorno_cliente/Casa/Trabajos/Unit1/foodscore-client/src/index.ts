import "../styles.css";
import { Restaurant } from "./interfaces/restaurant";
import { RestaurantService } from "./classes/restaurant-service";
import { days, openClosedHBS } from "./validateForm";
import { AuthService } from "./classes/auth-service";
import Swal from "sweetalert2";
const RESTAURANT = require("../templates/restaurant.hbs");

const restaurants = new RestaurantService();
const placesContainer = document.getElementById("placesContainer");
const userService = new AuthService();

AuthService.logout();

userService
    .validateToken()
    .then()
    .catch(() => {
        location.assign("../login.html");
    });

restaurants.getAll().then((e) =>
    e.restaurants.forEach((element) => {
        showRestaurants(element);
    })
);

async function deleteRestaurant(
    element: Restaurant,
    divCol: HTMLElement
): Promise<void> {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const response = await restaurants.delete(element.id);
            divCol.remove();
            return response;
        }
    });
}

function showRestaurants(element: Restaurant): void {
    const divCol = document.createElement("div");
    divCol.classList.add("col");

    const openOrClose = openClosedHBS(element.daysOpen);
    const producHTML = RESTAURANT({
        id: element.id,
        name: element.name,
        description: element.description,
        days: days(element.daysOpen),
        phone: element.phone,
        image: element.image,
        cuisine: element.cuisine,
        stars: element.stars,
        distance: element.distance.toFixed(2),
        mine: element.mine,
        open: openOrClose === "Open" ? true : false,
        fullStars: Array(element.stars).fill(""),
        emptyStars: Array(5 - element.stars).fill(""),
    });
    divCol.innerHTML = producHTML;

    if (element.mine) {
        const button = divCol.querySelector("button");
        button.addEventListener("click", () =>
            deleteRestaurant(element, divCol)
        );
    }

    placesContainer.append(divCol);
}

const search = document.getElementById("search") as HTMLInputElement;
search.addEventListener("keyup", () => {
    while (placesContainer.firstChild) {
        placesContainer.removeChild(placesContainer.firstChild);
    }

    restaurants.getAll().then((e) => {
        e.restaurants.filter((e) => {
            if (
                e.name.toLowerCase().includes(search.value.toLowerCase()) ||
                e.description.toLowerCase().includes(search.value.toLowerCase())
            ) {
                showRestaurants(e);
            }
        });
    });
});
