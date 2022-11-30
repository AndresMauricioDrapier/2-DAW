import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leavePageGuard.guard";
import { productIdGuard } from "./guards/restaurantIdGuard.guard";
import { restaurantResolve } from "./resolvers/restaurant.resolver";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { RestaurantFormComponent } from "./restaurant-form/restaurant-form.component";
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";

export const APP_ROUTES: Routes = [
    { path: "", component: RestaurantsPageComponent },
    { path: "add", component: RestaurantFormComponent, canDeactivate:[leavePageGuard] },
    {
        path: ":id",
        component: RestaurantDetailsComponent,
        canActivate:[productIdGuard],
        resolve: {
            product: restaurantResolve,
        },
    },
];
