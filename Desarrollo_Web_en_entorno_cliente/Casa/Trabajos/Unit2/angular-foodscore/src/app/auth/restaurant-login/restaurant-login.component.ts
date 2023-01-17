import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: "fs-restaurant-login",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: "./restaurant-login.component.html",
    styleUrls: ["./restaurant-login.component.css"],
})
export class RestaurantLoginComponent {
    constructor(private readonly router: Router) {}
    goRestaurants(): void {
        this.router.navigate(["/restaurants"]);
    }
    goRegister(): void {
        this.router.navigate(["/auth/register"]);
    }
}
