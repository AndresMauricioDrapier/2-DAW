import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../interfaces/user";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../services/user-service.service";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { sameEmail } from "../validators/sameEmails.validator";

@Component({
    selector: "fs-user-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
    user!: User;

    avatarForm!: FormGroup;
    imageControl!: FormControl<string>;

    passwordForm!: FormGroup;
    passwordControl!: FormControl<string>;
    password2Control!: FormControl<string>;

    constructor(
        private route: ActivatedRoute,
        private readonly http: UsersService,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.user = data["user"];
        });

        this.passwordForm = this.fb.group({
            password: (this.passwordControl = this.fb.control("", [
                Validators.pattern("^.{4,}$"),
            ])),
            password2: (this.password2Control = this.fb.control("", [
                sameEmail(this.passwordControl),
            ])),
        });

        this.avatarForm = this.fb.group({
            avatar: (this.imageControl = this.fb.control("")),
        });
    }
    submitProfile(): void {
        console.log(this.user.name, this.user.email);

        // this.http.saveProfile(this.user.name, this.user.email);
    }
    submitAvatar(): void {
        this.http.saveAvatar(this.user.avatar);
    }
    submitPassword(): void {
        if (this.passwordControl.value === this.password2Control.value) {
            this.http.savePassword(this.passwordControl.value);
        }
        console.log(this.passwordControl.value, this.password2Control.value);
    }
    changeImage(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) return;
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener("loadend", () => {
            (this.imageControl.value as string) = reader.result as string;
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
}
