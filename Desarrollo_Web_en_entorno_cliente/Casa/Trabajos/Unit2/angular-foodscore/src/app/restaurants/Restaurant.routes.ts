import { Routes } from "@angular/router";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { RestaurantFormComponent } from "./restaurant-form/restaurant-form.component";
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";


export const APP_ROUTES: Routes = [
    { path: "", component: RestaurantsPageComponent },
    { path: "add",component: RestaurantFormComponent },
    { path: ":id",component: RestaurantDetailsComponent },
];
