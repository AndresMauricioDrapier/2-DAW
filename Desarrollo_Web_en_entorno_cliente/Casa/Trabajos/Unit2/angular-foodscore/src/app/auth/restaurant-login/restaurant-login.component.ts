import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GoogleLoginDirective } from "./google-login/google-login.directive";
import { FbLoginDirective } from "./facebook-login/fb-login.directive";
import { UserService } from "../services/user.service";
import { UserLogin } from "../interfaces/user";
import Swal from "sweetalert2";

@Component({
    selector: "fs-restaurant-login",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        GoogleLoginDirective,
        FbLoginDirective,
        ReactiveFormsModule,
    ],
    templateUrl: "./restaurant-login.component.html",
    styleUrls: ["./restaurant-login.component.css"],
})
export class RestaurantLoginComponent implements OnInit {
    userForm!: FormGroup;
    emailControl!: FormControl<string>;
    passwordControl!: FormControl<string>;
    googleIcon = faGoogle;
    fbIcon = faFacebook;

    userInfo: UserLogin = {
        email: "",
        password: "",
        lat: 0,
        lng: 0,
        token: "",
        userId: "",
    };

    constructor(
        private readonly router: Router,
        private readonly http: UserService,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.emailControl = this.fb.control("", [
            Validators.required,
            Validators.email,
        ]);
        this.passwordControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("^.{4,}$"),
        ]);
        this.userForm = this.fb.group({
            email: this.emailControl,
            password: this.passwordControl,
        });

        navigator.geolocation.getCurrentPosition((pos) => {
            this.userInfo.lat = pos.coords.latitude;
            this.userInfo.lng = pos.coords.longitude;
        });
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

    loggedGoogle(user: gapi.auth2.GoogleUser): void {
        this.userInfo.token = user.getAuthResponse().id_token;
        console.log(this.userInfo, user.getAuthResponse().id_token);

        this.http.loginGoogle(this.userInfo);
    }

    loggedFacebook(resp: fb.StatusResponse): void {
        this.userInfo.token = resp.authResponse.accessToken;
        this.userInfo.userId = resp.authResponse.userID;
        this.http.loginFaceebok(this.userInfo);
    }

    loggin(): void {
        this.userInfo.email = this.userForm.controls["email"].value;
        this.userInfo.password = this.userForm.controls["password"].value;
        this.http.login(this.userInfo).subscribe({
            next: () => {
                this.router.navigate(["/restaurants"]);
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.error.message,
                });
            },
        });
        // this.router.navigate(["/restaurants"]);
    }
    goRegister(): void {
        this.router.navigate(["auth/register"]);
    }
}
