import { Routes } from "@angular/router";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { RestaurantFormComponent } from "./restaurant-form/restaurant-form.component";
import { RestaurantLoginComponent } from "./restaurant-login/restaurant-login.component";
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";

export const APP_ROUTES: Routes = [
    { path: "auth/login", component: RestaurantLoginComponent },
    { path: "restaurants", component: RestaurantsPageComponent },
    { path: "restaurants/add",component: RestaurantFormComponent },
    { path: "restaurants/:id",component: RestaurantDetailsComponent },
    // Default route (empty) -> Redirect to restaurant page
    { path: "", redirectTo: "/auth/login", pathMatch: "full" },
    // Doesn't match any of the above
    { path: "**", redirectTo: "/auth/login" },
];
