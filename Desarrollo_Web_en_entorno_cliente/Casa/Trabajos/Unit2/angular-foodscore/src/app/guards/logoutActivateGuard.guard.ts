import { inject } from "@angular/core";
import {
    CanActivateFn,
    Router,
} from "@angular/router";
import { map } from "rxjs/operators";
import { UserService } from "../auth/services/user.service";

export const logoutActivateGuard: CanActivateFn = (
) => {
    const router = inject(Router);
    return inject(UserService)
        .isLogged()
        .pipe(
            map((logged) => {
                if (logged) {
                    return router.createUrlTree(["/restaurants"]);
                }
                return true;
            })
        );
};
