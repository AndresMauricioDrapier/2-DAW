import { RestaurantService } from "./restaurant-service.class.js";
import { days, openClosed } from "./validateForm.js";

let restaurants = new RestaurantService();
let placesContainer = document.getElementById("placesContainer");

restaurants.getAll().then(e =>
    e.restaurants.forEach(element => {
        showRestaurants(element);
    })
);

async function deleteRestaurant(element, divCol) {
    if (confirm("Sure deleting this restaurant?")) {
        await restaurants.delete(element.id);
        divCol.remove();
    }
}

let search = document.getElementById("search");

search.addEventListener("keyup", e =>{

    while(placesContainer.firstChild)
    {
        placesContainer.removeChild(placesContainer.firstChild);
    }

    restaurants.getAll().then(e =>{
        e.restaurants.filter(e => {
            if(e.name.toLowerCase().includes(search.value.toLowerCase()) || e.description.toLowerCase().includes(search.value.toLowerCase()))
            {
                showRestaurants(e);
            }
        });
    });
});

function showRestaurants(element) {

    //? -------------ELEMENT PRINCIPAL------------


    let divCol = document.createElement("div");
    divCol.classList.add("col");

    let divCardHShadow = document.createElement("div");
    divCardHShadow.classList.add("card", "h-100", "shadow");

    //? -------------ELEMENT IMG------------

    let img = document.createElement("img");
    img.classList.add("card-img-top");

    let file = document.getElementById("image");
    img.src = element.image;

    //? -------------ELEMENT BUTTON------------

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    button.append("delete");

    //? -------------ELEMENT NAME------------

    let h4CardTitle = document.createElement("h4");
    h4CardTitle.classList.add("card-title");
    h4CardTitle.append(element.name);

    //? -------------ELEMENT DESCRIPTION------------

    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    pCardText.append(element.description);

    //? -------------ELEMENT OPEN DAYS------------

    let divCardText = document.createElement("div");
    divCardText.classList.add("card-text");

    let smallTextMuted = document.createElement("small");
    smallTextMuted.classList.add("text-muted");

    let strongTextMuted = document.createElement("strong");
    strongTextMuted.append("Open: ", days(element.daysOpen));

    let spanBadge = document.createElement("span");
    openClosed(element.daysOpen, spanBadge);

    //? -------------ELEMENT PHONE------------

    let divCardText2 = document.createElement("div");
    let smallTextMuted2 = document.createElement("small");
    smallTextMuted2.classList.add("text-muted");
    let strongTextMuted2 = document.createElement("strong");
    strongTextMuted2.append("Phone: ", element.phone);

    //? -------------APPEND ALL BEFORE------------

    smallTextMuted2.appendChild(strongTextMuted2);
    divCardText2.appendChild(smallTextMuted2);

    divCardBody.appendChild(button);
    divCardBody.appendChild(h4CardTitle);
    divCardBody.appendChild(pCardText);

    smallTextMuted.appendChild(strongTextMuted);

    divCardText.appendChild(smallTextMuted);
    divCardText.appendChild(spanBadge);
    divCardBody.appendChild(divCardText);

    smallTextMuted2.appendChild(strongTextMuted2)
    divCardText2.appendChild(smallTextMuted2);
    divCardBody.appendChild(divCardText2);

    //? -------------ELEMENT CUISINE------------

    let divCardFooter = document.createElement("div");
    divCardFooter.classList.add("card-footer");
    let smallTextMuted3 = document.createElement("small");
    smallTextMuted3.classList.add("text-muted");
    smallTextMuted3.append(element.cuisine);

    //? -------------APPEND------------

    divCardFooter.appendChild(smallTextMuted3);
    divCardHShadow.appendChild(img);
    divCardHShadow.appendChild(divCardBody);
    divCardHShadow.appendChild(divCardFooter);
    divCol.appendChild(divCardHShadow);
    placesContainer.appendChild(divCol);

    //? -------------EVENT CLICK ON BUTTON RESTAURANT------------

    button.addEventListener("click", (e) => deleteRestaurant(element, divCol));
}
