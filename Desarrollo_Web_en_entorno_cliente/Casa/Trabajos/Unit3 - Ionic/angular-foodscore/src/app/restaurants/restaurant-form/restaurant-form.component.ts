import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Restaurant } from "../interfaces/restaurant";
import { OPENDAYS } from "../../shared/consts";
import {
    FormArray,
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { RestaurantService } from "../services/restaurant.service";
import { ActivatedRoute, Router, UrlTree } from "@angular/router";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Observable } from "rxjs";
import { oneChecked } from "src/app/shared/validators/checkedArray.validator";
import { ArcgisMapComponent } from "src/app/shared/maps/arcgis-map/arcgis-map.component";
import { ArcgisMarkerDirective } from "src/app/shared/maps/arcgis-marker/arcgis-marker.directive";
import { ArcgisSearchDirective } from "src/app/shared/maps/arcgis-search/arcgis-search.directive";
import { SearchResult } from "src/app/shared/maps/interfaces/search-result";
import Swal from "sweetalert2";

@Component({
    selector: "fs-restaurant-form",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ArcgisMapComponent,
        ArcgisMarkerDirective,
        ArcgisSearchDirective,
    ],
    templateUrl: "./restaurant-form.component.html",
    styleUrls: ["./restaurant-form.component.css"],
})
export class RestaurantFormComponent implements OnInit, CanDeactivateComponent {
    restaurantForm!: FormGroup;
    nameControl!: FormControl<string>;
    descriptionControl!: FormControl<string>;
    cuisineControl!: FormControl;
    daysOpenArray!: FormArray;
    phoneControl!: FormControl<string>;
    imageControl!: FormControl<string>;
    addressControl!: FormControl<string>;
    exit = false;
    daysOpen = OPENDAYS;

    newRestaurant: Restaurant = {
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

    data!: Restaurant;

    constructor(
        private readonly http: RestaurantService,
        private readonly router: Router,
        private readonly fb: NonNullableFormBuilder,
        private readonly route: ActivatedRoute
    ) {
        this.route.data.subscribe((data) => {
            if (data["restaurant"]) {
                this.data = data["restaurant"];
                this.newRestaurant = data["restaurant"];
            }
        });
    }
    ngOnInit(): void {
        this.nameControl = this.fb.control(this.newRestaurant.name, [
            Validators.required,
            Validators.pattern("[a-zA-Z ]+"),
        ]);
        this.descriptionControl = this.fb.control(
            this.newRestaurant.description,
            [Validators.required]
        );

        this.data
            ? (this.daysOpenArray = this.fb.array(
                this.booleanArray(),
                oneChecked()
            ))
            : (this.daysOpenArray = this.fb.array(
                new Array(7).fill(true),
                oneChecked()
            ));
        this.cuisineControl = this.fb.control(this.newRestaurant.cuisine, [
            Validators.required,
        ]);
        this.phoneControl = this.fb.control(this.newRestaurant.phone, [
            Validators.required,
            Validators.pattern("(\\+?[0-9]2 ?)?[0-9]{9}"),
        ]);
        this.imageControl = this.fb.control("", [
            Validators.required,
        ]);
        this.addressControl = this.fb.control(this.newRestaurant.address);

        this.restaurantForm = this.fb.group({
            name: this.nameControl,
            description: this.descriptionControl,
            cuisine: this.cuisineControl,
            checkDay: this.daysOpenArray,
            phone: this.phoneControl,
            image: this.imageControl,
            address: this.addressControl,
        });
        navigator.geolocation.getCurrentPosition((pos) => {
            this.newRestaurant.lat = pos.coords.latitude;
            this.newRestaurant.lng = pos.coords.longitude;
        });
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.exit || this.restaurantForm.pristine) {
            return true;
        } else {
            return Swal.fire({
                title: "Do you want to leave this page?",
                showDenyButton: true,
                confirmButtonText: "Exit",
                denyButtonText: "Don't exit",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Changes have not been saved", "", "info");
                    return true;
                } else {
                    return false;
                }
            });
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

    searchResult(result: SearchResult): void {
        this.newRestaurant.lat = result.latitude;
        this.newRestaurant.lng = result.longitude;
        this.newRestaurant.address = result.address;
    }
    addRestaurant(): void {
        this.addFormToRestaurant();
        this.exit = true;

        this.route.data.subscribe((data) => {
            if (data["restaurant"]) {
                this.http
                    .addRestaurant(this.newRestaurant, data["restaurant"].id)
                    .subscribe({
                        next: () => {

                            this.router.navigate(["/restaurants"]);
                        },
                        error: (e) => console.log(e),
                    });
            } else {
                this.http.addRestaurant(this.newRestaurant).subscribe({
                    next: () => this.router.navigate(["/restaurants"]),
                    error: (e) => console.log(e),
                });
            }
        });
    }

    addFormToRestaurant(): void {
        const arrayForm: Array<string> = [];
        this.daysOpenArray.value.map((v: Boolean, i: number) => {
            if (v === true) {
                arrayForm.push(i + "");
            }
        });

        this.newRestaurant.name = this.nameControl.value;
        this.newRestaurant.description = this.descriptionControl.value;
        this.newRestaurant.cuisine = this.cuisineControl.value;
        this.newRestaurant.daysOpen = arrayForm;
        this.newRestaurant.phone = this.phoneControl.value;
    }
    validClasses(
        ngModel: FormControl | FormArray,
        validClass = "is-valid",
        errorClass = "is-invalid"
    ): object {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid,
        };
    }

    booleanArray(): boolean[] {
        const array: boolean[] = new Array(7).fill(false);

        if (this.data.id) {
            for (let i = 0; i < this.newRestaurant.daysOpen.length; i++) {
                switch (this.newRestaurant.daysOpen[i]) {
                case "0":
                case "Su":
                    array[0] = true;
                    break;
                case "1":
                case "Mo":
                    array[1] = true;
                    break;
                case "2":
                case "Tu":
                    array[2] = true;
                    break;
                case "3":
                case "We":
                    array[3] = true;
                    break;
                case "4":
                case "Th":
                    array[4] = true;
                    break;
                case "5":
                case "Fr":
                    array[5] = true;
                    break;
                case "6":
                case "Sa":
                    array[6] = true;
                    break;
                }
            }
        }

        return array;
    }
}
