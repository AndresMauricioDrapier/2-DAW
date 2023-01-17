import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function sameEmails(emailCompare: string): ValidatorFn {

    return (email: AbstractControl): ValidationErrors | null => {
        if (emailCompare == email.value) {
            return { sameEmail: true };
        }

        return null;
    };
}
