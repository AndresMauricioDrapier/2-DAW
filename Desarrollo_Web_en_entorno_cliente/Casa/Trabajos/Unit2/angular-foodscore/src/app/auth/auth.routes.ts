import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leavePageGuard.guard";
import { RestaurantLoginComponent } from "./restaurant-login/restaurant-login.component";
import { RestaurantRegisterComponent } from "./restaurant-register/restaurant-register.component";

export const APP_ROUTES: Routes = [
    { path: "login", component: RestaurantLoginComponent },
    { path: "register", component: RestaurantRegisterComponent,canDeactivate:[leavePageGuard] }
];
