import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { FormsModule } from "@angular/forms";
import { RestaurantService } from "../services/restaurant.service";
import { Router, UrlTree } from "@angular/router";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Observable } from "rxjs";

@Component({
    selector: "fs-restaurant-form",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./restaurant-form.component.html",
    styleUrls: ["./restaurant-form.component.css"],
})
export class RestaurantFormComponent implements CanDeactivateComponent {
    openDays: string[] = ["Mo ", "Tu ", "We ", "Th ", "Fr ", "Sa ", "Su "];
    newRestaurant!: Restaurant;
    exit = false;

    constructor(
        private readonly http: RestaurantService,
        private readonly router: Router
    ) {
        this.resetRestaurant();
    }
    canDeactivate():| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.exit || confirm("Do you want to leave this page?. Changes can be lost");
    }

    daysOpenString(): void {
        for (let i = 0; i < this.openDays.length; i++) {
            if (this.newRestaurant.daysOpen[i]) {
                this.newRestaurant.daysOpen[i] = this.openDays[i];
            } else this.newRestaurant.daysOpen[i] = "";
        }
    }

    changeImage(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) {
            this.newRestaurant.image = "";
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener("loadend", () => {
            this.newRestaurant.image = reader.result as string;
        });
    }

    addRestaurant(): void {
        this.exit = true;
        this.daysOpenString();
        this.http.addRestaurant(this.newRestaurant).subscribe(() => {
            this.router.navigate(["/restaurants"]);
        });
    }
    private resetRestaurant(): void {
        this.newRestaurant = {
            name: "",
            description: "",
            cuisine: "",
            daysOpen: [],
            image: "",
            phone: "",
            address: "",
            lat: 0,
            lng: 0,
        };
    }
}
