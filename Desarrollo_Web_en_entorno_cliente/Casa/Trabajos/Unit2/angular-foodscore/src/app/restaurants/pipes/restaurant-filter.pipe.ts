import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from "../interfaces/restaurant";

@Pipe({
    name: "restaurantFilter",
    standalone: true,
})
export class RestaurantFilterPipe implements PipeTransform {
    transform(restaurant: Restaurant[],search: string,onlyOpen: boolean): Restaurant[] {
        return restaurant.filter((r) => {
            const openDays= ["Mo ", "Tu ", "We ", "Th ", "Fr ", "Sa ", "Su "];
            if(onlyOpen)
            {
                return r.daysOpen.includes(openDays[new Date().getDay() - 1]) && (r.description.toLowerCase().includes(search.toLowerCase()) ||r.name.toLowerCase().includes(search.toLowerCase()));
            }
            else
            {
                return r.description.toLowerCase().includes(search.toLowerCase()) ||r.name.toLowerCase().includes(search.toLowerCase());
            }

        });
    }
}
