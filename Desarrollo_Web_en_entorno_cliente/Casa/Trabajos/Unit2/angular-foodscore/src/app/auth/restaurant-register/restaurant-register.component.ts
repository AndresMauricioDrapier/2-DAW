import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { User } from "../interfaces/user";
import { sameEmails } from "src/app/shared/validators/sameEmail";
import { ArcgisMapComponent } from "src/app/shared/maps/arcgis-map/arcgis-map.component";
import { ArcgisMarkerDirective } from "src/app/shared/maps/arcgis-marker/arcgis-marker.directive";
import { ArcgisSearchDirective } from "src/app/shared/maps/arcgis-search/arcgis-search.directive";
import { SearchResult } from "src/app/shared/maps/interfaces/search-result";
import { UserService } from "../services/user.service";

@Component({
    selector: "fs-restaurant-register",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ArcgisMapComponent,
        ArcgisMarkerDirective,
        ArcgisSearchDirective,
    ],
    templateUrl: "./restaurant-register.component.html",
    styleUrls: ["./restaurant-register.component.css"],
})
export class RestaurantRegisterComponent implements OnInit, CanDeactivateComponent
{
    userForm!: FormGroup;
    nameControl!: FormControl<string>;
    emailControl!: FormControl<string>;
    email2Control!: FormControl<string>;
    passwordControl!: FormControl<string>;
    imageControl!: FormControl<string>;
    exit = false;

    newUser: User = {
        name: "",
        email: "",
        avatar: "",
        lat: 0,
        lng: 0,
    };

    constructor(
        private readonly http: UserService,
        private readonly router: Router,
        private readonly fb: NonNullableFormBuilder
    ) {}
    ngOnInit(): void {
        this.nameControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("[a-zA-Z ]+"),
        ]);
        this.emailControl = this.fb.control("", [
            Validators.required,
            Validators.email,
        ]);
        this.email2Control = this.fb.control("", [
            Validators.email,
            sameEmails(this.emailControl),
        ]);
        this.passwordControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("^.{4,}$"),
        ]);
        this.imageControl = this.fb.control("", [Validators.required]);
        this.userForm = this.fb.group({
            name: this.nameControl,
            email: this.emailControl,
            email2: this.email2Control,
            password: this.passwordControl,
            avatar: this.imageControl,
        });

        navigator.geolocation.getCurrentPosition((pos) => {
            this.newUser.lat = pos.coords.latitude;
            this.newUser.lng = pos.coords.longitude;
        });
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return (
            this.exit ||
            this.userForm.pristine ||
            confirm("Do you want to leave this page?. Changes can be lost")
        );
    }

    changeImage(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) {
            this.newUser.avatar = "";
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener("loadend", () => {
            this.newUser.avatar = reader.result as string;
        });
    }
    addUser(): void {
        this.newUser.name = this.nameControl.value;
        this.newUser.email = this.emailControl.value;
        this.newUser.password = this.passwordControl.value;
        this.newUser.avatar = this.imageControl.value;

        this.http.register(this.newUser).subscribe(() => {
            console.log("hola");
        });
    }

    searchResult(result: SearchResult): void {
        this.newUser.lat = result.latitude;
        this.newUser.lng = result.longitude;
        console.log("nuevo");
    }
    validClasses(
        ngModel: FormControl,
        validClass = "is-valid",
        errorClass = "is-invalid"
    ): object {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid,
        };
    }
}
