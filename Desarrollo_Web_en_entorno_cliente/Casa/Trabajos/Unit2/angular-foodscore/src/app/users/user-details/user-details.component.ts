import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../interfaces/user";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { UsersService } from "../services/user-service.service";
import { Restaurant } from "src/app/restaurants/interfaces/restaurant";
import { RestaurantService } from "src/app/restaurants/services/restaurant.service";
import { RestaurantCardComponent } from "src/app/restaurants/restaurant-card/restaurant-card.component";

@Component({
    selector: "fs-user-details",
    standalone: true,
    imports: [CommonModule, RouterLink, RestaurantCardComponent],
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
    user!: User;

    constructor(
        private route: ActivatedRoute,
        private readonly httpUser: UsersService,
        private readonly http: RestaurantService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            if (data["user"]) {
                this.user = data["user"];
            } else {
                this.httpUser.getUser().subscribe((data) => {
                    this.user = data;
                });
            }
        });
    }
}
