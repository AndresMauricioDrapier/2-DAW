import { Pipe, PipeTransform } from "@angular/core";
import { OPENDAYS } from "src/app/shared/consts";
import { Restaurant } from "../interfaces/restaurant";

@Pipe({
    name: "restaurantFilter",
    standalone: true,
})
export class RestaurantFilterPipe implements PipeTransform {
    transform(
        restaurant: Restaurant[],
        search: string,
        onlyOpen: boolean
    ): Restaurant[] {
        return restaurant.filter((r) => {
            if (onlyOpen) {
                return (
                    r.daysOpen.includes(OPENDAYS[new Date().getDay()]) &&
                    (r.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        r.name.toLowerCase().includes(search.toLowerCase()))
                );
            } else {
                return (
                    r.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    r.name.toLowerCase().includes(search.toLowerCase())
                );
            }
        });
    }
}
