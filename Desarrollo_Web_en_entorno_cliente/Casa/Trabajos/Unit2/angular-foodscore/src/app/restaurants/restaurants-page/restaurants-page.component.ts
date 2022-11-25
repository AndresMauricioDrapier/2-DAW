import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { FormsModule } from "@angular/forms";
import { RestaurantFormComponent } from "../restaurant-form/restaurant-form.component";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import { RestaurantFilterPipe } from "../pipes/restaurant-filter.pipe";
import { RestaurantService } from "../services/restaurant.service";

@Component({
    selector: "fs-restaurants-page",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RestaurantFormComponent,
        RestaurantCardComponent,
        RestaurantFilterPipe,
    ],
    templateUrl: "./restaurants-page.component.html",
    styleUrls: ["./restaurants-page.component.css"],
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];
    active = true;
    filterSearch = "";

    constructor(private readonly http: RestaurantService) {}
    ngOnInit(): void {
        this.http.getRestaurants().subscribe({
            next: (rest) => (this.restaurants = rest),
            error: (error) => console.log(error)
        });
    }

    changeClass(): boolean {
        this.active = !this.active;
        return this.active;
    }
    delete(restaurant: Restaurant): void {
        this.restaurants = this.restaurants.filter((p) => p != restaurant);
    }
}
