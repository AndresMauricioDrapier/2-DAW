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
import { TokenResponse } from "../interfaces/responses";
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
        // Send this token to your server for register / login
        this.userInfo.token = user.getAuthResponse().id_token;
        this.userInfo.email = user.getBasicProfile().getEmail();
        this.userInfo.image = user.getBasicProfile().getImageUrl();
        console.log(this.userInfo);
    }

    loggedFacebook(resp: fb.StatusResponse): void {
        this.userInfo.token = resp.authResponse.accessToken;
        this.userInfo.userId = resp.authResponse.userID;
    }

    loggin(): void {
        this.userInfo.email = this.userForm.controls["email"].value;
        this.userInfo.password = this.userForm.controls["password"].value;
        this.http.login(this.userInfo).subscribe({
            next: (user: void | TokenResponse) => {
                this.http.putToken(user?.accessToken);
                this.http.loginChange$.next(true);
                this.router.navigate(["/restaurants"]);

            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.error.message
                });
            },
        });
        // this.router.navigate(["/restaurants"]);
    }
    goRegister(): void {
        this.router.navigate(["/auth/register"]);
    }
}
