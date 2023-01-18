import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserService } from "src/app/auth/services/user.service";

@Component({
    selector: "fs-menu",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
    constructor(private readonly http: UserService) {}
    logged = this.http.logged;
}
