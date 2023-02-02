import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY} from "rxjs";
import { Restaurant } from "../interfaces/restaurant";
import { RestaurantService } from "../services/restaurant.service";

export const restaurantResolve: ResolveFn<Restaurant> = (route) => {
    return inject(RestaurantService)
        .getIdRestaurant(+route.params["id"])
        .pipe(
            catchError(() => {
                inject(Router).navigate(["/restaurants"]);
                return EMPTY;
            })
        );
};
