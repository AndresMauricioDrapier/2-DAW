import { AppComponent } from "./app/app.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/routes";
import { baseUrlInterceptor } from "./app/interceptors/base-url.interceptor";
import { provideArcgisToken } from "./app/shared/maps/arcgis-maps.config";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideRouter(APP_ROUTES),
        provideArcgisToken(
            "AAPKc2940b004f38491b869000328dd73685GNKiJxJwOBscpCvz9Pxpae-LVDdvsqr_p6VDTqAas1Kj7idPwcMZqSc-fuDAY91R"
        ),
    ],
});
