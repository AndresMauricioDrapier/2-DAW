import swal from "sweetalert";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { MapService } from "./classes/map-service";
import { RestaurantService } from "./classes/restaurant-service";
import { Comment } from "./interfaces/comment";
import { Restaurant } from "./interfaces/restaurant";
import { User } from "./interfaces/user";
import { days, openClosedHBS } from "./validateForm";
const RESTAURANT = require("../templates/restaurant.hbs");
const COMMENT = require("../templates/comment.hbs");


const restaurant = new RestaurantService();
const commentDescription = document.getElementById("commentForm") as HTMLFormElement;
AuthService.logout();


const coordinates = {
    latitude: 0,
    longitude: 0
};

function getId(): number {

    const split = window.location.href.split("?");

    if (!split[1].includes("id=")) {
        location.assign("../index.html");
    }
    return +split[1].split("=")[1];

}

let idRestaurant:number;

restaurant.get(getId()).then((e) => {
    showRestaurants(e.restaurant);
    coordinates.latitude = e.restaurant.lat;
    coordinates.longitude = e.restaurant.lng;
    showMap();
    userCreator(e.restaurant.creator);
    idRestaurant = e.restaurant.id;
    restaurant.getComments(e.restaurant.id).then((comments) => {
        comments.comments.forEach(comment => {
            userComment(comment);
        });

    });
    if(e.restaurant.mine)
    {
        commentDescription.classList.add("d-none");
    }
    
}).catch((e) => {
    swal("Error loading restaurant", e, "error").then(() => {
        console.log(e);
        // location.assign("../index.html");
    });

});

function showRestaurants(element: Restaurant): void {
    const placesContainer = document.getElementById("cardContainer");

    const divCol = document.createElement("div");
    const openOrClose = openClosedHBS(element.daysOpen);

    const producHTML = RESTAURANT({
        id: element.id,
        name: element.name,
        description: element.description,
        days: days(element.daysOpen),
        phone: element.phone,
        image: element.image,
        cuisine: element.cuisine,
        stars: Math.round(element.stars),
        distance: element.distance.toFixed(2),
        mine: element.mine,
        open: (openOrClose === "Open" ? true : false),
        fullStars: Array(element.stars).fill(""),
        emptyStars: Array(5 - element.stars).fill("")

    });

    divCol.classList.add("col");
    divCol.innerHTML = producHTML;

    if (element.mine) {
        const button = divCol.querySelector("button");
        button.addEventListener("click", () => deleteRestaurant(element, divCol));
    }
    clickStars();
    placesContainer.append(divCol);

}


async function deleteRestaurant(element: Restaurant, divCol: HTMLElement): Promise<void> {
    if (confirm("Sure deleting this restaurant?")) {
        const response = await restaurant.delete(element.id);
        divCol.remove();
        location.assign("../index.html");
        return response;
    }
}




async function showMap(): Promise<void> {
    const mapService = MapService.createMapService(coordinates, "map");
    mapService.createMarker(coordinates, "purple");
}

function userCreator(user: User): void {
    const creatorImg = document.getElementById("creatorImg") as HTMLImageElement;
    const creatorName = document.getElementById("creatorName") as HTMLInputElement;
    const creatorEmail = document.getElementById("creatorEmail") as HTMLInputElement;
    creatorImg.src = user.avatar;
    creatorName.append(user.name);
    creatorEmail.append(user.email);
    eventUser(user.id);


}

function eventUser(id: number): void {
    const cardBody = document.getElementsByClassName("card-body");
    cardBody[1].addEventListener("click", () => {
        console.log(id);
        //location.assign("../profile.html?id=" + id);
    });
}


function userComment(comment: Comment): void {
    const comments = document.getElementById("comments");
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "flex-row");

    const commentUser = COMMENT({
        id: comment.user.id,
        avatar: comment.user.avatar,
        name: comment.user.name,
        text:comment.text,
        fullStars: Array(comment.stars).fill(""),
        emptyStars: Array(5 - comment.stars).fill(""),
        date:comment.date


    });
    li.innerHTML = commentUser;
    comments.append(li);
}


function clickStars(): void {
    const stars = document.getElementById("stars").children;

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener("click", () => {
            const numberStars = +(stars[i] as HTMLElement).dataset.score;
            for (let a = 1; a <= numberStars; a++) {
                (stars[a - 1] as HTMLElement).textContent = "★";
            }
            for (let a = numberStars + 1; a <= 5; a++) {
                (stars[a - 1] as HTMLElement).textContent = "☆";
            }
        });
    }
}



document.addEventListener("submit",(e)=>{
    e.preventDefault();
    const stars = document.getElementById("stars").children;
    
    let numStars:number;
    for (let i = 1; i <= stars.length; i++) {
        if((stars[i - 1] as HTMLElement).textContent === "★"){
            numStars = +(stars[i - 1] as HTMLElement).dataset.score;
        }
    }
    
    restaurant.addComment(idRestaurant,{
        "stars":numStars,
        "text":commentDescription.comment.value
    }).then(()=>{
        commentDescription.classList.add("d-none");
    });
});

