import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { FormsModule } from "@angular/forms";
import { RestaurantFormComponent } from "../restaurant-form/restaurant-form.component";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import { RestaurantFilterPipe } from "../pipes/restaurant-filter.pipe";

@Component({
    selector: "fs-restaurants-page",
    standalone: true,
    imports: [CommonModule, FormsModule,RestaurantFormComponent,RestaurantCardComponent,RestaurantFilterPipe],
    templateUrl: "./restaurants-page.component.html",
    styleUrls: ["./restaurants-page.component.css"]
})

export class RestaurantsPageComponent {

    restaurants: Restaurant[] = [
        {
            name: "hola",
            image: "/assets/descarga.jpg",
            cuisine: "hola",
            description: "hola",
            phone: "123456789",
            daysOpen: ["Mo ", "", "", "", "", "", "Su "]
        }
    ];
    active = true;
    filterSearch = "";
    changeClass():boolean{

        this.active=!this.active;
        return this.active;
    }
    addProduct(product: Restaurant):void {
        this.restaurants = [...this.restaurants, product];
    }
    delete(restaurant:Restaurant):void{
        this.restaurants = this.restaurants.filter(p => p!= restaurant);
    }

}
