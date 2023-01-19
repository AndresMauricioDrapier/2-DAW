import { Component, OnChanges } from "@angular/core";
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
export class MenuComponent implements OnChanges {
    logged?: boolean;
    constructor(private readonly http: UserService) {}

    ngOnChanges(): void {
        this.http.loginChange$.subscribe((data) => {
            console.log(data);

        });
    }

    logout(): void {
        this.http.logout();
    }
}
