import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";

@Component({
    selector: "fs-restaurant-card",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./restaurant-card.component.html",
    styleUrls: ["./restaurant-card.component.css"]
})
export class RestaurantCardComponent {

  @Input() restaurant!:Restaurant;
  @Output() deleted = new EventEmitter<void>();

  openOrClosed(day: string[]): boolean {

      if (day[new Date().getDay() - 1] != "") {
          return true;
      }
      else {
          return false;
      }
  }
  deleteRestaurant():void{
      this.deleted.emit();
  }

}
