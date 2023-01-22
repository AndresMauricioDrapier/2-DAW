import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { FormsModule } from "@angular/forms";
import { RestaurantFormComponent } from "../restaurant-form/restaurant-form.component";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import { RestaurantFilterPipe } from "../pipes/restaurant-filter.pipe";
import { RestaurantService } from "../services/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/auth/interfaces/user";
import { UsersService } from "src/app/users/services/user-service.service";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
    user!: User;
    active = true;
    filterSearch = "";
    constructor(
        private readonly http: RestaurantService,
        private readonly route: ActivatedRoute,
        private readonly httpUser: UsersService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params["creator"]) {
                this.httpUser.getUser(params["creator"]).subscribe((user) => {
                    this.user = user;
                });
                this.http.getRestaurants().subscribe(
                    (restaurant) =>
                        (this.restaurants = restaurant.filter((r) => {
                            return (
                                r.creator == params["creator"] ||
                                r.creator?.id == params["creator"]
                            );
                        }))
                );
            } else {
                this.http.getRestaurants().subscribe({
                    next: (rest) => (this.restaurants = rest),
                    error: (error) => console.log(error),
                });
            }
        });
    }

    changeClassButton(): boolean {
        this.active = !this.active;
        return this.active;
    }

    delete(restaurant: Restaurant): void {
        this.restaurants = this.restaurants.filter((p) => p != restaurant);
    }
}
