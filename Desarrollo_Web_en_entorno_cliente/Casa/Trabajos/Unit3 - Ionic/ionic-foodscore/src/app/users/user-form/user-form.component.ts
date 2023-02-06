import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../interfaces/user";
import { ActivatedRoute } from "@angular/router";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { UserService } from "../services/user-service.service";
import { isTheSame } from "src/app/validators/isTheSame";


@Component({
    selector: "fs-user-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
    user!: User;

    profileForm!: FormGroup;
    nameControl!: FormControl<string>;
    emailControl!: FormControl<string>;

    avatarForm!: FormGroup;
    imageControl!: FormControl<string>;

    passwordForm!: FormGroup;
    passwordControl!: FormControl<string>;
    password2Control!: FormControl<string>;

    constructor(
        private route: ActivatedRoute,
        private readonly http: UserService,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.user = data["user"];
        });

        this.profileForm = this.fb.group({
            name: (this.nameControl = this.fb.control(this.user.name)),
            email: (this.emailControl = this.fb.control(this.user.email)),
        });

        this.passwordForm = this.fb.group({
            password: (this.passwordControl = this.fb.control("", [
                Validators.pattern("^.{4,}$"),
            ])),
            password2: (this.password2Control = this.fb.control("", [
                isTheSame(this.passwordControl),
            ])),
        });

        this.avatarForm = this.fb.group({
            avatar: (this.imageControl = this.fb.control("")),
        });
    }
    submitProfile(): void {
        this.user.name = this.nameControl.value;
        this.user.email = this.emailControl.value;

        this.http.saveProfile(this.user.name, this.user.email).subscribe();
    }
    submitAvatar(): void {
        this.user.avatar = this.imageControl.value;
        this.http.saveAvatar(this.user.avatar).subscribe();
    }
    submitPassword(): void {
        if (this.passwordControl.value === this.password2Control.value) {
            this.http.savePassword(this.passwordControl.value).subscribe();
        }
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
