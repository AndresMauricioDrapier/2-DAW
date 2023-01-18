import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leavePageGuard.guard";

export const APP_ROUTES: Routes = [
    {
        path: "login",
        loadComponent: () =>
            import("./restaurant-login/restaurant-login.component").then(
                (m) => m.RestaurantLoginComponent
            ),
    },
    {
        path: "register",
        loadComponent: () =>
            import("./restaurant-register/restaurant-register.component").then(
                (m) => m.RestaurantRegisterComponent
            ),
        canDeactivate: [leavePageGuard],
    },
];
