import { inject } from "@angular/core";
import {
    CanActivateFn,
    Router,
} from "@angular/router";
import { map } from "rxjs";
import { UserService } from "../auth/services/user.service";

export const loginActivateGuard: CanActivateFn = () => {
    const router = inject(Router);
    return inject(UserService)
        .isLogged()
        .pipe(
            map((logged) => {
                if (!logged) {
                    return router.createUrlTree(["/auth/login"]);
                }
                return true;
            })
        );
};
