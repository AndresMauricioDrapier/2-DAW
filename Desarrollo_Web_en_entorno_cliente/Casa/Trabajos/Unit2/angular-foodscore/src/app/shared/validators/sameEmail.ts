import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function sameEmails(emailCompare: FormControl): ValidatorFn {
    console.log("hola");

    return (email: AbstractControl): ValidationErrors | null => {
        if (emailCompare.value !== email.value) {
            return { sameEmail: true };
        }

        return null;
    };
}
