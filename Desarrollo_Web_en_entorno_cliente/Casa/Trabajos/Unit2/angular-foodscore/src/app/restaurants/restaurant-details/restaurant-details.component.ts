import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
    selector: "fs-restaurant-details",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./restaurant-details.component.html",
    styleUrls: ["./restaurant-details.component.css"],
})
export class RestaurantDetailsComponent implements OnInit {
    restaurant!: Restaurant;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.route.data.subscribe(
            (data) => console.log(data)
        );
    }
    goBack():void {
        this.router.navigate(["/restaurants"]);
    }
}
