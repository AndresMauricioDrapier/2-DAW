import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leavePageGuard.guard";
import { restaurantIdGuard } from "./guards/restaurantIdGuard.guard";
import { restaurantResolve } from "./resolvers/restaurant.resolver";
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";

export const APP_ROUTES: Routes = [
    { path: "", component: RestaurantsPageComponent },
    {
        path: "add",
        loadComponent: () =>
            import("./restaurant-form/restaurant-form.component").then((m) => m.RestaurantFormComponent),
        canDeactivate: [leavePageGuard],
    },
    {
        path: ":id",
        loadComponent: () =>
            import("./restaurant-details/restaurant-details.component").then((m) => m.RestaurantDetailsComponent),
        canActivate: [restaurantIdGuard],
        resolve: {
            restaurant: restaurantResolve,
        },
    },
];
