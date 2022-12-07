import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { RestaurantService } from "../services/restaurant.service";
import { RouterModule } from "@angular/router";

@Component({
    selector: "fs-restaurant-card",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./restaurant-card.component.html",
    styleUrls: ["./restaurant-card.component.css"],
})
export class RestaurantCardComponent implements OnInit {
    @Input() restaurant!: Restaurant;
    @Output() deleted = new EventEmitter<void>();

    openDays: string[] = ["Su ", "Mo ", "Tu ", "We ", "Th ", "Fr ", "Sa "];

    constructor(private readonly http: RestaurantService) {}
    ngOnInit(): void {
        this.daysOpenString();
    }
    daysOpenString(): void {
        for (let i = 0; i < this.restaurant.daysOpen.length; i++) {
            switch (this.restaurant.daysOpen[i]) {
            case "0":
            case "Su":
                this.restaurant.daysOpen[i] = this.openDays[0];
                break;
            case "1":
            case "Mo":
                this.restaurant.daysOpen[i] = this.openDays[1];
                break;
            case "2":
            case "Tu":
                this.restaurant.daysOpen[i] = this.openDays[2];
                break;
            case "3":
            case "We":
                this.restaurant.daysOpen[i] = this.openDays[3];
                break;
            case "4":
            case "Th":
                this.restaurant.daysOpen[i] = this.openDays[4];
                break;
            case "5":
            case "Fr":
                this.restaurant.daysOpen[i] = this.openDays[5];
                break;
            case "6":
            case "Sa":
                this.restaurant.daysOpen[i] = this.openDays[6];
                break;
            }
        }
    }

    openOrClosed(day: string[]): boolean {
        if (day.includes(this.openDays[new Date().getDay()])) {
            return true;
        } else {
            return false;
        }
    }
    deleteRestaurant(): void {
        this.http.deleteRestaurant(this.restaurant.id!).subscribe({
            next: () => this.deleted.emit(),
            error: (error) => console.error(error),
        });
    }
}
