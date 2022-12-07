import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./shared/menu/menu.component";
import { RestaurantsPageComponent } from "./restaurants/restaurants-page/restaurants-page.component";

@Component({
    selector: "fs-root",
    standalone: true,
    imports: [CommonModule, RestaurantsPageComponent,RouterModule,MenuComponent],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "angular-foodscore";
}
