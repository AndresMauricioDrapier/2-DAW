import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    { path: "auth", loadChildren : ()=> import("./auth/auth.routes").then(p => p.APP_ROUTES) },
    { path: "restaurants", loadChildren : ()=> import("./restaurants/Restaurant.routes").then(p => p.APP_ROUTES) },
    { path: "user", loadChildren : ()=> import("./users/user.routes").then(p => p.APP_ROUTES) },
    // Default route (empty) -> Redirect to restaurant page
    { path: "", redirectTo: "auth/login", pathMatch: "full" },
    // Doesn't match any of the above
    { path: "**", redirectTo: "auth/login" },
];
