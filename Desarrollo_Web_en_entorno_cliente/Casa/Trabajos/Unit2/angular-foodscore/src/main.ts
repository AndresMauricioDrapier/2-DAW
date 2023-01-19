import { AppComponent } from "./app/app.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/users.routes";
import { baseUrlInterceptor } from "./app/interceptors/base-url.interceptor";
import { provideArcgisToken } from "./app/shared/maps/arcgis-maps.config";
import { provideGoogleId } from "./app/auth/restaurant-login/google-login/google-login.config";
import { provideFacebookId } from "./app/auth/restaurant-login/facebook-login/fb-login.config";
import { tokenInterceptor } from "./app/interceptors/token.interceptor";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor,tokenInterceptor])),
        provideRouter(APP_ROUTES),
        provideArcgisToken(
            "AAPKc2940b004f38491b869000328dd73685GNKiJxJwOBscpCvz9Pxpae-LVDdvsqr_p6VDTqAas1Kj7idPwcMZqSc-fuDAY91R"
        ),
        provideGoogleId(
            "533632096-so95a1h949v2ddc3ce22ooemrd9c9cpf.apps.googleusercontent.com"
        ),
        provideFacebookId("551918016324547", "v15.0"),
    ],
});
