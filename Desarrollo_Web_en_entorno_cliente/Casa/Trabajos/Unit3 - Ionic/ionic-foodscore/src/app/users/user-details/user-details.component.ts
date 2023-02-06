import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../interfaces/user";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { UserService } from "../services/user-service.service";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: "fs-user-details",
    standalone: true,
    imports: [CommonModule, RouterLink,IonicModule],
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
    user!: User;

    constructor(
        private route: ActivatedRoute,
        private readonly httpUser: UserService,
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
