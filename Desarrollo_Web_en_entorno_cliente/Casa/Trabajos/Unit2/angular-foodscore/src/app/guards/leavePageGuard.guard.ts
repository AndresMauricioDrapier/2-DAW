import { CanDeactivateFn, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

export interface CanDeactivateComponent {
    canDeactivate: () =>
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree;
}

export const leavePageGuard: CanDeactivateFn<CanDeactivateComponent> = (
    component
) => {
    if (component.canDeactivate) {
        Swal.fire({
            title: "Do you want to edit the avatar?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Edit",
            denyButtonText: "Don't edit",
        }).then((result) => {
            if (result.isConfirmed) {
                return component.canDeactivate();
            } else {
                Swal.fire("Changes are not saved", "", "info");
                return true;
            }
        });
    } else {
        return true;
    }
    return component.canDeactivate ? component.canDeactivate() : true;
};
